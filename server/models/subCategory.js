import mongoose from "mongoose";

const subCategorySchema = mongoose.Schema({
  subCategory: {
    type: String,
    required: true,
  },
  categoryId: {
    type: String,
    required: true,
  },
});

const SubCategory = mongoose.model("SubCategory", subCategorySchema);
export default SubCategory;
