import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: mongoose.Schema.Types.String,
      required: [true, "Title is required"],
      trim: true,
    },
    content: {
      type: mongoose.Schema.Types.String,
      required: [true, "Content is required"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    tags: {
        type: [mongoose.Schema.Types.String],
        default: []
    }
  },
  {
    timestamps: true,
  }
);

export const Blog = mongoose.model("Blog", BlogSchema);