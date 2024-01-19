import { Router } from "express";
import {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
  getCategories,
} from "../controllers/productController.js";
import { admin, protect } from "../middelware/authMiddleware.js";
import { checkObjectId } from "../middelware/checkObjectId.js";

const router = new Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/category").get(getCategories);

router.route("/:id/reviews").post(protect, checkObjectId, createProductReview);

router.route("/top").get(getTopProducts);

router
  .route("/:id")
  .get(checkObjectId, getProductById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);

export default router;
