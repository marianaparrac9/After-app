import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { asyncHandler } from "../../middlewares/errorsMiddleware";
import { deleteSavedEventController, getSavedEventsController, saveEventController } from "./saved.controller";

export const router = Router();

router.get("/", authMiddleware, asyncHandler(getSavedEventsController));
router.post("/:eventId", authMiddleware, asyncHandler(saveEventController));
router.delete("/:eventId", authMiddleware, asyncHandler(deleteSavedEventController));
