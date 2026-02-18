import { validateRegisterBody } from "../validators/auth.validator";

const express = require("express");
const {
  handleLogin,
  handleRegister,
  handleLogout,
  handleForgotPassword,
} = require("../controllers/auth.controller");
const { handleRefreshToken } = require("../controllers/refresh.controller");
const router = express.Router();

router.post("/login", handleLogin);
router.post("/register", validateRegisterBody, handleRegister);
router.post("/logout", handleLogout);
router.post("/forgot-password", handleForgotPassword);

// Renew Token

router.post("/refresh", handleRefreshToken);

export default router;
