const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    profilePhotoUrl: { type: String }, // THIS WILL STORE A CLOUDINARY URL
    userName: { type: String, required: true, maxLength: 100 },
    password: { type: String, required: true, maxLength: 100, minLength: 6 },
    firstName: { type: String, required: true, maxLength: 100 },
    lastName: { type: String, required: true, maxLength: 100 },
    email: { type: String, required: true, maxLength: 100 },
    aboutMe: { type: String, required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    friendRequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
    loggedIn: Boolean,
});

// Virtual for author's URL
UserSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/users/${this._id}`;
  });

module.exports = mongoose.model("User", UserSchema);