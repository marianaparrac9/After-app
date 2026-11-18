import { Role } from "../../shared/types";

export interface Profile {
  id: string;
  fullName: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  role: Role;
}

export interface Session {
  user: Profile;
  token: string;
  refreshToken: string;
  expiresAt: number;
}

export interface RegisterDTO {
  fullName: string;
  email: string;
  password: string;
  role: Role;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface CreateProfileDTO {
  id: string;
  fullName: string;
  username: string;
  email: string;
  role: Role;
}
