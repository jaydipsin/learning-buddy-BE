import { NextFunction, Request, Response } from "express";

export const asyncHandler =
  (fn) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve()
      .then(() => fn(req, res, next))
      .catch(next);
  };
