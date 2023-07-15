import express from "express";
import {
  getPosts,
  getPost,
  addPost,
  deletePost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:postId", getPost);
router.post("/add-post", auth, addPost);
// router.patch("/:postId", updatePost);
router.delete("/:postId", auth, deletePost);

export default router;
