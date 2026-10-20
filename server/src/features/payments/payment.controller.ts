import { Request, Response } from "express";
import { getPaymentByIdService, getPaymentsService } from "./payment.service";

export const getPaymentsController = (_req: Request, res: Response) => {
  return res.json(getPaymentsService());
};

export const getPaymentByIdController = (req: Request, res: Response) => {
  return res.json(getPaymentByIdService(String(req.params.id)));
};
