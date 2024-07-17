const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

const multer = require('multer');
const upload = multer();

const passport = require('passport');
const JwtStrategy = require('./strategies/jwt.js');
passport.use(JwtStrategy);


/* AUTHENTICATION ROUTE */
router.get('/protected', passport.authenticate('jwt', { session: false}), (req, res, next) => {
    return res.send(req.user);
});

/* USERS ROUTES */

// GET list of users
router.get('/users', userController.user_list);

// GET individual user details
router.get('/users/:id', userController.user_detail);

// POST create new user
router.post('/users/signup', upload.single('image'), userController.user_signup);

// DELETE user
router.delete('/users/:id/delete', userController.user_delete);

// POST update new user details
router.post('/users/:id/update', userController.user_update);

// POST update active friend request (receive friend request)
router.post('/users/:id/receive_friend_request', userController.receive_friend_request)

// POST update users' friends list (accept friend request)
router.post('/users/:id/accept_friend_request', userController.accept_friend_request);

// POST login user
router.post('/users/:id/login', userController.user_login);

// POST Logout user
router.post('users/:id/logout', userController.user_logout);

/* POSTS ROUTES */

// GET List of Posts
router.get('/posts', postController.post_list);

// GET post details
router.get('/posts/:id', postController.get_post);

// POST create new post
router.post('/posts/create', postController.create_post);

// POST update a post
router.post('/posts/:id/update', postController.update_post);

// DELETE post
router.delete('/posts/:id/delete', postController.delete_post);

// POST Add like to post
router.post('/posts/:id/like', postController.like_post);

// POST Add comment to post
router.post('/posts/:id/comment', postController.comment_post);

/* COMMENTS ROUTES */

// GET List of Comments
router.get('/comments', commentController.comment_list);

// GET comment details
router.get('/comments/:id', commentController.get_comment);

// POST create new comment
router.post('/comments/create', commentController.create_comment);

// POST update a comment
router.post('/comments/:id/update', commentController.update_comment);

// DELETE comment
router.delete('/comments/:id/delete', commentController.delete_comment);

module.exports = router;
