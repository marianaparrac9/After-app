import Boom from "@hapi/boom";
import { Request, Response } from "express";
import { getUserFromRequest } from "../../middlewares/authMiddleware";
import { Role } from "../../shared/types";
import { getMeService, loginService, refreshService, registerService } from "./auth.service";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ROLES: Role[] = ["user", "admin"];

const readEmail = (value: unknown): string => {
  if (typeof value !== "string" || !EMAIL_REGEX.test(value.trim())) {
    throw Boom.badRequest("Write a valid email");
  }
  return value.trim().toLowerCase();
};

const readPassword = (value: unknown): string => {
  if (typeof value !== "string" || value.length < 6) {
    throw Boom.badRequest("Password must have at least 6 characters");
  }
  return value;
};

export const registerController = async (req: Request, res: Response) => {
  const { fullName, email, password, role } = req.body ?? {};

  if (typeof fullName !== "string" || fullName.trim().length < 2) {
    throw Boom.badRequest("Full name is required");
  }

  const safeRole: Role = ROLES.includes(role) ? role : "user";

  const session = await registerService({
    fullName: fullName.trim(),
    email: readEmail(email),
    password: readPassword(password),
    role: safeRole,
  });

  res.status(201).json(session);
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body ?? {};

  if (typeof password !== "string" || !password) {
    throw Boom.badRequest("Password is required");
  }

  res.status(200).json(await loginService({ email: readEmail(email), password }));
};

export const refreshController = async (req: Request, res: Response) => {
  const { refreshToken } = req.body ?? {};

  if (typeof refreshToken !== "string" || !refreshToken) {
    throw Boom.unauthorized("Your session expired, log in again");
  }

  res.status(200).json(await refreshService(refreshToken));
};

export const getMeController = async (req: Request, res: Response) => {
  const user = getUserFromRequest(req);
  res.status(200).json(await getMeService(user.id));
};
