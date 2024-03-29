import asyncHandler from "../middelware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 4;

  const { pageNumber, keyword, category } = req.query;

  const page = Number(pageNumber) || 1;

  // Build the filter object
  const filter = {};
  if (keyword) {
    filter.name = { $regex: keyword, $options: "i" };
  }
  if (category) {
    filter.category = category;
  }

  const count = await Product.countDocuments(filter);

  const products = await Product.find(filter)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  return res.send({ products, page, pages: Math.ceil(count / pageSize) });
});
// @desc Get all categories
// @route GET /api/products/categories
// @access Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct("category");
  res.status(200).json(categories);
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
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
    onOrder,
  } = req.body;

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
      onOrder,
    },
    { new: true }
  );
  if (!product) {
    res.status(404);
    throw new Error("Product not Found");
  }
  res.status(200).json(product);
});

// @desc Delete Product by ID
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not Found");
  }
  res.status(200).json();
});

const createProductReview = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { rating, comment } = req.body;

  const product = await Product.findById(id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (e) => e.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Fetch Top Products
// @route GET /api/products/top
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ rating: -1 }).limit(4);
  return res.status(200).json(products);
});

export {
  getProductById,
  getCategories,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
};
