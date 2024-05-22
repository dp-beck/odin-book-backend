// TO DO: IMPLEMENT CONTROLLER FUNCTIONS

const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");

// GET All Comments
exports.comment_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: COMMENT LIST");
});

// GET Single Comment
exports.get_comment = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: GET COMMENT: ${req.params.id}`)
});

// POST create new comment
exports.create_comment = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: CREATE COMMENT`)
});

// POST update a comment
exports.update_comment = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: UPDATE COMMENT`)
});

// DELETE post
exports.delete_comment = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: DELETE COMMENT`)
});