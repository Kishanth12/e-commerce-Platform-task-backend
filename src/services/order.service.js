import Order from "../models/Order.model.js";
import Product from "../models/product.model.js";
import mongoose from "mongoose";

// Place a new order
export const placeOrder = async (userId, items) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId).session(session);

      if (!product) {
        throw new Error(`PRODUCT_NOT_FOUND:${item.productId}`);
      }

      if (product.stockQuantity < item.quantity) {
        throw new Error(`INSUFFICIENT_STOCK:${product.name}`);
      }

      product.stockQuantity -= item.quantity;
      await product.save({ session });

      totalAmount += product.price * item.quantity;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const order = await Order.create(
      [{ user: userId, items: orderItems, totalAmount, status: "CONFIRMED" }],
      { session }
    );

    await session.commitTransaction();
    await order[0].populate("items.product");

    return order[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

//get All orders
export const getOrders = async ({ userId = null, role }) => {
  const query = {};

  if (role === "customer") {
    query.user = userId;
  }

  const orders = await Order.find(query)
    .populate("user", "email role")
    .populate("items.product")
    .sort({ createdAt: -1 });

  return orders;
};

// Get order by ID
export const getOrderById = async (orderId, userId = null) => {
  const query = { _id: orderId };

  if (userId) {
    query.user = userId;
  }

  const order = await Order.findOne(query)
    .populate("user", "email role")
    .populate("items.product");

  if (!order) {
    throw new Error("ORDER_NOT_FOUND");
  }

  return order;
};

//Cancel Order
export const cancelOrder = async (orderId, userId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = await Order.findOne({
      _id: orderId,
      user: userId,
    }).session(session);

    if (!order) {
      throw new Error("ORDER_NOT_FOUND");
    }

    if (order.status === "cancelled") {
      throw new Error("ORDER_ALREADY_CANCELLED");
    }

    if (order.status === "delivered") {
      throw new Error("CANNOT_CANCEL_DELIVERED_ORDER");
    }
    for (const item of order.items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stockQuantity: item.quantity } },
        { session }
      );
    }

    order.status = "CANCELLED";
    await order.save({ session });

    await session.commitTransaction();
    return order;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

//Update Order Status
export const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error("ORDER_NOT_FOUND");
  }

  if (order.status === "DELIVERED") {
    throw new Error("ORDER_ALREADY_DELIVERED");
  }

  if (order.status === "CANCELLED") {
    throw new Error("ORDER_ALREADY_CANCELLED");
  }

  order.status = status;
  await order.save();

  return order;
};
