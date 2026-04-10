import mongoose from "mongoose";
import { optional } from "zod";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  userName: string;
  email: string;
  password?: string;
  refreshToken?: string;
  resetToken?: string;
  organizationName: string;
  parentNumber: string;

  // Updated course structure to match the new schema
  course: {
    _id: mongoose.Types.ObjectId;
    name: string;
    subject: {
      _id: mongoose.Types.ObjectId;
      name: string;
    }[];
  };

  role: "admin" | "teacher" | "student" | "parent";

  progress?: {
    topicId: mongoose.Types.ObjectId;
    accuracy: number;
    attempts: number;
    correctAnswers: number;
    wrongAnswers: number;
    lastAttempted: Date;
  }[];

  createdAt?: Date;
  updatedAt?: Date;
}

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
    course: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      subject: {
        type: [
          {
            _id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Subject",
              required: true,
            },
            name: {
              type: String,
              required: true,
            },
          },
        ],
        default: [],
      },
    },
    progress: {
      type: [
        {
          topicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Topic",
            required: true,
          },
          accuracy: { type: Number, default: 0 },
          attempts: { type: Number, default: 0 },
          correctAnswers: { type: Number, default: 0 },
          wrongAnswers: { type: Number, default: 0 },
          lastAttempted: { type: Date, default: Date.now },
        },
      ],
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
  },
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
