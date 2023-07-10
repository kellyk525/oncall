import express from "express";
import { getPosts, getPost, addPost } from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:postId", getPost);
router.post("/add-post", addPost);

export default router;
