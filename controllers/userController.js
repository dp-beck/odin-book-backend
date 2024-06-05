// TO DO: IMPLEMENT CONTROLLER FUNCTIONS

const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

// Return a list of all Users
exports.user_list = asyncHandler(async (req, res, next) => {
    const allUsers = await User.find({})
        .sort({ userName: 1 })
        .populate("posts")
        .populate("friends")
        .populate("friendRequests")
        .exec();
    res.send(allUsers);
});

// Return details for a specific user
exports.user_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: User Details: ${req.params.id}`);
});

//TO DO: INTEGRATE PROFILE PHOTO
// Create a new user
exports.user_signup = [
    body("firstName")
        .trim()
        .isLength({ min: 1})
        .escape()
        .withMessage("First name must be specified"),
    body("lastName")
        .trim()
        .isLength({ min: 1})
        .escape()
        .withMessage("Last name must be specified"),
    body("userName")
        .trim()
        .isLength({ min: 1})
        .escape()
        .withMessage("Username must be specified"),
    body("email")
        .trim()
        .isLength({ min: 1})
        .escape()
        .withMessage("Email must be specified"),
    body("password")
        .trim()
        .isLength({ min: 8 })
        .escape()
        .withMessage("Password must be atleast 8 characters"),
    body("aboutMe")
        .trim()
        .isLength({ min: 1})
        .escape()
        .withMessage("About Me must be specified"),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            aboutMe: req.body.aboutMe,
            email: req.body.email,
            password: hashedPassword,
        });

        if(!errors.isEmpty()) {
            res.send(errors);
            return;
        } else {
            await user.save();
            res.send(user);
        }
    })
];

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
