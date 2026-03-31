import { getUserDataById } from "../helper/data-retrive.js";
import { generateError } from "../helper/generate-error.js";
import type { NextFunction, Request, Response } from "express";

export const chatWithAIMentor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // const userId = req.user.id;

    const usertData = await getUserDataById( ""); // Replace with actual user ID retrieval logic
    if (!usertData) {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // generateError(error.message, error.status || 500, next());
  }
};
