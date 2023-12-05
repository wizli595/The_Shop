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
// @route POST /api/products
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

// @desc Update Product by ID
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findByIdAndUpdate(
    id,
    {
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
    },
    { new: true }
  );
  if (!product) {
    res.status(404);
    throw new Error("Product not Found");
  }
  res.status(200).json(product);
});
export { getProductById, getProducts, createProduct, updateProduct };
