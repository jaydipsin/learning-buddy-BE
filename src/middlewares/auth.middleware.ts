import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET_KEY } from "../utils/global.config.js";
import { generateError } from "../helper/generate-error.js";
import { isTokenBlackListed } from "../utils/token-blacklist.js";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import { IReqUSer } from "../types/express.js";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new ApiError("Access token is missing", 401);
  }
  const accessToken = authHeader.split(" ")[1];
  if (!accessToken) {
    throw new ApiError("Access token is missing", 401);
  }

  if (
    isTokenBlackListed(accessToken) ||
    isTokenBlackListed(req.cookies.refreshToken)
  ) {
    throw new ApiError("Access token is missing", 401);
  }

  try {
    const decode = jwt.verify(accessToken, JWT_ACCESS_SECRET_KEY) as IReqUSer;
    req.user = decode;
    next();
  } catch (error) {
    next(error);
  }
};
