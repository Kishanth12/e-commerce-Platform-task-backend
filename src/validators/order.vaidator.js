import { body, param } from "express-validator";

// Order status enum
const ORDER_STATUS = ["CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

//Validate place order
export const validatePlaceOrderRules = [
  body("items")
    .isArray({ min: 1 })
    .withMessage("Items must be an array with at least one product")
    .bail(),

  body("items.*.product")
    .notEmpty()
    .withMessage("Product ID is required")
    .bail()
    .isMongoId()
    .withMessage("Product ID must be a valid MongoDB ID")
    .bail(),

  body("items.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1")
    .bail(),
];

// Validate orderId parameter
export const validateOrderIdParam = [
  param("orderId").isMongoId().withMessage("Invalid order ID").bail(),
];

//Validate update order status
export const validateUpdateOrderStatus = [
  param("orderId").isMongoId().withMessage("Invalid order ID").bail(),

  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .bail()
    .isString()
    .withMessage("Status must be a string")
    .bail()
    .isIn(ORDER_STATUS)
    .withMessage(`Status must be one of: ${ORDER_STATUS.join(", ")}`)
    .bail(),
];

//Validate cancel order
export const validateCancelOrder = [
  param("orderId").isMongoId().withMessage("Invalid order ID").bail(),
];
