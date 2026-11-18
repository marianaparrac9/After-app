import Boom from "@hapi/boom";
import { Request, Response } from "express";
import { getUserFromRequest } from "../../middlewares/authMiddleware";
import { createPaymentService, getPaymentByIdService, getPaymentsService } from "./payment.service";

export const getPaymentsController = async (req: Request, res: Response) => {
  const user = getUserFromRequest(req);
  res.status(200).json(await getPaymentsService(user.id));
};

export const getPaymentByIdController = async (req: Request, res: Response) => {
  const user = getUserFromRequest(req);
  res.status(200).json(await getPaymentByIdService(String(req.params.id), user.id));
};

export const createPaymentController = async (req: Request, res: Response) => {
  const user = getUserFromRequest(req);
  const { productId } = req.body ?? {};

  if (typeof productId !== "string" || !productId.trim()) {
    throw Boom.badRequest("Product is required");
  }

  res.status(201).json(await createPaymentService(user.id, productId.trim()));
};
