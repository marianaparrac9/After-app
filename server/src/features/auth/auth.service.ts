import Boom from "@hapi/boom";
import { Session as SupabaseSession } from "@supabase/supabase-js";
import { createAuthClient } from "../../config/supabase";
import {
  createProfileRepository,
  getProfileByEmailRepository,
  getProfileByIdRepository,
} from "./auth.repository";
import { LoginDTO, Profile, RegisterDTO, Session } from "./auth.types";

const toSession = (user: Profile, session: SupabaseSession): Session => ({
  user,
  token: session.access_token,
  refreshToken: session.refresh_token,
  expiresAt: session.expires_at ?? 0,
});

const getExistingProfile = async (id: string): Promise<Profile> => {
  const profile = await getProfileByIdRepository(id);

  if (!profile) {
    throw Boom.notFound("Profile not found");
  }

  return profile;
};

export const registerService = async ({ fullName, email, password, role }: RegisterDTO): Promise<Session> => {
  const existing = await getProfileByEmailRepository(email);

  if (existing) {
    throw Boom.conflict("This email is already registered");
  }

  const { data, error } = await createAuthClient().auth.signUp({
    email,
    password,
    options: { data: { fullName, role } },
  });

  if (error || !data.user) {
    throw Boom.badRequest(error?.message ?? "Could not create the account");
  }

  const profile = await createProfileRepository({
    id: data.user.id,
    fullName,
    username: email.split("@")[0],
    email,
    role,
  });

  if (!data.session) {
    throw Boom.badRequest("Check your email to confirm the account");
  }

  return toSession(profile, data.session);
};

export const loginService = async ({ email, password }: LoginDTO): Promise<Session> => {
  const { data, error } = await createAuthClient().auth.signInWithPassword({ email, password });

  if (error || !data.session) {
    throw Boom.unauthorized("Email or password is not correct");
  }

  const profile = await getExistingProfile(data.user.id);
  return toSession(profile, data.session);
};

export const refreshService = async (refreshToken: string): Promise<Session> => {
  const { data, error } = await createAuthClient().auth.refreshSession({ refresh_token: refreshToken });

  if (error || !data.session || !data.user) {
    throw Boom.unauthorized("Your session expired, log in again");
  }

  const profile = await getExistingProfile(data.user.id);
  return toSession(profile, data.session);
};

export const getMeService = async (userId: string): Promise<Profile> => getExistingProfile(userId);
