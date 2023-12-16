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
    throw new Error("No order items");
  } else {
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((e) => e._id) },
    });

    const dbOrderItems = orderItems.map((item) => {
      const matchingFromDB = itemsFromDB.find(
        (itemDB) => itemDB._id.toString() === item._id
      );
      const quantityOrdered = item.qty;
      const newCountInStock = matchingFromDB.countInStock - quantityOrdered;

      // Update the countInStock of the product in the database
      Product.findByIdAndUpdate(
        item._id,
        { countInStock: newCountInStock },
        { new: true }
      ).exec();
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
  }
});

// @desc   Get order by ID
// @route  GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const { id: orderID } = req.params;
  const order = await Order.findById(orderID).populate("user", "name email");
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc   Update order to paid
// @route  PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const { id: orderID } = req.params;
  const order = await Order.findByIdAndUpdate(
    orderID,
    {
      isPaid: true,
      paidAt: Date.now(),
      paymentResult: {
        id: req.body.id || req.user._id,
        status: req.body?.status || "",
        update_time: req.body?.update_time || Date.now(),
        email_address: req.body?.payer?.email_address || req.user.email,
      },
    },
    { new: true }
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not Found");
  }
});

// @desc   Update order to delivered
// @route  PUT /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findByIdAndUpdate(id, {
    isDelivered: true,
    deliveredAt: Date.now(),
  });
  if (!order) {
    res.status(404);
    throw new Error("faild too bad");
  }
  res.status(200).json(order);
});

// @desc   Get logged in user orders
// @route  GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc   Get all orders
// @route  GET /api/orders/:id/deliver
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user", "id name");
  res.status(200).json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
