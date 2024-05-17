const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User" },
    body: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }], // It is going to be an array of those who liked the post. That way, it will be easy to know when someone has already liked a post
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment"}],
}, { timestamps: true });

// Virtual for author's URL
PostSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/posts/${this._id}`;
  });

module.exports = mongoose.model("Post", PostSchema);