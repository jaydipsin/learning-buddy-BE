import { generateError } from "../helper/generate-error.js";
import User from "../models/user.model.js";
import dotenv from "dotenv";
import { generateAccessToken } from "../utils/generate-token.js";
import jwt from "jsonwebtoken";

dotenv.config();

export const handleRefreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      generateError("Refresh token not found", 401);
    }
    console.log("This is the step 1", refreshToken);

    const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);

    console.log("This is the step 2", user);
    if (!user) {
      generateError("Invalid refresh token", 401);
    }

    console.log("This is the step 3");
    const dbUser = await User.findOne({ _id: user._id });
    console.log("This is the step 4");

    if (!dbUser) {
      generateError("User not found", 404);
    }

    const isTokenExpired = checkRefreshExpired(dbUser);
    if (isTokenExpired) {
      dbUser.refreshToken = null;
      await dbUser.save();
      generateError("Refresh token has expired, please login again", 401);
    }

    const accessToken = generateAccessToken(user);
    res.status(200).json({
      message: "Access token refreshed successfully",
      data: {
        accessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const checkRefreshExpired = (user) => {
  const currentTime = Math.floor(Date.now() / 1000);
  if (user.exp < currentTime) {
    return true;
  }
  return false;
};
