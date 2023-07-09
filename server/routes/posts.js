import express from "express";
import { getPosts, addPost } from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/add-post", addPost);

export default router;
