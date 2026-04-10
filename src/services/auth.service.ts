import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generate-token.js";
import User, { IUser } from "../models/user.model.js";
import bcrypt from "bcrypt";
import {
  ILoginRequest,
  ILogoutParams,
  IRegisterRequest,
} from "../validators/auth.validator.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { blacklistToken } from "../utils/token-blacklist.js";
import { JwtPayload } from "../types/jwt.types.js";
import Course from "../models/course.model.js";

export const registerUserService = async (userData: IRegisterRequest) => {
  const user = await User.findOne({
    $or: [{ email: userData.email }, { userName: userData.userName }],
  });
  console.log("Tokens generated:", userData); // Debug log

  if (user) {
    throw new ApiError("User already exists", 400);
  }

  const hashPassword = await bcrypt.hash(userData.password, 10);

  let course = await Course.findOne({ name: userData.course });
  if (!course) {
    course = await Course.create({ name: userData.course });
  }

  const newUser = await User.create({
    userName: userData.userName,
    email: userData.email,
    password: hashPassword,
    organizationName: userData.organizationName,
    parentNumber: userData.parentNumber,
    course: {
      _id: course._id,
      name: course.name,
      subject: [],
    },
    role: userData.role,
  });

  const refreshToken = generateRefreshToken({
    _id: newUser._id,
    email: newUser.email,
    role: newUser.role,
  });
  const accessToken = generateAccessToken({
    _id: newUser._id,
    email: newUser.email,
    role: newUser.role,
  });

  newUser.refreshToken = refreshToken;
  await newUser.save();

  return {
    accessToken,
    refreshToken,
  };
};

export const loginUserService = async (userData: ILoginRequest) => {
  const { email, password } = userData;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password as string,
  );
  if (!isPasswordValid) {
    throw new ApiError("Invalid  password", 401);
  }

  const refreshToken = generateRefreshToken(user);
  const accessToken = generateAccessToken(user);
  user.refreshToken = refreshToken;
  await user.save();
  return {
    accessToken,
    refreshToken,
  };
};

export const logoutUserService = async ({
  refreshToken,
  accessToken,
}: ILogoutParams) => {
  const user = jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET_KEY,
  ) as JwtPayload;
  if (!user) {
    throw new ApiError("Invalid refresh token", 401);
  }
  const accessTokenUser = jwt.verify(
    accessToken,
    process.env.JWT_ACCESS_SECRET_KEY,
  ) as JwtPayload;

  const dbUser = await User.findOne({ _id: user._id });
  if (!dbUser) {
    throw new ApiError("User not found", 400);
  }

  dbUser.refreshToken = null;
  await dbUser.save();

  blacklistToken(refreshToken, user.exp);
  blacklistToken(accessToken, accessTokenUser.exp);

  return {
    message: "User logged out successfully",
  };
};
