import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import s3Routes from "./routes/s3.js";
import postRoutes from "./routes/posts.js";
import categoryRoutes from "./routes/categories.js";
import subCategoryRoutes from "./routes/subCategories.js";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// App Routes
app.use("/s3Url", s3Routes);
app.use("/posts", postRoutes);
app.use("/categories", categoryRoutes);
app.use("/sub-categories", subCategoryRoutes);

// https://www.mongodb.com/cloud/atlas
// host our db on their cloud
const CONNECTION_URL =
  "mongodb+srv://kellk1477:kelly123123@cluster0.uxlco7p.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 8000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
