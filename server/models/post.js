// Post model/schema
// Everything in mongoose starts with a schema, each schema maps to a mongodb collection
// and defines the shape of the document within the collection
import mongoose from "mongoose";
import Collection from "./collection.js";
import User from "./user.js";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  collections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
    },
  ],
});

postSchema.pre("findOneAndRemove", async function (next) {
  // In query middleware: 'this' --> refers to query
  // Before deleting a post, remove references of deleted postId in all Collection.posts
  // [collections that referenced the deleted post]
  const docToUpdate = await this.model.findOne(this.getFilter());
  await Collection.updateMany(
    { _id: { $in: docToUpdate.collections } },
    { $pull: { posts: docToUpdate._id } },
    { upsert: false, multi: true }
  );

  // Remove references of deleted postId in User.posts
  await User.findByIdAndUpdate(
    docToUpdate.creatorId,
    {
      $pull: { posts: docToUpdate._id },
    },
    { new: true }
  );

  next();
});

const Post = mongoose.model("Post", postSchema);
export default Post;
