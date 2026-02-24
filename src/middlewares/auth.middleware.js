import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET_KEY } from "../utils/global.config.js";
import { generateError } from "../helper/generate-error.js";
import { isAccessTokenBlacklisted } from "../utils/token-blacklist.js";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    generateError("Unauthorized", 401);
  }
  const accessToken = authHeader.split(" ")[1];
  if (!accessToken) {
    generateError("Unauthorized", 401);
  }

  if (isAccessTokenBlacklisted(accessToken)) {
    generateError("Access token has been revoked", 401);
  }

  try {
    const decode = jwt.verify(accessToken, JWT_ACCESS_SECRET_KEY);
    req.user = decode;
    next();
  } catch (error) {
    next(error);
  }
};
