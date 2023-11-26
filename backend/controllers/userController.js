import asyncHandler from "../middelware/asyncHandler.js";
import User from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js";
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
  generateToken(res, usr._id);
  res.json(usr.toJSON());
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
  if (!user) {
    res.status(400);
    throw new Error("Invalid user data");
  }
  generateToken(res, user._id);
  res.status(201).json(user.toJSON());
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
  res.send("get all users");
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
  res.send("get  users by id");
});

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update  user");
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
  logoutUser,
};
