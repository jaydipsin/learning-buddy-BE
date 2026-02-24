import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { handleUserProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile", authMiddleware, handleUserProfile);

export default router;
