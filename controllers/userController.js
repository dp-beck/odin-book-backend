
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// Cloudinary is used to store profile photos on the cloud.
const cloudinary = require('cloudinary').v2;

// Streamifier is used to read the contents of the uploaded profile photo directly from buffer and send to Cloudinary.
const streamifier = require('streamifier');

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

// Create a new user
exports.user_signup = [
    // Validation of form is handled here.
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

    /* This function first uploads the attached profile photo to cloudinary, then creates and saves a new user into the database. 
        The user entry in the database includes a reference to the Cloudinary url where the profile photo resides.
    */
    asyncHandler(async (req, res, next) => {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        let uploadResult = await streamUpload(req);
        console.log(uploadResult);

        const errors = validationResult(req);

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            profilePhotoUrl: uploadResult.url,
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

// Delete a user
exports.user_delete = asyncHandler(async (req, res, next) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.send(deletedUser);
});

// Update a user's Details
exports.user_update = [
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

// Receive a Friend Request
exports.receive_friend_request = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (user.friendRequests.includes(req.body.id)) {
        res.send("You have already requested to be this user's friend.");
    } else if (user.friends.includes(req.body.id)) {
        res.send("You are already friends with this user.")
    } else {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            {$push: {friendRequests: req.body.id}},
            {}
        ); 
        res.send(updatedUser);
    }
});

// Accept a Friend Request
exports.accept_friend_request = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (user.friendRequests.includes(req.body.id)) {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            {$push: {friends: req.body.id},
             $pull: {friendRequests: req.body.id}},
            {}
        ); 
        res.send(updatedUser);
    } else {
        res.send("This user has not yet sent you a friend request.");
    }
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
