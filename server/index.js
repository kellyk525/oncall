import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import s3Routes from "./routes/s3.js";
import postRoutes from "./routes/posts.js";
import categoryRoutes from "./routes/categories.js";
import subCategoryRoutes from "./routes/subCategories.js";
import authRoutes from "./routes/users.js";
import collectionRoutes from "./routes/collections.js";

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// App Routes
app.use("/s3Url", s3Routes);
app.use("/posts", postRoutes);
app.use("/categories", categoryRoutes);
app.use("/sub-categories", subCategoryRoutes);
app.use("/auth", authRoutes);
app.use("/collections", collectionRoutes);

// https://www.mongodb.com/cloud/atlas
// host our db on their cloud
const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log("db connection error:", error.message));
