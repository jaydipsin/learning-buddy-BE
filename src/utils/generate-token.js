import jwt from "jsonwebtoken";
import {
  JWT_ACCESS_SECRETS_KEY,
  JWT_REFRESH_SECRETS_KEY,
} from "../utils/global.config";

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },

    JWT_REFRESH_SECRETS_KEY,
    {
      expiresIn: "7d",
    },
  );
  return refreshToken;
};
const generateAccessToken = (user) => {
  const accessToken = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    JWT_ACCESS_SECRETS_KEY,
    {
      expiresIn: "15m",
    },
  );
  return accessToken;
};

export { generateAccessToken, generateRefreshToken };
