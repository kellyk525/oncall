import express from "express";
import {
  getUserCollections,
  deleteCollection,
  addCollection,
  addPostToCollection,
  removePostFromCollection,
} from "../controllers/collections.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/:creatorId", auth, getUserCollections);
router.post("/new", auth, addCollection);
router.delete("/:collectionId", auth, deleteCollection);
router.patch("/:collectionId/posts/:postId", auth, addPostToCollection);
router.delete("/:collectionId/posts/:postId", auth, removePostFromCollection);

export default router;
