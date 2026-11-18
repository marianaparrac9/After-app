import { Router } from "express";
import { adminMiddleware, authMiddleware } from "../../middlewares/authMiddleware";
import { asyncHandler } from "../../middlewares/errorsMiddleware";
import {
  checkInController,
  checkOutController,
  getActivityController,
  getAttendanceStatusController,
} from "./attendance.controller";

export const router = Router();

router.get("/activity", authMiddleware, adminMiddleware, asyncHandler(getActivityController));
router.get("/:eventId", authMiddleware, asyncHandler(getAttendanceStatusController));
router.post("/:eventId/check-in", authMiddleware, asyncHandler(checkInController));
router.post("/:eventId/check-out", authMiddleware, asyncHandler(checkOutController));
