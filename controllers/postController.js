const Post = require("../models/post");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// GET All Posts
exports.post_list = asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find({})
        .sort({ createdAt: -1 })
        .populate("author")
        .populate("likes")
        .populate("comments")
        .exec();
    res.send(allPosts);
});

// GET Single Post
exports.get_post = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id)
        .populate("author")
        .populate("likes")
        .populate("comments")
        .exec();
    
        if (post === null) {
        const err = new Error("Post not found");
        err.status = 404;
        return next(err); 
    }
    res.send(post);
});

// POST create new post
exports.create_post = [
    // Validation of form is handled here.
    body("body")
        .trim()
        .isLength({ min: 1})
        .escape()
        .withMessage("Posts cannot be blank"),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const post = new Post({
            author: req.body.userId,
            body: req.body.body,
        });

        if(!errors.isEmpty()) {
            res.send(errors);
            return;
        } else {
            await post.save();
            res.send(post);
        }
    })
];

// POST update a post
exports.update_post = [    
    body("body")
        .trim()
        .isLength({ min: 1})
        .escape()
        .withMessage("Posts cannot be blank"),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const post = new Post({
            author: req.body.userId,
            body: req.body.body,
        });

        if(!errors.isEmpty()) {
            res.send(errors);
            return;
        } else {
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, post, {});
            res.send(updatedPost);
        }
    })
]

// DELETE post
exports.delete_post = asyncHandler(async (req, res, next) => {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    res.send(deletedPost);
});

// POST Add Like to Post
exports.like_post = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    if (post.likes.includes(req.body.likerId)) {
        let msg = {alreadyLiked: true,
            msg: "You have already liked this post."};
        res.json(msg);
    } else {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id, 
            {$push: {likes: req.body.likerId}},
            {}
        ); 
        res.send(updatedPost);
    }
});

// POST Add Comment to Post
exports.comment_post = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    if (post.comments.includes(req.body.commentId)) {
        res.send("This comment has already been added to this post.");
    } else {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id, 
            {$push: {comments: req.body.commentId}},
            {}
        ); 
        res.send(updatedPost);
    }
});