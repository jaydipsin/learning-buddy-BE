import { getUserDataById } from "../helper/data-retrive";
import { generateError } from "../helper/generate-error";

export const chatWithAIMentor = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const usertData = await getUserDataById(userId);
    if (!usertData) {
      res.status(404).json({ message: "User not found" });
    }

    

  } catch (error) {
    generateError(error.message, error.status || 500, next);
  }
};
