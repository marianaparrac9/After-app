import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { asyncHandler } from "../../middlewares/errorsMiddleware";
import { createPaymentController, getPaymentByIdController, getPaymentsController } from "./payment.controller";

export const router = Router();

router.get("/", authMiddleware, asyncHandler(getPaymentsController));
router.get("/:id", authMiddleware, asyncHandler(getPaymentByIdController));
router.post("/", authMiddleware, asyncHandler(createPaymentController));
