import express from "express";
import { getCategories, addCategory } from "../controllers/categories.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/add-category", addCategory);

export default router;
