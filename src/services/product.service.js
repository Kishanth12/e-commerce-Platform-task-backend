import Product from "../models/product.model.js";

// Get all Products
export const getAllProducts = async (options = {}) => {
  const {
    page = 1,
    limit = 5,
    sortBy = "createdAt",
    sortOrder = "desc",
    category,
    minPrice,
    maxPrice,
  } = options;

  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const sort = {};
  sort[sortBy] = sortOrder === "asc" ? 1 : -1;

  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.find(filter).sort(sort).skip(skip).limit(Number(limit)),
    Product.countDocuments(filter),
  ]);

  return {
    products,
    pagination: {
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
      limit: Number(limit),
    },
  };
};

//Get single product
export const getProductById = async (productId) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  return product;
};

// Create a new product
export const createProduct = async (productData) => {
  const { name, price, description, stockQuantity, category } = productData;

  const existingProduct = await Product.findOne({
    name: new RegExp(`^${name}$`, "i"),
  });
  if (existingProduct) {
    throw new Error("PRODUCT_ALREADY_EXISTS");
  }

  const product = await Product.create({
    name,
    price,
    description,
    stockQuantity,
    category,
  });

  return product;
};

// Update product by ID
export const updateProduct = async (productId, updateData) => {
  if (updateData.name) {
    const existingProduct = await Product.findOne({
      name: updateData.name,
      _id: { $ne: productId },
    });

    if (existingProduct) {
      throw new Error("PRODUCT_NAME_ALREADY_EXISTS");
    }
  }
  const product = await Product.findByIdAndUpdate(productId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  return product;
};

// Delete Product
export const deleteProduct = async (productId) => {
  const product = await Product.findByIdAndDelete(productId);

  if (!product) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  return product;
};
