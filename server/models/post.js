// Post model/schema
// Everything in mongoose starts with a schema, each schema maps to a mongodb collection
// and defines the shape of the document within the collection
import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  richDescription: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  categoryId: {
    type: String,
    required: true,
  },
  subCategoryId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
