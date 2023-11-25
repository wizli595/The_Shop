import { Router } from "express";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  getUserByID,
  logoutUser,
} from "../controllers/userController.js";
const router = new Router();

// in main route if is it GET get all users (admin)
//  if is it POST register a user
router.route("/").post(registerUser).get(getUsers);

// login route (email,password)
router.post("/login", authUser);

// logout destroy token && coockie
router.post("/logout", logoutUser);

// profile if GET get user profile
// if PUT update user profile
router.route("/profile").get(getUserProfile).put(updateUserProfile);

// route with id params
// if DELETE delete  user by ID
// if GET get  user by ID
// if PUT update user by ID
router.route("/:id").delete(deleteUser).get(getUserByID).put(updateUser);

export default router;
