import { Router } from "express";
import asyncHandler from "../middelware/asyncHandler.js";
import Product from "../models/productModel.js";
import {
  getProductById,
  getProducts,
} from "../controllers/productController.js";
const router = new Router();
router.route("/").get(getProducts);
router.route("/:id").get(getProductById);
export default router;
