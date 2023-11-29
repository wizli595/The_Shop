import asyncHandler from "../middelware/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import { calcPrices } from "../utils/calcPrices.js";

// @desc   Create new order
// @route  POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items ");
  }

  const itemsFromDB = await Product.find({
    _id: { $in: orderItems.map((e) => e._id) },
  });

  const dbOrderItems = orderItems.map((item) => {
    const matchingFromDB = itemsFromDB.find(
      (itemDB) => itemDB._id.toString() === item._id
    );
    return {
      ...item,
      product: item._id,
      price: matchingFromDB.price,
      _id: undefined,
    };
  });

  // calc price
  const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    calcPrices(dbOrderItems);

  const order = await Order.create({
    orderItems: dbOrderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });
  res.status(201).json(order);
});

// @desc   Get order by ID
// @route  GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  return res.send("get order by id");
});

// @desc   Update order to paid
// @route  GET /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  return res.send("update order to paid");
});

// @desc   Update order to delivered
// @route  GET /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  return res.send("update order to deliverd");
});

// @desc   Get logged in user orders
// @route  GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  return res.send("Get logged in user orders");
});

// @desc   Get all orders
// @route  GET /api/orders/:id/deliver
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  return res.send("get all orders");
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
