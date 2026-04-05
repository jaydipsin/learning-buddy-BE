import express from "express";

import {
  handleLogin,
  handleRegister,
  handleLogout,
  handleForgotPassword,
} from "../controllers/auth.controller.js";
import { handleRefreshToken } from "../controllers/refresh.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";
import { asyncHandler } from "../middlewares/async-handler,middleware.js";
const router = express.Router();

router.post("/login", validate(loginSchema), asyncHandler(handleLogin));
router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(handleRegister),
);
router.post("/logout", asyncHandler(handleLogout));
router.post("/forgot-password", asyncHandler(handleForgotPassword));
router.get("", (req, res) => {
  res.json({ message: "Auth route" });
});
// Renew Token

router.get("/refresh", asyncHandler(handleRefreshToken));

export default router;
