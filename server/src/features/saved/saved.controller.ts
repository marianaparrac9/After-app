import { Request, Response } from "express";
import { getUserFromRequest } from "../../middlewares/authMiddleware";
import { deleteSavedEventService, getSavedEventsService, saveEventService } from "./saved.service";

export const getSavedEventsController = async (req: Request, res: Response) => {
  const user = getUserFromRequest(req);
  res.status(200).json(await getSavedEventsService(user.id));
};

export const saveEventController = async (req: Request, res: Response) => {
  const user = getUserFromRequest(req);
  const saved = await saveEventService({ userId: user.id, eventId: String(req.params.eventId) });
  res.status(201).json(saved);
};

export const deleteSavedEventController = async (req: Request, res: Response) => {
  const user = getUserFromRequest(req);
  await deleteSavedEventService({ userId: user.id, eventId: String(req.params.eventId) });
  res.status(204).send();
};
