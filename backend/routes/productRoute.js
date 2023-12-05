import { Router } from "express";
import {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../middelware/authMiddleware.js";
const router = new Router();
router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id").get(getProductById).put(protect, admin, updateProduct);
export default router;
