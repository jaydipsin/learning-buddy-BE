import dotenv from "dotenv";

import { cookiesConfigration } from "../helper/cookie-config.js";
import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import {
  loginUserService,
  logoutUserService,
  registerUserService,
} from "../services/auth.service.js";

dotenv.config();

export const handleRegister = async (
  req: Request,
  res: Response,
  next: Function,
) => {
  const body = req.body;

  const tokens = await registerUserService(body);
  if (!tokens) {
    throw new ApiError("User registration failed", 500);
  }
  const { accessToken, refreshToken } = tokens;

  res.cookie("refreshToken", refreshToken, cookiesConfigration);

  return res.status(201).json({
    message: "User created successfully",
    data: {
      accessToken,
    },
  });
};

export const handleLogin = async (
  req: Request,
  res: Response,
  next: Function,
) => {
  const user = await loginUserService(req.body);
  if (!user) {
    throw new ApiError("User login failed", 500);
  }
  const { accessToken, refreshToken } = user;

  res.cookie("refreshToken", refreshToken, cookiesConfigration);

  res.status(200).json({
    message: "Login successful",
    data: {
      accessToken,
    },
  });
};

export const handleLogout = async (
  req: Request,
  res: Response,
  next: Function,
) => {
  const authHeader = req.headers.authorization;

  const accessToken = authHeader.split(" ")[1];

  const refreshToken = req.cookies.refreshToken;
  const logoutResult = await logoutUserService({ accessToken, refreshToken });
  if (!logoutResult) {
    throw new ApiError("Logout failed", 500);
  }
  res.clearCookie("refreshToken", cookiesConfigration);
  return res.status(200).json({ message: "Logout successful" });
};

export const handleForgotPassword = async (
  req: Request,
  res: Response,
  next: Function,
) => {};
