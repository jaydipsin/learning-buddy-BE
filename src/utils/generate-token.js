import jwt from "jsonwebtoken";
import {
  JWT_ACCESS_SECRET_KEY,
  JWT_REFRESH_SECRET_KEY,
} from "../utils/global.config.js";

const ensureSecrets = () => {
  if (!JWT_ACCESS_SECRET_KEY || !JWT_REFRESH_SECRET_KEY) {
    throw new Error(
      "JWT secret keys are missing. Set JWT_ACCESS_SECRET_KEY and JWT_REFRESH_SECRET_KEY in .env",
    );
  }
};

const generateRefreshToken = (user) => {
  ensureSecrets();
  const refreshToken = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },

    JWT_REFRESH_SECRET_KEY,
    {
      expiresIn: "7d",
    },
  );
  return refreshToken;
};
const generateAccessToken = (user) => {
  ensureSecrets();
  const accessToken = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    JWT_ACCESS_SECRET_KEY,
    {
      expiresIn: "15m",
    },
  );
  return accessToken;
};

export { generateAccessToken, generateRefreshToken };
