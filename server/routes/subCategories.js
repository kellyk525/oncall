import express from "express";
import {
  getSubCategories,
  addSubCategory,
  deleteSubCategory,
} from "../controllers/subCategories.js";

const router = express.Router();

router.get("/", getSubCategories);
router.post("/add-subcategory", addSubCategory);
router.delete("/:id", deleteSubCategory);

export default router;
