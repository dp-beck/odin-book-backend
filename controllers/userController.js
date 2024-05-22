// TO DO: IMPLEMENT CONTROLLER FUNCTIONS

const User = require("../models/user");
const asyncHandler = require("express-async-handler");

// Return a list of all Users
exports.user_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: USER LIST");
});

// Return details for a specific user
exports.user_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: User Details: ${req.params.id}`);
});

// Create a new user
exports.user_signup = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: User Signup");
});

// Delete a user
exports.user_delete = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: User Delete: ${req.params.id}`);
});

// Update a user's Details
exports.user_update = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: User Details Update: ${req.params.id}`);
});

// Send a Friend Request
exports.user_request_friend = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Send a Friend Request from: ${req.params.id}`);
});

// Accept a Friend Request
exports.user_accept_friend_request = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Accept a Friend Request for: ${req.params.id}`);
});

// Log In a User
exports.user_login = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Log In User: ${req.params.id}`);
});
