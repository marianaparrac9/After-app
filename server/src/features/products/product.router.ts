import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { asyncHandler } from "../../middlewares/errorsMiddleware";
import { getProductByIdController, getProductsController } from "./product.controller";

export const router = Router();

router.get("/", authMiddleware, asyncHandler(getProductsController));
router.get("/:id", authMiddleware, asyncHandler(getProductByIdController));
