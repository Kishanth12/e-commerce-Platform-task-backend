import { body, param, query } from "express-validator";

//Validate product ID parameter
export const validateProductIdParam = [
  param("id").isMongoId().withMessage("Invalid product ID").bail(),
];

//Validate create product
export const validateCreateProduct = [
  body("name")
    .notEmpty()
    .withMessage("Product name is required")
    .bail()
    .isString()
    .withMessage("Product name must be a string")
    .bail()
    .trim(),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .bail()
    .isFloat({ min: 0.01 })
    .withMessage("Price must be greater than 0")
    .bail(),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .bail()
    .trim(),

  body("stockQuantity")
    .notEmpty()
    .withMessage("Stock quantity is required")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Stock quantity must be a non-negative integer")
    .bail(),

  body("category")
    .optional()
    .isString()
    .withMessage("Category must be a string")
    .bail()
    .trim(),
];

//Validate update product
export const validateUpdateProduct = [
  param("id").isMongoId().withMessage("Invalid product ID").bail(),

  body("name")
    .optional()
    .isString()
    .withMessage("Product name must be a string")
    .bail()
    .trim(),

  body("price")
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage("Price must be greater than 0")
    .bail(),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .bail()
    .trim(),

  body("stockQuantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock quantity must be a non-negative integer")
    .bail(),

  body("category")
    .optional()
    .isString()
    .withMessage("Category must be a string")
    .bail()
    .trim(),
];

//Validate get all products query parameters
export const validateGetAllProducts = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer")
    .bail(),

  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be positive")
    .bail(),

  query("sortBy")
    .optional()
    .isIn(["name", "price", "createdAt", "stockQuantity"])
    .withMessage(
      "Invalid sortBy field. Use: name, price, createdAt, or stockQuantity"
    ),

  query("sortOrder")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Sort order must be 'asc' or 'desc'")
    .bail(),

  query("category")
    .optional()
    .isString()
    .withMessage("Category must be a string")
    .bail()
    .trim(),

  query("minPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Minimum price must be a non-negative number")
    .bail(),

  query("maxPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Maximum price must be a non-negative number")
    .bail()
    .custom((value, { req }) => {
      if (
        req.query.minPrice &&
        parseFloat(value) < parseFloat(req.query.minPrice)
      ) {
        throw new Error(
          "Maximum price must be greater than or equal to minimum price"
        );
      }
      return true;
    }),
];
