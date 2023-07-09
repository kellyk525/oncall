import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  subCategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
  ],
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
