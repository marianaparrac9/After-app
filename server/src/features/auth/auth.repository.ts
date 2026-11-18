import { pool } from "../../db/db";
import { CreateProfileDTO, Profile } from "./auth.types";

const PROFILE_COLUMNS =
  'id, full_name AS "fullName", username, email, avatar_url AS "avatarUrl", role';

export const createProfileRepository = async (profile: CreateProfileDTO): Promise<Profile> => {
  const result = await pool.query<Profile>(
    `INSERT INTO public.profiles (id, full_name, username, email, role)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name
     RETURNING ${PROFILE_COLUMNS}`,
    [profile.id, profile.fullName, profile.username, profile.email, profile.role]
  );
  return result.rows[0];
};

export const getProfileByIdRepository = async (id: string): Promise<Profile | undefined> => {
  const result = await pool.query<Profile>(`SELECT ${PROFILE_COLUMNS} FROM public.profiles WHERE id = $1`, [id]);
  return result.rows[0];
};

export const getProfileByEmailRepository = async (email: string): Promise<Profile | undefined> => {
  const result = await pool.query<Profile>(
    `SELECT ${PROFILE_COLUMNS} FROM public.profiles WHERE lower(email) = lower($1)`,
    [email]
  );
  return result.rows[0];
};
