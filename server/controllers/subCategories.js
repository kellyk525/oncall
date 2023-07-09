import mongoose from "mongoose";
import Category from "../models/category.js";
import SubCategory from "../models/subCategory.js";

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
      return res.status(404).send("No Category with that id");

    const existingSubCategory = await SubCategory.findOne({
      categoryId: categoryId,
      subCategory: subCategory.toLowerCase(),
    });

    if (existingSubCategory) {
      res.status(200).send({
        success: true,
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
