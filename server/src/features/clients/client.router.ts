import { Router } from "express";
import { asyncHandler } from "../../middlewares/errorsMiddleware";
import {
  getClientByIdController,
  getClientsController,
} from "./client.controller";

export const router = Router();

router.get("/", asyncHandler(async (req, res) => getClientsController(req, res)));
router.get("/:id", asyncHandler(async (req, res) => getClientByIdController(req, res)));
