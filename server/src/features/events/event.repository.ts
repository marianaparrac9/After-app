import { PoolClient } from "pg";
import { pool, withTransaction } from "../../db/db";
import { AfterEvent, CreateEventDTO, EventStats, UpdateEventDTO } from "./event.types";

const EVENT_SELECT = `
  SELECT
    e.id,
    e.title,
    e.venue_name AS "venueName",
    e.address,
    e.image_url AS "imageUrl",
    e.categories,
    e.status,
    e.display_date AS "displayDate",
    e.display_time AS "displayTime",
    e.latitude,
    e.longitude,
    e.distance_km AS "distanceKm",
    e.capacity,
    e.occupied,
    e.rating,
    e.description,
    e.section,
    e.map_label AS "mapLabel",
    CASE
      WHEN p.id IS NULL THEN NULL
      ELSE json_build_object('id', p.id, 'name', p.name, 'price', p.price, 'currency', p.currency)
    END AS ticket
  FROM public.events e
  LEFT JOIN public.products p ON p.event_id = e.id
`;

type Queryable = PoolClient | typeof pool;

const CITY_CENTER = { latitude: 3.4516, longitude: -76.532 };

export const getEventsRepository = async (): Promise<AfterEvent[]> => {
  const result = await pool.query<AfterEvent>(`${EVENT_SELECT} ORDER BY e.created_at ASC, e.id ASC`);
  return result.rows;
};

export const getEventByIdRepository = async (id: string, client: Queryable = pool): Promise<AfterEvent | undefined> => {
  const result = await client.query<AfterEvent>(`${EVENT_SELECT} WHERE e.id = $1`, [id]);
  return result.rows[0];
};

export const getEventStatsRepository = async (): Promise<EventStats> => {
  const result = await pool.query<EventStats>(`
    WITH live AS (
      SELECT occupied, capacity FROM public.events WHERE status = 'live'
    ),
    open_events AS (
      SELECT COUNT(*)::int AS total FROM public.events WHERE status <> 'closed'
    )
    SELECT
      COALESCE(SUM(live.occupied), 0)::int AS "peopleNow",
      COUNT(live.capacity)::int AS "activeEvents",
      (SELECT total FROM open_events) AS "eventsToday",
      CASE
        WHEN COALESCE(SUM(live.capacity), 0) = 0 THEN 0
        ELSE ROUND(SUM(live.occupied) * 100.0 / SUM(live.capacity))::int
      END AS "capacityPercent"
    FROM live
  `);
  return result.rows[0];
};

export const createEventRepository = async (event: CreateEventDTO): Promise<string> =>
  withTransaction(async (client) => {
    const created = await client.query<{ id: string }>(
      `INSERT INTO public.events (
        title, venue_name, address, image_url, categories, status, display_date, display_time,
        latitude, longitude, capacity, description, section, map_label, distance_km
      )
      VALUES (
        $1, $2, $3, $4, $5, 'open', $6, $7, $8, $9, $10, $11, 'tonight', $12,
        ROUND((6371 * acos(LEAST(1, cos(radians($13)) * cos(radians($8)) * cos(radians($9) - radians($14))
          + sin(radians($13)) * sin(radians($8)))))::numeric, 1)
      )
      RETURNING id`,
      [
        event.title,
        event.venueName,
        event.address,
        event.imageUrl,
        event.categories,
        event.displayDate,
        event.displayTime,
        event.latitude,
        event.longitude,
        event.capacity,
        event.description,
        event.categories[0] ?? "",
        CITY_CENTER.latitude,
        CITY_CENTER.longitude,
      ]
    );
    const id = created.rows[0].id;

    await client.query(
      `INSERT INTO public.products (event_id, name, category, price, description, image_url, place)
      VALUES ($1, $2, 'ticket', $3, $4, $5, $6)`,
      [id, event.title, event.price, event.description, event.imageUrl, event.venueName]
    );

    return id;
  });

export const updateEventRepository = async (id: string, changes: UpdateEventDTO): Promise<boolean> => {
  const result = await pool.query(
    `UPDATE public.events
     SET status = COALESCE($2, status),
         capacity = COALESCE($3, capacity),
         description = COALESCE($4, description)
     WHERE id = $1`,
    [id, changes.status ?? null, changes.capacity ?? null, changes.description ?? null]
  );
  return (result.rowCount ?? 0) > 0;
};

export const deleteEventRepository = async (id: string): Promise<boolean> => {
  const result = await pool.query("DELETE FROM public.events WHERE id = $1", [id]);
  return (result.rowCount ?? 0) > 0;
};
