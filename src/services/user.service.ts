import User from "../models/user.model.js";
import { Request } from "express";
import { ApiError } from "../utils/ApiError.js";

export class UserService {
  async getUserProfile(req: Request) {
    const user = req.user;
    const dbUser = await User.findOne({ _id: user._id });

    if (!dbUser) {
      throw new ApiError("User not found", 404);
    }
    return dbUser;
  }
}
