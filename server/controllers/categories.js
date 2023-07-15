import SubCategory from "../models/subCategory.js";
import Category from "../models/category.js";
import Post from "../models/post.js";
import mongoose from "mongoose";

export const getCategories = async (_, res) => {
  try {
    const categories = await Category.find()
      .populate({
        path: "subCategories",
        populate: {
          path: "posts",
        },
      })
      .exec();

    res.status(200).send({ success: true, data: categories });
  } catch (error) {
    res.status(404).send({ success: false, message: error.message });
  }
};

export const addCategory = async (req, res) => {
  const { category } = req.body;

  try {
    const categoryData = await Category.findOne({
      category: category.toLowerCase(),
    });

    if (categoryData) {
      res.status(400).send({
        success: false,
        message: `This Category - ${category} already exists`,
      });
    } else {
      const newCategory = new Category({
        category: category.toLowerCase(),
      });

      const savedCategory = await newCategory.save();
      res
        .status(200)
        .send({ success: true, message: "Category Data", data: savedCategory });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(categoryId))
    return res
      .status(404)
      .send({ success: false, message: "No category with that id" });

  try {
    const deletedCategory = await Category.findByIdAndRemove(categoryId);
    await SubCategory.deleteMany({
      _id: { $in: deletedCategory.subCategories },
    });
    await Post.deleteMany({
      _id: { $in: deletedCategory.posts },
    });

    res.status(200).send({ success: true, message: "Category Deleted" });
  } catch (e) {
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
};
