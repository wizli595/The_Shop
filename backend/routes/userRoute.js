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
  verifyEmail,
  logoutUser,
} from "../controllers/userController.js";
import { admin, protect } from "../middelware/authMiddleware.js";
// import cmi from "cmi-payment-nodejs";
const router = new Router();
const protectMiddleware = protect;
const adminMiddleware = admin;

router
  .route("/")
  .post(registerUser)
  .get(protectMiddleware, adminMiddleware, getUsers);

// login route (email,password)
router.post("/auth", authUser);

// logout destroy token && coockie
router.post("/logout", logoutUser);

// profile if GET get user profile
// if PUT update user profile
router
  .route("/profile")
  .get(protectMiddleware, getUserProfile)
  .put(protectMiddleware, updateUserProfile);

// route with id params
// if DELETE delete  user by ID
// if GET get  user by ID
// if PUT update user by ID
router
  .route("/:id")
  .delete(protectMiddleware, adminMiddleware, deleteUser)
  .get(protectMiddleware, adminMiddleware, getUserByID)
  .put(protectMiddleware, adminMiddleware, updateUser);

// Email verification route
router.route("/verify/:token").get(verifyEmail);
export default router;
