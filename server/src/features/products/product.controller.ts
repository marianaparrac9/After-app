import { Request, Response } from "express";
import { getProductByIdService, getProductsService } from "./product.service";

export const getProductsController = async (_req: Request, res: Response) => {
  res.status(200).json(await getProductsService());
};

export const getProductByIdController = async (req: Request, res: Response) => {
  res.status(200).json(await getProductByIdService(String(req.params.id)));
};
