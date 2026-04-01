import { UserService } from "../services/user.service.js";
export const handleUserProfile = async (req, res) => {
  try {
    console.log(`User profile fetched for user `, req.user);
    const user = new UserService();
    const dbUser = await user.getUserProfile(req);
    res.status(200).json({
      message: "User profile fetched successfully",
      data: {
        user: dbUser.toObject(),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
