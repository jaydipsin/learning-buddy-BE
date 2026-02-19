import authValidators from "../validators/auth.validator.js";
import express from "express";

import {
  handleLogin,
  handleRegister,
  handleLogout,
  handleForgotPassword,
} from "../controllers/auth.controller.js";
import { handleRefreshToken } from "../controllers/refresh.controller.js";
const router = express.Router();

router.post("/login", handleLogin);
router.post("/register", authValidators.validateRegisterBody, handleRegister);
router.post("/logout", handleLogout);
router.post("/forgot-password", handleForgotPassword);

// Renew Token

router.post("/refresh", handleRefreshToken);

export default router;
