import mongoose from "mongoose";
import { CommentSchema } from "./CommentModel.js";

const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    user_picture: {
      type: String,
      required: true,
    },
    comments: [CommentSchema],
    likes: [],
    celebrates: [],
    supports: [],
    loves: [],
    insightfuls: [],
    curiouss: [],
  },
  { timestamps: true }
);

export default model("Post", postSchema);
