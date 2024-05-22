// TO DO: CREATE AUTHENTICATION ROUTE

const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

/* AUTHENTICATION ROUTE */

/* USERS ROUTES */

// GET list of users
router.get('/users', userController.user_list);

// GET individual user details
router.get('/users/:id(\\d+)', userController.user_detail);

// POST create new user
router.post('/users/signup', userController.user_signup);

// DELETE user
router.delete('/users/delete', userController.user_delete);

// POST update new user details
router.post('/users/:id(\\d+)/update', userController.user_update);

// POST update active friend request (send friend request)
router.post('/users/:id(\\d+)/request_friend', userController.user_request_friend)

// POST update users' friends list (accept friend request)
router.post('/users/:id(\\d+)/accept_friend_request', userController.user_accept_friend_request);

// POST login user
router.post('/users/:id(\\d+)/login', userController.user_login);

/* POSTS ROUTES */

// GET List of Posts
router.get('/posts', postController.post_list);

// GET post details
router.get('/posts/:id(\\d+)', postController.get_post);

// POST create new post
router.post('/posts/create', postController.create_post);

// POST update a post
router.post('/posts/:id(\\d+)/update', postController.update_post);

// DELETE post
router.delete('/posts/:id(\\d+)/delete', postController.delete_post);

/* COMMENTS ROUTES */

// GET List of Comments
router.get('/comments', commentController.comment_list);

// GET comment details
router.get('/comments/:id(\\d+)', commentController.get_comment);

// POST create new post
router.post('/comments/create', commentController.create_comment);

// POST update a comment
router.post('/comments/:id(\\d+)/update', commentController.update_comment);

// DELETE comment
router.delete('/comments/:id(\\d+)/delete', commentController.delete_comment);


module.exports = router;
