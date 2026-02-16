import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: false,
    },
    resetToken: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    toObject: function (doc, ret) {
      delete ret.password;
      delete ret.refreshToken;
      delete ret.resetToken;
      return ret;
    },
  },
);

const User = mongoose.model("User", userSchema);

export default User;
