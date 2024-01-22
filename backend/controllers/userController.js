import asyncHandler from "../middelware/asyncHandler.js";
import User from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js";
import { sendVerificationEmail } from "../utils/emailFunctions.js";
import passport from "passport";

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const usr = await User.findOne({ email });
  if (!usr || !(await usr.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalide email or password");
  }
  if (usr.isVerified) {
    generateToken(res, usr._id);
    return res.status(201).json(usr.toJSON());
  } else {
    res.status(401);
    throw new Error("Email not verified");
  }
});

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    sendVerificationEmail(user.email, user.verificationToken);

    // Commenting out
    // generateToken(res, user._id);
    res.status(201).json({
      message:
        "User registered successfully. Please check your email for verification.",
      verificationToken: user.verificationToken,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Logout user / clear cookie
// @route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    message: "logged out successfully",
  });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const { _id: ID } = req.user._id;
  const user = await User.findById(ID);
  if (!user) {
    res.status(400);
    throw new Error("User not Found");
  }
  res.status(200).json(user.toJSON());
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { _id: ID } = req.user._id;
  const { name, email, password } = req.body;
  const user = await User.findByIdAndUpdate(
    ID,
    { name, email, password },
    { new: true }
  );
  if (!user) {
    res.status(400);
    throw new Error("User not Found");
  }
  res.status(200).json(user.toJSON());
});

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (!users) {
    res.status(404);
    return new Error("No User founds");
  }
  res.status(200).json(users);
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user && !user.isAdmin) {
    res.status(404);
    return new Error("can't delete user");
  }
  res.status(200).json(user);
});

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    return new Error("No User founds");
  }
  res.status(200).json(user);
});

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, password, isAdmin } = req.body;
  const user = await User.findByIdAndUpdate(
    id,
    { name, email, password, isAdmin },
    { new: true }
  );
  if (!user && !user.isAdmin) {
    res.status(404);
    return new Error("User cannot be updated");
  }
  res.status(200).json(user);
});

// @desc Verify user email
// @route GET /api/users/verify/:token
// @access Public
const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  console.log("Verification Token:", token);

  const user = await User.findOne({ verificationToken: token });
  if (!user) {
    console.error("Invalid verification token");
    res.status(400).json({ error: "Invalid verification token" });
    return;
  }

  user.isVerified = true;
  user.verificationToken = undefined;

  generateToken(res, user._id);

  try {
    await user.save();
    console.log("Email verification successful for user:", user._id);
    res
      .status(200)
      .json({ message: "Email verification successful " + user.name });
  } catch (error) {
    console.error("Error saving user after email verification:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// @desc Auth user using Facebook & get token
// @route POST /api/users/auth/facebook
// @access Public
const authFacebookUser = passport.authenticate("facebook", {
  scope: ["email"],
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
  verifyEmail,
  logoutUser,
  authFacebookUser,
};
