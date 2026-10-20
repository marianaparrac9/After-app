import { Request, Response } from "express";
import { getClientByIdService, getClientsService } from "./client.service";

export const getClientsController = (_req: Request, res: Response) => {
  return res.json(getClientsService());
};

export const getClientByIdController = (req: Request, res: Response) => {
  return res.json(getClientByIdService(String(req.params.id)));
};
