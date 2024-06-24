// TO DO: CREATE AUTHENTICATION ROUTE

const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

const multer = require('multer');
const upload = multer();

/* AUTHENTICATION ROUTE */

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

// POST update active friend request (send friend request)
router.post('/users/:id/request_friend', userController.user_request_friend)

// POST update users' friends list (accept friend request)
router.post('/users/:id/accept_friend_request', userController.user_accept_friend_request);

// POST login user
router.post('/users/:id/login', userController.user_login);

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

/* COMMENTS ROUTES */

// GET List of Comments
router.get('/comments', commentController.comment_list);

// GET comment details
router.get('/comments/:id', commentController.get_comment);

// POST create new post
router.post('/comments/create', commentController.create_comment);

// POST update a comment
router.post('/comments/:id/update', commentController.update_comment);

// DELETE comment
router.delete('/comments/:id/delete', commentController.delete_comment);


module.exports = router;
