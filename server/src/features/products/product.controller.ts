import { Request, Response } from "express";
import { getProductByIdService, getProductsService } from "./product.service";

export const getProductsController = (_req: Request, res: Response) => {
  return res.json(getProductsService());
};

export const getProductByIdController = (req: Request, res: Response) => {
  return res.json(getProductByIdService(String(req.params.id)));
};
