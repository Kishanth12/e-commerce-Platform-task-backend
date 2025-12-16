import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controller/product.controller.js";
import { validate } from "../middleware/validatorMiddleware.js";
import {
  validateCreateProduct,
  validateGetAllProducts,
  validateUpdateProduct,
} from "../validators/product.validator.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

//get PRoducts
router.get(
  "/",
  protectRoute("admin","customer"),
  validateGetAllProducts,
  validate,
  getAllProducts
);

//get single product
router.get("/:id", protectRoute("admin","customer"), validate, getProductById);

//add Products
router.post(
  "/",
  protectRoute("admin"),
  validateCreateProduct,
  validate,
  createProduct
);

//update Products
router.put(
  "/:id",
  protectRoute("admin"),
  validateUpdateProduct,
  validate,
  updateProduct
);

//delete product
router.delete("/:id", protectRoute("admin"), validate, deleteProduct);

export default router;
