import asyncHandler from "../middelware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc   Create new order
// @route  POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  return res.send("create order");
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
