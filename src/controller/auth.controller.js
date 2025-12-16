import {
  signup as registerUserService,
  loginUser as loginUserService,
  updateRole as updateUserRole,
} from "../services/auth.service.js";

// Register a new user
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const result = await registerUserService({ name, email, password });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      ...result,
    });
  } catch (error) {
    console.error("Signup Error:", error.message);

    if (error.message === "USER_ALREADY_EXISTS") {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await loginUserService(email, password);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      ...result,
    });
  } catch (error) {
    console.error("Login Error:", error.message);

    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//update user role
export const updateRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const user = await updateUserRole(userId, role);

    return res.status(200).json({
      success: true,
      message: "User role updated successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("UpdateRole Error:", error.message);

    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
