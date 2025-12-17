import express from "express";
import { login, signup, updateRole } from "../controller/auth.controller.js";
import {
  validateLogin,
  validateSignup,
  validateUpdateRole,
} from "../validators/auth.validator.js";
import { validate } from "../middleware/validatorMiddleware.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@gmail.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", validateLogin, validate, login);

/**
 * @openapi
 * /auth/signup:
 *   post:
 *     tags:
 *       - Auth
 *     summary: User registration
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Kishanth
 *               email:
 *                 type: string
 *                 example: kishan@gmail.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
router.post("/signup", validateSignup, validate, signup);

/**
 * @openapi
 * /auth/update-role/{userId}:
 *   patch:
 *     tags:
 *       - Auth
 *     summary: Update user role (Admin only)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
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
 *               role:
 *                 type: string
 *                 example: admin,customer
 *     responses:
 *       200:
 *         description: User Role updated successfully
 *       401:
 *         description: Unauthorized
 */
router.patch(
  "/update-role/:userId",
  protectRoute("admin"),
  validateUpdateRole,
  validate,
  updateRole
);

export default router;
