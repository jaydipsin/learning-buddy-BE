import User from "../models/user.model.js";

export const handleUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile fetched successfully",
      data: {
        user: user.toObject(),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
