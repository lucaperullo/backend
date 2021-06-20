import express from "express";
import { asyncHandler } from "../../../core/asyncHandler.js";
import {
  getAllPosts,
  getAllPostsByUser,
  getPostByID,
  createNewPost,
  editPost,
  deletePost,
  postImage,
  uploadImagePostMddw,
  createComment,
  updateComment,
  deleteComment,
} from "./postControllers.js";
import { reactionPost } from "./reactionControllers.js";

const router = express.Router();

router.route("/").get(asyncHandler(getAllPosts)); // Ok

router
  .route("/:userId")
  .get(asyncHandler(getAllPostsByUser)) //  Ok
  .post(asyncHandler(createNewPost)) // Ok
  .post(asyncHandler(postImage)); // *

router
  .route("/:postId/user/:userId")
  .post(uploadImagePostMddw.single("imagePost"), asyncHandler(postImage)) // Ok
  .get(asyncHandler(getPostByID)) //Ok
  .put(asyncHandler(editPost)) // Ok
  .delete(asyncHandler(deletePost)); // Ok

// *****************COMMENTS ROUTES ***************

// router.route("/:userId/:postId/comments").get(asyncHandler(getAllComments));

router.route("/:postId/user/:userId/comment").post(asyncHandler(createComment));
router
  .route("/:postId/user/:userId/comment/:commentId")
  .put(asyncHandler(updateComment))
  .delete(asyncHandler(deleteComment));

// *****************LIKE, CLAP, IDEA, FAVORITES, THOUGHTFUL => ROUTES ***************

router.route("/:postId/user/:userId/like").post(asyncHandler(reactionPost));
router
  .route("/:postId/user/:userId/celebrate")
  .post(asyncHandler(reactionPost));
router
  .route("/:postId/user/:userId/insightful")
  .post(asyncHandler(reactionPost));
router.route("/:postId/user/:userId/love").post(asyncHandler(reactionPost));
router.route("/:postId/user/:userId/curious").post(asyncHandler(reactionPost));
router.route("/:postId/user/:userId/support").post(asyncHandler(reactionPost));

export default router;
