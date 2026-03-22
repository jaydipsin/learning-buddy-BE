import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false, // Prevents password from being returned in queries by default
    },
    refreshToken: {
      type: String,
      select: false,
    },
    resetToken: {
      type: String,
      select: false,
    },
    organizationName: {
      type: String,
      required: true,
      trim: true,
    },
    parentNumber: {
      type: String,
      required: true,
    },
    subjects: {
      type: [String],
      default: [],
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "teacher", "student", "parent"], // Example: restricts roles to specific values
      default: "student",
    },
  },
  {
    timestamps: true,
    // Applies the transformation when converting to JSON (API responses)
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        delete ret.refreshToken;
        delete ret.resetToken;
        delete ret.__v; // Usually good to hide the version key
        return ret;
      },
    },
    // Applies the transformation when converting to a plain JS object
    toObject: {
      transform: (doc, ret) => {
        delete ret.password;
        delete ret.refreshToken;
        delete ret.resetToken;
        return ret;
      },
    },
  }
);

const User = mongoose.model("User", userSchema);

export default User;