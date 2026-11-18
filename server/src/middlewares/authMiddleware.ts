import Boom from "@hapi/boom";
import { NextFunction, Request, Response } from "express";
import { supabase } from "../config/supabase";
import { pool } from "../db/db";
import { AuthUser, Role } from "../shared/types";
import { asyncHandler } from "./errorsMiddleware";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

const verifyToken = async (req: Request, _res: Response, next: NextFunction) => {
  const [scheme, token] = (req.headers.authorization ?? "").split(" ");

  if (scheme !== "Bearer" || !token) {
    throw Boom.unauthorized("Missing or malformed Authorization header");
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    throw Boom.unauthorized("Invalid or expired token");
  }

  const result = await pool.query<{ role: Role }>("SELECT role FROM public.profiles WHERE id = $1", [
    data.user.id,
  ]);

  if (!result.rows[0]) {
    throw Boom.unauthorized("Profile not found");
  }

  req.user = {
    id: data.user.id,
    email: data.user.email ?? "",
    role: result.rows[0].role,
    token,
  };

  next();
};

export const authMiddleware = asyncHandler(verifyToken);

export const adminMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    throw Boom.forbidden("Only administrators can do this");
  }

  next();
};

export const getUserFromRequest = (req: Request): AuthUser => {
  if (!req.user) {
    throw Boom.unauthorized("User not authenticated");
  }

  return req.user;
};
