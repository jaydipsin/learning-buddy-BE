import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generate-token.js";
import { cookiesConfigration } from "../helper/cookie-config.js";
import { generateError } from "../helper/generate-error.js";

dotenv.config();

export const handleRegister = async (req, res) => {
  try {
    const erros = validationResult(req);
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

    const user = await User.findOne({
      $or: [{ email: email }, { userName: userName }],
    });
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
    console.log(
      `Refresh token generated for user ${newUser._id}: ${refreshToken}`,
    );
    newUser.refreshToken = refreshToken;
    await newUser.save();

    const accessToken = generateAccessToken(newUser);
    console.log(
      `Access token generated for user ${newUser._id}: ${accessToken}`,
    );

    res.cookie("refreshToken", refreshToken, cookiesConfigration);

    newUser.refreshToken = refreshToken;
    await newUser.save();
    console.log(newUser);
    return res.status(201).json({
      message: "User created successfully",
      data: {
        accessToken,
      },
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal server error",
    }); // return res.status(500).json({ message: "Internal server error" });
  }
};

export const handleLogin = async (req, res) => {
  try {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      generateError(erros.array()[0].msg, 400);
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      generateError("Invalid credentials", 400);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      generateError("Invalid credentials", 400);
    }

    const refreshToken = generateRefreshToken(user);
    res.cookie("refreshToken", refreshToken, cookiesConfigration);
    const accessToken = generateAccessToken(user);
    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
      message: "Login successful",
      data: {
        accessToken,
      },
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal server error",
    });
  }
};

export const handleLogout = async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    console.log(`Access token received for logout: ${accessToken}`);
    const accessTokenUser = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET_KEY,
    );

    if (!accessTokenUser) {
      return res.status(401).json({ message: "Invalid access token" });
    }

    const refreshToken = req.cookies.refreshToken;
    console.log(`Refresh token received for logout: ${refreshToken}`);
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found" });
    }

    const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);
    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const dbUser = await User.findOne({ _id: user._id });
    if (!dbUser) {
      return res.status(400).json({ message: "User not found" });
    }

    dbUser.refreshToken = null;
    await dbUser.save();

    res.clearCookie("refreshToken", cookiesConfigration);

    jwt.destroy(refreshToken);
    jwt.destroy(accessToken);

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return generateError(
      error.message || "Internal server error",
      error.statusCode || 500,
    );
  }
};

export const handleForgotPassword = async () => {};
