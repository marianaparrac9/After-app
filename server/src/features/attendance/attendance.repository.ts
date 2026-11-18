import { pool, withTransaction } from "../../db/db";
import { Activity, AttendanceAction, AttendanceDTO } from "./attendance.types";

const ACTIVITY_SELECT = `
  SELECT
    a.id,
    a.event_id AS "eventId",
    e.title AS "eventTitle",
    a.action,
    a.created_at AS "createdAt",
    json_build_object('id', p.id, 'fullName', p.full_name) AS user
  FROM public.attendances a
  JOIN public.events e ON e.id = a.event_id
  JOIN public.profiles p ON p.id = a.user_id
`;

export const getLastActionRepository = async ({ userId, eventId }: AttendanceDTO): Promise<AttendanceAction | null> => {
  const result = await pool.query<{ action: AttendanceAction }>(
    `SELECT action FROM public.attendances
     WHERE user_id = $1 AND event_id = $2
     ORDER BY created_at DESC
     LIMIT 1`,
    [userId, eventId]
  );
  return result.rows[0]?.action ?? null;
};

export const registerAttendanceRepository = async (
  { userId, eventId }: AttendanceDTO,
  action: AttendanceAction
): Promise<string | null> =>
  withTransaction(async (client) => {
    const occupancy =
      action === "check-in"
        ? `UPDATE public.events SET occupied = occupied + 1
           WHERE id = $1 AND occupied < capacity AND status <> 'closed'
           RETURNING id`
        : `UPDATE public.events SET occupied = GREATEST(occupied - 1, 0)
           WHERE id = $1
           RETURNING id`;

    const updated = await client.query(occupancy, [eventId]);

    if (!updated.rows[0]) {
      return null;
    }

    const created = await client.query<{ id: string }>(
      `INSERT INTO public.attendances (event_id, user_id, action)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [eventId, userId, action]
    );

    return created.rows[0].id;
  });

export const getActivityByIdRepository = async (id: string): Promise<Activity | undefined> => {
  const result = await pool.query<Activity>(`${ACTIVITY_SELECT} WHERE a.id = $1`, [id]);
  return result.rows[0];
};

export const getActivityRepository = async (eventId: string | null): Promise<Activity[]> => {
  const result = await pool.query<Activity>(
    `${ACTIVITY_SELECT}
     WHERE ($1::text IS NULL OR a.event_id = $1)
     ORDER BY a.created_at DESC
     LIMIT 20`,
    [eventId]
  );
  return result.rows;
};
