import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: mongoose.SchemaTypes.String, required: true },
        qty: { type: mongoose.SchemaTypes.Number, required: true },
        image: { type: mongoose.SchemaTypes.String, required: true },
        price: { type: mongoose.SchemaTypes.Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      address: { type: mongoose.SchemaTypes.String, required: true },
      city: { type: mongoose.SchemaTypes.String, required: true },
      postalCode: { type: mongoose.SchemaTypes.String, required: true },
      country: { type: mongoose.SchemaTypes.String, required: true },
    },
    paymentMethod: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    paymentResult: {
      id: { type: mongoose.SchemaTypes.String },
      status: { type: mongoose.SchemaTypes.String },
      update_time: { type: mongoose.SchemaTypes.String },
      email_address: { type: mongoose.SchemaTypes.String },
    },
    itemsPrice: {
      type: mongoose.SchemaTypes.Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: mongoose.SchemaTypes.Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: mongoose.SchemaTypes.Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: mongoose.SchemaTypes.Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: mongoose.SchemaTypes.Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: mongoose.SchemaTypes.Date,
    },
    isDelivered: {
      type: mongoose.SchemaTypes.Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: mongoose.SchemaTypes.Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Order = mongoose.model("order", orderSchema);
export default Order;
