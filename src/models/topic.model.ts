import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
    },
  },
  { timestamps: true },
);

const Topic = mongoose.model("Topic", topicSchema);

export default Topic;
