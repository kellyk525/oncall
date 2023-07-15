import SubCategory from "../models/subCategory.js";
import Category from "../models/category.js";
import Post from "../models/post.js";
import mongoose from "mongoose";

export const getSubCategories = async (_, res) => {
  try {
    const subCategories = await SubCategory.find();
    res.status(200).send({
      success: true,
      message: "SubCategories Data",
      data: subCategories,
    });
  } catch (error) {
    res.status(404).send({ success: false, message: error.message });
  }
};

export const addSubCategory = async (req, res) => {
  const { categoryId, subCategory } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(categoryId))
      return res.status(404).send({
        success: false,
        message: `No category with that id`,
      });

    const existingSubCategory = await SubCategory.findOne({
      categoryId: categoryId,
      subCategory: subCategory.toLowerCase(),
    });

    if (existingSubCategory) {
      res.status(400).send({
        success: false,
        message: `This SubCategory - ${subCategory} already exists for specified category`,
      });
    } else {
      const newSubCategory = new SubCategory({
        categoryId,
        subCategory: subCategory.toLowerCase(),
      });
      await newSubCategory.save();

      // add subcategory to respective parent category
      const category = await Category.findById(categoryId);
      category.subCategories.push(newSubCategory._id);
      await category.save();

      res.status(200).send({
        success: true,
        message: "SubCategory Data",
        data: newSubCategory,
      });
    }
  } catch (error) {
    res.status(404).send({ success: false, message: error.message });
  }
};

export const deleteSubCategory = async (req, res) => {
  const { subCateogoryId } = req.params;
  const { categoryId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(subCateogoryId))
    return res
      .status(404)
      .send({ success: false, message: "No sub-category with that id" });

  try {
    const deleted = await SubCategory.findByIdAndRemove(subCateogoryId);

    // delete posts that match ids in deleted.posts
    await Post.deleteMany({ _id: { $in: deleted.posts } });
    // update the subCategories array in respective category
    await Category.update(
      { _id: categoryId },
      { $pull: { subCategories: subCateogoryId } }
    );

    res.status(200).send({ success: true, message: "Sub-category Deleted" });
  } catch (e) {
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
};
