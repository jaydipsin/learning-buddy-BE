import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generate-token.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import {
  ILoginRequest,
  ILogoutParams,
  IRegisterRequest,
} from "../validators/auth.validator.js";
import { ApiError } from "../utils/ApiError.js";
import * as jwt from "jsonwebtoken";
import { blacklistToken } from "../utils/token-blacklist.js";
import { JwtPayload } from "../types/jwt.types.js";

export const registerUserService = async (userData: IRegisterRequest) => {
  const user = await User.findOne({
    $or: [{ email: userData.email }, { userName: userData.userName }],
  });
  if (user) {
    throw new ApiError("User already exists", 400);
  }

  const hashPassword = await bcrypt.hash(userData.password, 10);

  const newUser = await User.create({
    userName: userData.userName,
    email: userData.email,
    password: hashPassword,
    organizationName: userData.organizationName,
    parentNumber: userData.parentNumber,
    subjects: userData.subjects,
    role: userData.role,
  });

  const refreshToken = generateRefreshToken(newUser);
  const accessToken = generateAccessToken(newUser);

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
