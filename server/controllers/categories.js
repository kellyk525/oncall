import Category from "../models/category.js";

export const getCategories = async (_, res) => {
  try {
    const categories = await Category.find();
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
      res.status(200).send({
        success: true,
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
