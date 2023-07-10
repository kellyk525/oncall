import Post from "../models/post.js";
import SubCategory from "../models/subCategory.js";
import mongoose from "mongoose";

export const getPosts = async (_, res) => {
  try {
    const posts = await Post.find();
    res.status(200).send({ success: true, message: "Post Data", data: posts });
  } catch (error) {
    res.status(404).send({ success: false, message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    res
      .status(200)
      .send({ success: true, message: "Single Post Data", data: post });
  } catch (error) {
    res.status(404).send({ success: false, message: error.message });
  }
};

export const addPost = async (req, res) => {
  const { title, description, categoryId, subCategoryId } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(categoryId))
      return res.status(404).send("No Category with that id");
    if (!mongoose.Types.ObjectId.isValid(subCategoryId))
      return res.status(404).send("No SubCategory with that id");

    const newPost = new Post({ title, description, categoryId, subCategoryId });
    await newPost.save();

    // add post to respective sub-category
    const subCategory = await SubCategory.findById(subCategoryId);
    subCategory.posts.push(newPost._id);
    await subCategory.save();

    res
      .status(200)
      .send({ success: true, message: "Post Data", data: newPost });
  } catch (error) {
    res.status(404).send({ success: false, message: error.message });
  }
};
