import express from "express";
import { login, signup, updateRole } from "../controller/auth.controller.js";
import { validateLogin, validateSignup } from "../validators/auth.validator.js";
import { validate } from "../middleware/validatorMiddleware.js";
import { validateUpdateRole } from "./../validators/auth.validator.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

//login
router.post("/login", validateLogin, validate, login);

//signup
router.post("/signup", validateSignup, validate, signup);

//update user role
router.patch(
  "/update-profile/:userId",
  protectRoute("admin"),
  validateUpdateRole,
  validate,
  updateRole
);

export default router;
