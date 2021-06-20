import mongoose from "mongoose";
import postModel from "../../../database/mongo/models/PostModel.js";
import UserModel from "../../../database/mongo/models/UserModel.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
} from "../../../core/apiErrors.js";

export const reactionPost = async (req, res, next) => {
  const urlArray = req.originalUrl.split("/");
  const reaction = urlArray[urlArray.length - 1];

  const finalReaction = reaction === "thoughtful" ? reaction : reaction + "s";

  const post = await postModel.findById(req.params.postId);

  const newArray = `${finalReaction}`;

  if (!post[finalReaction].includes(req.params.userId)) {
    const removed = await postModel.findOneAndUpdate(
      {
        _id: req.params.postId,
      },
      {
        $pull: {
          likes: req.params.userId,
          loves: req.params.userId,
          insightfuls: req.params.userId,
          celebrates: req.params.userId,
          supports: req.params.userId,
          curiouss: req.params.userId,
        },
      },
      {
        runValidators: true,
        new: true,
      }
    );
    const editedPost = await postModel.findOneAndUpdate(
      {
        _id: req.params.postId,
      },
      {
        $push: {
          [newArray]: req.params.userId,
        },
      },
      {
        runValidators: true,
        new: true,
      }
    );
    return res.status(201).send(editedPost);
  } else {
    const deleteReaction = await postModel.findByIdAndUpdate(
      req.params.postId,
      {
        $pull: {
          [newArray]: req.params.userId,
        },
      },

      {
        runValidators: true,
        new: true,
      }
    );
    return res.status(200).send(deleteReaction);
  }
};
