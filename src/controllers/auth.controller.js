import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generate-token";

dotenv.config();

export const handleRegister = async (req, res) => {
  try {
    const erros = vlidateResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ message: erros.array()[0].msg });
    }
    const {
      userName,
      email,
      password,
      confirmPassword,
      organizationName,
      parentNumber,
      subjects,
      role,
    } = req.body;

    const user = await User.findOne({ $or: { email, userName } });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Password hash
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userName,
      email,
      password: hashPassword,
      organizationName,
      parentNumber,
      subjects,
      role,
    });

    const refreshToken = generateRefreshToken(newUser);

    newUser.refreshToken = refreshToken;
    await newUser.save();

    const accessToken = generateAccessToken(newUser);

    res.cookies("refreshToken", refreshToken, {
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    newUser.refreshToken = refreshToken;
    await newUser.save();
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const handleLogin = async () => {};

export const handleLogout = async () => {};

export const handleForgotPassword = async () => {};
