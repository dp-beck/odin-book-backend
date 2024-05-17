const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User" },
    body: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post" },
}, { timestamps: true });

// Virtual for author's URL
CommentSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/comments/${this._id}`;
  });

module.exports = mongoose.model("Comment", CommentSchema);