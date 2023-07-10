import express from "express";
import { getS3Url } from "../controllers/s3.js";

const router = express.Router();

router.get("/", getS3Url);

export default router;
