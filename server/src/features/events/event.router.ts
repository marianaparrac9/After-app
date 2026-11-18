import { Router } from "express";
import { adminMiddleware, authMiddleware } from "../../middlewares/authMiddleware";
import { asyncHandler } from "../../middlewares/errorsMiddleware";
import {
  createEventController,
  deleteEventController,
  getEventByIdController,
  getEventsController,
  getEventStatsController,
  updateEventController,
} from "./event.controller";

export const router = Router();

router.get("/", authMiddleware, asyncHandler(getEventsController));
router.get("/stats", authMiddleware, adminMiddleware, asyncHandler(getEventStatsController));
router.get("/:id", authMiddleware, asyncHandler(getEventByIdController));
router.post("/", authMiddleware, adminMiddleware, asyncHandler(createEventController));
router.patch("/:id", authMiddleware, adminMiddleware, asyncHandler(updateEventController));
router.delete("/:id", authMiddleware, adminMiddleware, asyncHandler(deleteEventController));
