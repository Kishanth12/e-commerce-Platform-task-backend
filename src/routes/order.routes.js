import express from "express";
import {
  cancelOrder,
  getOrderById,
  getUserOrders,
  placeOrder,
  updateOrderStatus,
} from "./../controller/order.controller.js";
import { validate } from "./../middleware/validatorMiddleware.js";
import { protectRoute } from "./../middleware/auth.middleware.js";

const router = express.Router();

//place Order
router.post("/", protectRoute("customer"), validate, placeOrder);

//get All Orders BAse On Login(Admin,Customer)
router.get("/", protectRoute("admin","customer"), getUserOrders);

//get Order by id
router.get("/:id", protectRoute("admin", "customer"), getOrderById);

//cancel order(Customer only)
router.put("/cancel/:id", protectRoute("customer"), cancelOrder);

//update order status(Admin only)
router.patch("/status/:id", protectRoute("admin"), updateOrderStatus);

export default router;
