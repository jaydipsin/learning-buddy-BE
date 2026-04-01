import { Request, Response } from "express";

export const globalErrorHandler = (err: any, req: Request, res: Response) => {
  let statusCode = err.statusCode || 500;
  if (err?.cause?.errorResponse?.code === 11000) statusCode = 409;

  const message = err.message || "Internal Server Error";
  const data = err.data || null;

  res.status(err.statusCode).json({
    success: false,
    message: message,
    data: data,
  });
};
