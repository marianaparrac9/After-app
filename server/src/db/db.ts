import { Pool, PoolClient } from "pg";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "../config/config";
import { seedEvents, seedProducts } from "./seed";

export const pool = new Pool({
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
  ssl: { rejectUnauthorized: false },
});

export const withTransaction = async <T>(fn: (client: PoolClient) => Promise<T>): Promise<T> => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const createTables = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS public.profiles (
      id UUID PRIMARY KEY,
      full_name TEXT NOT NULL,
      username TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      avatar_url TEXT,
      role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS public.events (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
      title TEXT NOT NULL,
      venue_name TEXT NOT NULL,
      address TEXT NOT NULL,
      image_url TEXT NOT NULL,
      categories TEXT[] NOT NULL DEFAULT '{}',
      status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('live', 'open', 'almost-full', 'closed')),
      display_date TEXT NOT NULL,
      display_time TEXT NOT NULL,
      latitude DOUBLE PRECISION NOT NULL,
      longitude DOUBLE PRECISION NOT NULL,
      distance_km DOUBLE PRECISION NOT NULL DEFAULT 0,
      capacity INTEGER NOT NULL CHECK (capacity > 0),
      occupied INTEGER NOT NULL DEFAULT 0 CHECK (occupied >= 0),
      rating DOUBLE PRECISION NOT NULL DEFAULT 0,
      description TEXT NOT NULL DEFAULT '',
      section TEXT NOT NULL DEFAULT 'tonight' CHECK (section IN ('happening', 'tonight', 'trending')),
      map_label TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS public.products (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
      event_id TEXT UNIQUE REFERENCES public.events(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'ticket',
      price INTEGER NOT NULL CHECK (price >= 0),
      currency TEXT NOT NULL DEFAULT 'COP',
      description TEXT NOT NULL DEFAULT '',
      image_url TEXT NOT NULL,
      place TEXT NOT NULL
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS public.saved_events (
      user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
      event_id TEXT NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      PRIMARY KEY (user_id, event_id)
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS public.attendances (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      event_id TEXT NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
      user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
      action TEXT NOT NULL CHECK (action IN ('check-in', 'check-out')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS public.payments (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
      product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
      amount INTEGER NOT NULL CHECK (amount >= 0),
      currency TEXT NOT NULL DEFAULT 'COP',
      status TEXT NOT NULL DEFAULT 'paid' CHECK (status IN ('paid', 'pending', 'failed')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);

  await pool.query("CREATE INDEX IF NOT EXISTS idx_attendances_event_id ON public.attendances(event_id)");
  await pool.query("CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id)");
};

const seed = async () => {
  for (const event of seedEvents) {
    await pool.query(
      `INSERT INTO public.events (
        id, title, venue_name, address, image_url, categories, status, display_date, display_time,
        latitude, longitude, distance_km, capacity, occupied, rating, description, section, map_label
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      ON CONFLICT (id) DO NOTHING`,
      [
        event.id,
        event.title,
        event.venueName,
        event.address,
        event.imageUrl,
        event.categories,
        event.status,
        event.displayDate,
        event.displayTime,
        event.latitude,
        event.longitude,
        event.distanceKm,
        event.capacity,
        event.occupied,
        event.rating,
        event.description,
        event.section,
        event.mapLabel,
      ]
    );
  }

  for (const product of seedProducts) {
    await pool.query(
      `INSERT INTO public.products (id, event_id, name, category, price, currency, description, image_url, place)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (id) DO NOTHING`,
      [
        product.id,
        product.eventId,
        product.name,
        product.category,
        product.price,
        product.currency,
        product.description,
        product.imageUrl,
        product.place,
      ]
    );
  }
};

export const initDb = async () => {
  await createTables();
  await seed();
};
