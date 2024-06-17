// TO DO: IMPLEMENT CONTROLLER FUNCTIONS

const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

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
    const user = await User.findById(req.params.id).exec();
    if (user === null) {
        const err = new Error("User not found");
        err.status = 404;
        return next(err); 
    }
    res.send(user);
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
            loggedIn: false,
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

//Upload a Photo
exports.profilePhoto_upload = (req, res, next) => {
    const file = req.file;
    res.send({
        message: "Uploaded",
        id: file.id,
        name: file.filename,
        contentType: file.contentType,
    });
};

// Delete a user
exports.user_delete = asyncHandler(async (req, res, next) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.send(deletedUser);
});

// Update a user's Details
exports.user_update = [
    body("first_name")
        .trim()
        .isLength({ min: 1})
        .escape()
        .withMessage("First name must be specified"),
    body("last_name")
        .trim()
        .isLength({ min: 1})
        .escape()
        .withMessage("Last name must be specified"),
    body("user_name")
        .trim()
        .isLength({ min: 1})
        .escape()
        .withMessage("Username must be specified"),
    body("email")
        .trim()
        .isLength({ min: 1})
        .escape()
        .withMessage("Email must be specified"),
    body("aboutMe")
        .trim()
        .isLength({ min: 1})
        .escape()
        .withMessage("About Me must be specified"),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            aboutMe: req.body.aboutMe,
            _id: req.params.id
        });

        if(!errors.isEmpty()) {
            res.send(errors);
            return;
        } else {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, user, {});
            res.send(updatedUser);
        }
    })
];

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
    let { userName, password } = req.body;
    const user = await User.findOne({ userName: userName }).exec();
    if (!user) {
        return res.status(400).json({ message: "Invalid username or password" });
    };

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(400).json({ message: "Invalid username or password" });
    };

    const secret = 'SECRET_KEY'; 
    const token = jwt.sign({ userName: user.userName }, secret, { expiresIn: "1hr" });
    
    return res.status(200).json({
        message: "Auth Passed",
        token
    });
});
