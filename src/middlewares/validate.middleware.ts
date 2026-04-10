import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";

export const validate =
  (schema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(
        new ApiError(result.error.issues[0]?.message ?? "Validation failed", 400),
      );
    }

    req.body = result.data;

    next();
  };
