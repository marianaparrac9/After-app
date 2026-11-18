import { Request, Response } from "express";
import { getUserFromRequest } from "../../middlewares/authMiddleware";
import {
  checkInService,
  checkOutService,
  getActivityService,
  getAttendanceStatusService,
} from "./attendance.service";

export const getAttendanceStatusController = async (req: Request, res: Response) => {
  const user = getUserFromRequest(req);
  res.status(200).json(await getAttendanceStatusService({ userId: user.id, eventId: String(req.params.eventId) }));
};

export const checkInController = async (req: Request, res: Response) => {
  const user = getUserFromRequest(req);
  res.status(201).json(await checkInService({ userId: user.id, eventId: String(req.params.eventId) }));
};

export const checkOutController = async (req: Request, res: Response) => {
  const user = getUserFromRequest(req);
  res.status(201).json(await checkOutService({ userId: user.id, eventId: String(req.params.eventId) }));
};

export const getActivityController = async (req: Request, res: Response) => {
  const eventId = typeof req.query.eventId === "string" && req.query.eventId ? req.query.eventId : null;
  res.status(200).json(await getActivityService(eventId));
};
