export type Role = "user" | "admin";

export interface AuthUser {
  id: string;
  email: string;
  role: Role;
  token: string;
}
