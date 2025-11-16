import Product from "../../models/Product.js";

//todo------------------ Create New Product --------------------------
const createNewProduct = async (product) => {
  try {
    const productForDb = new Product(product);
    await productForDb.save();
    return productForDb;
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.email) {
      throw new Error("Email already exists");
    }
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      throw new Error(`Validation failed: ${messages.join(", ")}`);
    }
    if (
      error.name === "MongoNetworkError" ||
      error.message.includes("ECONNREFUSED")
    ) {
      throw new Error("Database connection error");
    }
    throw new Error("MongoDb - Error in creating new product");
  }
};
//todo------------------ Get All Products --------------------------
const getAllProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw new Error("MongoDb - Error in fetching all products");
  }
};
//todo------------------ Get Product By Id --------------------------
const getProductById = async (productId) => {
  try {
    const product = await Product.findById(productId);
    return product;
  } catch (error) {
    throw new Error("MongoDb - Error in fetching product by id");
  }
};

export { createNewProduct, getAllProducts, getProductById };
