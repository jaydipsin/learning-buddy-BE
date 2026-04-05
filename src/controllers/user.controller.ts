import { NextFunction, Request, Response } from "express";
import { getUserProfileService } from "../services/user.service.js";

export const handleUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log(`User profile fetched for user `, req.user);
    const dbUser = await getUserProfileService(req.user._id);
    res.status(200).json({
      message: "User profile fetched successfully",
      data: {
        user: dbUser.toObject(),
      },
    });
  } catch (error) {
    next(error);
  }
};
