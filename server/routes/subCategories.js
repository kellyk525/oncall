import express from "express";
import {
  getSubCategories,
  addSubCategory,
} from "../controllers/subCategories.js";

const router = express.Router();

router.get("/", getSubCategories);
router.post("/add-subcategory", addSubCategory);

export default router;
