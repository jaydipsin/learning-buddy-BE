import jwt from "jsonwebtoken";
import {
  JWT_ACCESS_SECRET_KEY,
  JWT_REFRESH_SECRET_KEY,
} from "./global.config.js";
import { IUser } from "../models/user.model.js";
import mongoose from "mongoose";

const ensureSecrets = () => {
  if (!JWT_ACCESS_SECRET_KEY || !JWT_REFRESH_SECRET_KEY) {
    throw new Error(
      "JWT secret keys are missing. Set JWT_ACCESS_SECRET_KEY and JWT_REFRESH_SECRET_KEY in .env",
    );
  }
};

const generateRefreshToken = (data: {
  _id: mongoose.Types.ObjectId;
  email: string;
  role: string;
}) => {
  ensureSecrets();
  const refreshToken = jwt.sign(
    {
      _id: data._id,
      email: data.email,
      role: data.role,
    },

    JWT_REFRESH_SECRET_KEY,
    {
      expiresIn: "7d",
    },
  );
  return refreshToken;
};
const generateAccessToken = (data: {
  _id: mongoose.Types.ObjectId;
  email: string;
  role: string;
}) => {
  ensureSecrets();
  const accessToken = jwt.sign(
    {
      _id: data._id,
      email: data.email,
      role: data.role,
    },
    JWT_ACCESS_SECRET_KEY,
    {
      expiresIn: "15m",
    },
  );
  return accessToken;
};

export { generateAccessToken, generateRefreshToken };
