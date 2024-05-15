const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// TO DO: DEFINE Schema Values; Research how to handle user profile photos

const UserSchema = new Schema({
    profilePhoto,
    userName,
    password,
    firstName,
    lastName,
    email,
    aboutMe,
    posts,
    friends,
});