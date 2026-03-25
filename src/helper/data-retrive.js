import User from "../models/user.model";
import { generateError } from "./generate-error";

export const getUserDataById = async (userId) => {
  try {
    const userData = await User.findById(userId);
    return userData;
  } catch (error) {
    generateError(error.message, error.status || 500);
  }
};

