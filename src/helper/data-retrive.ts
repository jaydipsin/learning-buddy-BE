import User from "../models/user.model.js";
import { generateError } from "./generate-error.js";

export const getUserDataById = async (userId) => {
  try {
    const userData = await User.findById(userId);
    return userData;
  } catch (error) {
    generateError(error.message, error.status || 500);
  }
};

