import { pool } from "../../db/db";
import { SavedEvent, SaveEventDTO } from "./saved.types";

export const getSavedEventsRepository = async (userId: string): Promise<SavedEvent[]> => {
  const result = await pool.query<SavedEvent>(
    `WITH mine AS (
      SELECT event_id, created_at FROM public.saved_events WHERE user_id = $1
    )
    SELECT
      mine.created_at AS "savedAt",
      json_build_object(
        'id', e.id,
        'title', e.title,
        'venueName', e.venue_name,
        'address', e.address,
        'imageUrl', e.image_url,
        'categories', e.categories,
        'status', e.status,
        'displayDate', e.display_date,
        'displayTime', e.display_time,
        'latitude', e.latitude,
        'longitude', e.longitude,
        'distanceKm', e.distance_km,
        'capacity', e.capacity,
        'occupied', e.occupied,
        'rating', e.rating,
        'description', e.description,
        'section', e.section,
        'mapLabel', e.map_label,
        'ticket', NULL
      ) AS event
    FROM mine
    JOIN public.events e ON e.id = mine.event_id
    ORDER BY mine.created_at DESC`,
    [userId]
  );
  return result.rows;
};

export const saveEventRepository = async ({ userId, eventId }: SaveEventDTO): Promise<void> => {
  await pool.query(
    `INSERT INTO public.saved_events (user_id, event_id)
     VALUES ($1, $2)
     ON CONFLICT (user_id, event_id) DO NOTHING`,
    [userId, eventId]
  );
};

export const deleteSavedEventRepository = async ({ userId, eventId }: SaveEventDTO): Promise<boolean> => {
  const result = await pool.query("DELETE FROM public.saved_events WHERE user_id = $1 AND event_id = $2", [
    userId,
    eventId,
  ]);
  return (result.rowCount ?? 0) > 0;
};
