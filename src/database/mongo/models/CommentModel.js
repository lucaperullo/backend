import mongoose from "mongoose";

const { Schema, model } = mongoose;

export const CommentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default model("Comment", CommentSchema);
