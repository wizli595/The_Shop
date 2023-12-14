import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/UserModel.js";
// Any user must be authenticate
const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});
// User must be an admin
const admin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
  next();
};
export { admin, protect };
