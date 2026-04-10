import mongoose from "mongoose";
import { ref } from "node:process";

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  { timestamps: true },
);

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;
