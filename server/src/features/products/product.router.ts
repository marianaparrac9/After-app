import { Router } from "express";
import { asyncHandler } from "../../middlewares/errorsMiddleware";
import {
  getProductByIdController,
  getProductsController,
} from "./product.controller";

export const router = Router();

router.get("/", asyncHandler(async (req, res) => getProductsController(req, res)));
router.get("/:id", asyncHandler(async (req, res) => getProductByIdController(req, res)));
