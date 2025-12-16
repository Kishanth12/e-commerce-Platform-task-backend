import {
  placeOrder as placeOrderService,
  getOrders as getOrdersService,
  getOrderById as getOrderByIdService,
  cancelOrder as cancelOrderService,
  updateOrderStatus as updateOrderStatusService,
} from "../services/order.service.js";

// Place a new order
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;

    const order = await placeOrderService(userId, items);

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    console.error("PlaceOrder Error:", error.message);

    if (error.message.startsWith("PRODUCT_NOT_FOUND")) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (error.message.startsWith("INSUFFICIENT_STOCK")) {
      const productName = error.message.split(":")[1];
      return res.status(400).json({
        success: false,
        message: `Insufficient stock for ${productName}`,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//get All orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await getOrdersService({
      userId: req.user._id,
      role: req.user.role,
    });

    return res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error("GetMyOrders Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.role === "admin" ? null : req.user.id;

    const order = await getOrderByIdService(id, userId);

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("GetOrderById Error:", error.message);

    if (error.message === "ORDER_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//Cancel Order
export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const order = await cancelOrderService(id, userId);

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: order,
    });
  } catch (error) {
    console.error("CancelOrder Error:", error.message);

    if (error.message === "ORDER_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (error.message === "ORDER_ALREADY_CANCELLED") {
      return res.status(400).json({
        success: false,
        message: "Order is already cancelled",
      });
    }

    if (error.message === "CANNOT_CANCEL_DELIVERED_ORDER") {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel a delivered order",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await updateOrderStatusService(id, status);

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    console.error("UpdateOrderStatus Error:", error.message);

    if (
      error.message === "ORDER_ALREADY_DELIVERED" ||
      error.message === "ORDER_ALREADY_CANCELLED"
    ) {
      return res.status(400).json({
        success: false,
        message: error.message.replaceAll("_", " "),
      });
    }

    if (error.message === "ORDER_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
