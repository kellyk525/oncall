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
});

const SubCategory = mongoose.model("SubCategory", subCategorySchema);
export default SubCategory;
