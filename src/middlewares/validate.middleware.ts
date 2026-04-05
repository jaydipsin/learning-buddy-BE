import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";

export const validate =
  (schema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      return new ApiError(result.error.issues[0].message, 400);
    }

    req.body = result.data.body;
    req.query = result.data.query;
    req.params = result.data.params;

    next();
  };
