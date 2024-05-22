// TO DO: IMPLEMENT CONTROLLER FUNCTIONS

const Post = require("../models/post");
const asyncHandler = require("express-async-handler");

// GET All Posts
exports.post_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: POST LIST");
});

// GET Single Post
exports.get_post = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: GET POST: ${req.params.id}`)
});

// POST create new post
exports.create_post = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: CREATE POST`)
});

// POST update a post
exports.update_post = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: UPDATE POST`)
});

// DELETE post
exports.delete_post = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: DELETE POST`)
});