import {
  createNewProduct,
  getAllProducts,
  getProductById,
} from "./productDataService.js";
//todo------------------ Create New Product --------------------------
const createProductService = async (product, employee_id) => {
  try {
    //! add employee_id to product data
    const productData = { ...product, employee_id: employee_id };
    const newProduct = await createNewProduct(productData);
    return newProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};
//todo------------------ Get All Products --------------------------
const getAllProductsService = async () => {
  try {
    const products = await getAllProducts();
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
};
//todo------------------ Get Product By Id --------------------------
const getProductByIdService = async (productId) => {
  try {
    const product = await getProductById(productId);
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { createProductService, getAllProductsService, getProductByIdService };
