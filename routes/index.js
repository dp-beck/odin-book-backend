const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

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
router.post('/users/:id/update', userController.user_update);

// POST update active friend request (send friend request)
router.post('/users/:id/request_friend', userController.user_request_friend)

// POST update users' friends list (accept friend request)
router.post('/users/:id/accept_friend_request', userController.user_accept_friend_request);

// POST login user
router.post('/users/:id/login', userController.user_login);

/* POSTS ROUTES */

// GET post text
// GET comments for a post
// POST create new post
// POST update a post
// DELETE post

/* COMMENTS ROUTES */

// GET comment text
// POST create new comment
// POST update a comment
// DELETE a comment

module.exports = router;
