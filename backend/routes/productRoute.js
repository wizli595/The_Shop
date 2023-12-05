import { Router } from "express";
import asyncHandler from "../middelware/asyncHandler.js";
import Product from "../models/productModel.js";
import {
  getProductById,
  getProducts,
  createProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../middelware/authMiddleware.js";
const router = new Router();
router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id").get(getProductById);
export default router;
