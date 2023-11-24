import { Router } from "express";
import asyncHandler from "../middelware/asyncHandler.js";
import Product from "../models/productModel.js";
const route = new Router();
route.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find();
    // throw new Error("some Error");
    return res.send(products);
  })
);
route.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    console.log(product);
    if (product) return res.status(200).json(product);
    res.status(404);

    throw new Error("Resourse not found");
  })
);
export default route;
