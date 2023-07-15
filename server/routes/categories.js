import express from "express";
import {
  getCategories,
  addCategory,
  deleteCategory,
} from "../controllers/categories.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/add-category", addCategory);
router.delete("/:categoryId", deleteCategory);

export default router;
