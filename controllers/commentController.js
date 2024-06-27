
const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// GET All Comments
exports.comment_list = asyncHandler(async (req, res, next) => {
    const allComments = await Comment.find({})
        .sort({ createdAt: -1 })
        .populate("author")
        .populate("post")
        .exec();
    res.send(allComments);
});

// GET Single Comment
exports.get_comment = asyncHandler(async (req, res, next) => {
    const comment = await Comment.findById(req.params.id)
        .populate("author")
        .populate("post")
        .exec();
    
        if (comment === null) {
        const err = new Error("Comment not found");
        err.status = 404;
        return next(err); 
    }
    res.send(comment);
});

// POST create new comment
exports.create_comment = [
    // Validation of form is handled here.
    body("body")
        .trim()
        .isLength({ min: 1})
        .escape()
        .withMessage("Comments cannot be blank"),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const comment = new Comment({
            author: req.body.userId,
            body: req.body.body,
            post: req.body.postId,
        });

        if(!errors.isEmpty()) {
            res.send(errors);
            return;
        } else {
            await comment.save();
            res.send(comment);
        }
    })
];

// POST update a comment
exports.update_comment = [    
    body("body")
        .trim()
        .isLength({ min: 1})
        .escape()
        .withMessage("Comments cannot be blank"),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const comment = new Comment({
            author: req.body.userId,
            body: req.body.body,
            post: req.body.postId,
        });

        if(!errors.isEmpty()) {
            res.send(errors);
            return;
        } else {
            const updatedComment = await Comment.findByIdAndUpdate(req.params.id, comment, {});
            res.send(updatedComment);
        }
    })
];


// DELETE Comment
exports.delete_comment = asyncHandler(async (req, res, next) => {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    res.send(deletedComment);
});