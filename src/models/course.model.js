import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true },
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
