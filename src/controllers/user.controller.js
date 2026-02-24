import User from "../models/user.model.js";

export const handleUserProfile = async (req, res) => {
  try {
    console.log(`User profile fetched for user `, req.user);
    const user = req.user;
    const dbUser = await User.findOne({ _id: user._id });

    if (!dbUser) {
      return res.status(404).json({ message: "User not found" });
    }
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
