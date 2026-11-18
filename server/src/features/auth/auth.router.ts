import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { asyncHandler } from "../../middlewares/errorsMiddleware";
import { getMeController, loginController, refreshController, registerController } from "./auth.controller";

export const router = Router();

router.post("/register", asyncHandler(registerController));
router.post("/login", asyncHandler(loginController));
router.post("/refresh", asyncHandler(refreshController));
router.get("/me", authMiddleware, asyncHandler(getMeController));
