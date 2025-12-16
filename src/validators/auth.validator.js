import { body, param } from "express-validator";

//Validate signup
export const validateSignup = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .trim(),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail()
    .bail()
    .trim(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isString()
    .withMessage("Password must be a string")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .bail(),
  body("role")
    .optional()
    .isIn(["customer", "admin"])
    .withMessage("Role must be either 'customer' or 'admin'")
    .bail(),
];

//Validate login
export const validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Please provide a valid email address")
    .bail()
    .normalizeEmail()
    .trim(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isString()
    .withMessage("Password must be a string")
    .bail(),
];
export const validateUpdateRole = [
  param("userId").isMongoId().withMessage("Invalid user ID"),

  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .bail()
    .isIn(["customer", "admin"])
    .withMessage("Role must be either 'customer' or 'admin'")
    .bail(),
];
