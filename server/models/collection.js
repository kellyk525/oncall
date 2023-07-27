import mongoose from "mongoose";
import Post from "./post.js";

const collectionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

collectionSchema.pre("findOneAndRemove", async function (next) {
  // remove references of deleted collectionId in all Post.collections
  // [from posts that were part of the deleted collection]
  const docToUpdate = await this.model.findOne(this.getFilter());
  await Post.updateMany(
    { _id: { $in: docToUpdate.posts } },
    { $pull: { collections: docToUpdate._id } },
    { upsert: false, multi: true }
  );

  next();
});

const Collection = mongoose.model("Collection", collectionSchema);
export default Collection;
