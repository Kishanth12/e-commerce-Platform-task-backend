import {
  getAllProducts as getAllProductsService,
  getProductById as getProductByIdService,
  createProduct as createProductService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
} from "../services/product.service.js";

//Get all products with filters
export const getAllProducts = async (req, res) => {
  try {
    const options = {
      page: req.query.page,
      limit: req.query.limit,
      sortBy: req.query.sortBy,
      sortOrder: req.query.sortOrder,
      category: req.query.category,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
    };
    const result = await getAllProductsService(options);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("GetAllProducts Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get single product
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductByIdService(id);

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("GetProductById Error:", error.message);

    if (error.message === "PRODUCT_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//Create new product
export const createProduct = async (req, res) => {
  try {
    const product = await createProductService(req.body);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error("CreateProduct Error:", error.message);

    if (error.message === "PRODUCT_ALREADY_EXISTS") {
      return res.status(400).json({
        success: false,
        message: "Product already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await updateProductService(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error("UpdateProduct Error:", error.message);

    if (error.message === "PRODUCT_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    if (error.message === "PRODUCT_NAME_ALREADY_EXISTS") {
      return res.status(400).json({
        success: false,
        message: "Product with this name already exists",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProductService(id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("DeleteProduct Error:", error.message);

    if (error.message === "PRODUCT_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
