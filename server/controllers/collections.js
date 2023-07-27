import mongoose from "mongoose";
import User from "../models/user.js";
import Collection from "../models/collection.js";
import Post from "../models/post.js";

export const getUserCollections = async (req, res) => {
  const { creatorId } = req.params;

  if (!req.userId)
    return res.json({ success: false, message: "Unauthenticated" });

  if (req.userId !== creatorId)
    return res.json({
      success: false,
      message: "Users don't match. The collection belongs to a different user.",
    });

  try {
    const user = await User.findById(creatorId)
      .populate({
        path: "collections",
        populate: {
          path: "posts",
        },
      })
      .exec();

    res.status(200).send({
      success: true,
      message: "User Collections",
      data: user.collections,
    });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};

// post request
export const addCollection = async (req, res) => {
  const { title, creatorId } = req.body;

  if (!req.userId)
    return res.json({ success: false, message: "Unauthenticated" });

  if (req.userId !== creatorId)
    return res.json({
      success: false,
      message: "Users don't match. Please try logging in again.",
    });

  try {
    // Search if collection already exists in collection
    const existingCollection = await Collection.findOne({
      title: title,
    });

    if (existingCollection) {
      return res.status(400).send({
        success: false,
        message: `This Collection already exists`,
      });
    }

    const newCollection = new Collection({
      title,
      creatorId,
    });

    await newCollection.save();

    // Add collection id to creator/user collections
    await User.findOneAndUpdate(
      { _id: creatorId },
      { $push: { collections: newCollection._id } }
    );

    res
      .status(200)
      .send({ success: true, message: "New Collection", data: newCollection });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};

export const addPostToCollection = async (req, res) => {
  const { collectionId, postId } = req.params;
  const { creatorId } = req.body;

  if (!req.userId)
    return res.json({ success: false, message: "Unauthenticated" });

  if (req.userId !== creatorId)
    return res.json({
      success: false,
      message: "Users don't match. Please try logging in again.",
    });

  if (!mongoose.Types.ObjectId.isValid(collectionId))
    return res.status(404).send("No Collection with that id");
  if (!mongoose.Types.ObjectId.isValid(postId))
    return res.status(404).send("No Post with that id");

  try {
    // Search if post already exists in collection
    const existingPostInCollection = await Collection.findOne({
      _id: collectionId,
      posts: {
        _id: postId,
      },
    });

    if (existingPostInCollection) {
      return res.status(400).send({
        success: false,
        message: `This Post already exists in collection`,
      });
    }

    // Add post id to specific collection (post ids array)
    await Collection.findOneAndUpdate(
      { _id: collectionId },
      { $push: { posts: postId } }
    );

    // Add reference of new collectionId in Post.collections
    const newPost = await Post.findOneAndUpdate(
      { _id: postId },
      { $push: { collections: collectionId } }
    );

    res.status(200).send({
      success: true,
      message: `Post added to collection`,
      data: newPost,
    });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};

export const removePostFromCollection = async (req, res) => {
  const { collectionId, postId } = req.params;
  const { creatorId } = req.body;

  if (!req.userId)
    return res.json({ success: false, message: "Unauthenticated" });

  if (req.userId !== creatorId)
    return res.json({
      success: false,
      message: "Users don't match. Please try logging in again.",
    });

  if (!mongoose.Types.ObjectId.isValid(collectionId))
    return res.status(404).send("No Collection with that id");

  try {
    const updatedCollection = await Collection.findOneAndUpdate(
      { _id: collectionId },
      { $pull: { posts: postId } }
    );

    // remove reference of collectionId in Post.collections
    await Post.findOneAndUpdate(
      { _id: postId },
      { $pull: { collections: updatedCollection._id } }
    );

    res.status(200).send({
      success: true,
      message: "Removed post from collection",
      data: updatedCollection,
    });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};

export const deleteCollection = async (req, res) => {
  const { collectionId } = req.params;
  const { creatorId } = req.body;

  if (!req.userId)
    return res.json({ success: false, message: "Unauthenticated" });

  if (req.userId !== creatorId)
    return res.json({
      success: false,
      message: "Users don't match. The collection belongs to a different user.",
    });

  if (!mongoose.Types.ObjectId.isValid(collectionId))
    return res.status(404).send("No Collection with that id");

  try {
    const deletedCollection = await Collection.findByIdAndRemove(collectionId);

    // remove deleted collectionId from User.collections
    await User.findOneAndUpdate(
      { _id: creatorId },
      { $pull: { collections: deletedCollection._id } }
    );

    res.status(200).send({
      success: true,
      message: `${deletedCollection.title} Collection Removed`,
    });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};
