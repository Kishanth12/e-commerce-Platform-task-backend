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

/**
 * @openapi
 * /products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all products
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Products fetched successfully
 */
router.get(
  "/",
  protectRoute("admin", "customer"),
  validateGetAllProducts,
  validate,
  getAllProducts
);

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get product by ID
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
 *         description: Product fetched successfully
 *       404:
 *         description: Product not found
 */
router.get("/:id", protectRoute("admin", "customer"), validate, getProductById);

/**
 * @openapi
 * /products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Create a product (Admin only)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone
 *               price:
 *                 type: number
 *                 example: 5000
 *               category:
 *                 type: string
 *                 example: Mobile
 *               description:
 *                 type: string
 *                 example: 256GB
 *               stockQuantity:
 *                 type: number
 *                 example: 10
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.post(
  "/",
  protectRoute("admin"),
  validateCreateProduct,
  validate,
  createProduct
);

/**
 * @openapi
 * /products/{id}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Update product (Admin only)
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
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               stockQuantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
router.put(
  "/:id",
  protectRoute("admin"),
  validateUpdateProduct,
  validate,
  updateProduct
);

/**
 * @openapi
 * /products/{id}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete product (Admin only)
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
 *         description: Product deleted successfully
 */
router.delete("/:id", protectRoute("admin"), validate, deleteProduct);

export default router;
