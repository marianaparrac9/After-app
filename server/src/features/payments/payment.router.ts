import { Router } from "express";
import { asyncHandler } from "../../middlewares/errorsMiddleware";
import {
  getPaymentByIdController,
  getPaymentsController,
} from "./payment.controller";

export const router = Router();

router.get("/", asyncHandler(async (req, res) => getPaymentsController(req, res)));
router.get("/:id", asyncHandler(async (req, res) => getPaymentByIdController(req, res)));
