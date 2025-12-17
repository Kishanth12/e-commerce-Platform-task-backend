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

/**
 * @openapi
 * /orders:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Place a new order (Customer only)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: 64f12abc123
 *                     quantity:
 *                       type: number
 *                       example: 2
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", protectRoute("customer"), validate, placeOrder);

/**
 * @openapi
 * /orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get orders of logged-in user (Admin & Customer)
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", protectRoute("admin", "customer"), getUserOrders);

/**
 * @openapi
 * /orders/{id}:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get order by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order fetched successfully
 *       404:
 *         description: Order not found
 */
router.get("/:id", protectRoute("admin", "customer"), getOrderById);

/**
 * @openapi
 * /orders/cancel/{id}:
 *   put:
 *     tags:
 *       - Orders
 *     summary: Cancel an order (Customer only)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *       403:
 *         description: Forbidden
 */
router.put("/cancel/:id", protectRoute("customer"), cancelOrder);

/**
 * @openapi
 * /orders/status/{id}:
 *   patch:
 *     tags:
 *       - Orders
 *     summary: Update order status (Admin only)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: SHIPPED || DELIVERED
 *     responses:
 *       200:
 *         description: Order status updated
 *       403:
 *         description: Forbidden
 */
router.patch("/status/:id", protectRoute("admin"), updateOrderStatus);

export default router;
