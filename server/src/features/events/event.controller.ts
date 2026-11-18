import { Request, Response } from "express";
import {
  createEventService,
  deleteEventService,
  getEventByIdService,
  getEventsService,
  getEventStatsService,
  updateEventService,
} from "./event.service";
import { validateCreateEvent, validateUpdateEvent } from "./event.validation";

export const getEventsController = async (_req: Request, res: Response) => {
  res.status(200).json(await getEventsService());
};

export const getEventStatsController = async (_req: Request, res: Response) => {
  res.status(200).json(await getEventStatsService());
};

export const getEventByIdController = async (req: Request, res: Response) => {
  res.status(200).json(await getEventByIdService(String(req.params.id)));
};

export const createEventController = async (req: Request, res: Response) => {
  const event = await createEventService(validateCreateEvent(req.body ?? {}));
  res.status(201).json(event);
};

export const updateEventController = async (req: Request, res: Response) => {
  const event = await updateEventService(String(req.params.id), validateUpdateEvent(req.body ?? {}));
  res.status(200).json(event);
};

export const deleteEventController = async (req: Request, res: Response) => {
  await deleteEventService(String(req.params.id));
  res.status(204).send();
};
