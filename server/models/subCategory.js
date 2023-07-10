import mongoose from "mongoose";

const subCategorySchema = mongoose.Schema({
  subCategory: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const SubCategory = mongoose.model("SubCategory", subCategorySchema);
export default SubCategory;
