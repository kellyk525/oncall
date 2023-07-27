import SubCategory from "../models/subCategory.js";
import Category from "../models/category.js";
import Collection from "../models/collection.js";
import Post from "../models/post.js";
import User from "../models/user.js";
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
  const { title, description, categoryId, subCategoryId, creatorId } = req.body;

  if (!req.userId)
    return res.json({ success: false, message: "Unauthenticated" });

  try {
    if (!mongoose.Types.ObjectId.isValid(categoryId))
      return res.status(404).send("No Category with that id");
    if (!mongoose.Types.ObjectId.isValid(subCategoryId))
      return res.status(404).send("No SubCategory with that id");
    if (!mongoose.Types.ObjectId.isValid(creatorId))
      return res.status(404).send("No User with that id");

    const newPost = new Post({
      title,
      description,
      categoryId,
      subCategoryId,
      creatorId,
    });
    await newPost.save();

    // add post to respective category
    const category = await Category.findById(categoryId);
    category.posts.push(newPost._id);
    await category.save();

    // add post to respective sub-category
    const subCategory = await SubCategory.findById(subCategoryId);
    subCategory.posts.push(newPost._id);
    await subCategory.save();

    // add post to user
    const user = await User.findById(creatorId);
    user.posts.push(newPost._id);
    await user.save();

    res
      .status(200)
      .send({ success: true, message: "Post Data", data: newPost });
  } catch (error) {
    res.status(404).send({ success: false, message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { postId: _id } = req.params;
  const { post, creatorId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res
      .status(404)
      .send({ success: false, message: "No post with that id" });

  if (req.userId !== creatorId)
    return res
      .status(404)
      .send({ success: false, message: "Not authorized to update post" });

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      _id,
      { ...post, _id },
      { new: true }
    );
    res
      .status(200)
      .send({ success: true, message: "Post Updated", data: updatedPost });
  } catch (e) {
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
};

export const deletePost = async (req, res) => {
  const { postId: _id } = req.params;
  const { creatorId, subCategoryId, categoryId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res
      .status(404)
      .send({ success: false, message: "No post with that id" });

  if (req.userId !== creatorId)
    return res
      .status(404)
      .send({ success: false, message: "Not authorized to delete post" });

  try {
    await Post.findByIdAndRemove(_id);

    await Category.findByIdAndUpdate(
      categoryId,
      {
        $pull: { posts: _id },
      },
      { new: true }
    );
    await SubCategory.findByIdAndUpdate(
      subCategoryId,
      {
        $pull: { posts: _id },
      },
      { new: true }
    );

    res.status(200).send({ success: true, message: "Post Deleted" });
  } catch (e) {
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
};
