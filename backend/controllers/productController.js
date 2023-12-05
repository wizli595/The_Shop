import asyncHandler from "../middelware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  // throw new Error("some Error");
  return res.send(products);
});

// @desc Fetch product by ID
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) return res.status(200).json(product);
  res.status(404);
  throw new Error("Resourse not found");
});

// @desc Create a new Product
// @route GET /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = Product.create({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/image/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });
  if (product) return res.status(201).json(product);
  res.status(404);
  throw new Error("somthing went wrong");
});
export { getProductById, getProducts, createProduct };
