import Product from "../models/Product.js";
import {
  createProductService,
  getAllProductsService,
  getProductByIdService,
} from "../services/products/productService.js";
import { validateCreateProduct } from "../validation/service/productService.js";

/**-------------------------------------------------
 * @desc  Create New Product
 * @route  /products
 * @method  POST
 * @access private (manager , Employee)
 ---------------------------------------------------*/
//todo----------------- Create New Product ----------------------------
const createProductController = async (req, res) => {
  const productData = req.body;
  const user = req.user;
  try {
    //! only manager and employee can create product
    if (!user.isManager && !user.isEmployee) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. Only managers and employees can create products.",
      });
    }
    //! validate product data
    const { error } = validateCreateProduct(productData);
    if (error) {
      return res.status(400).json({
        success: false,
        message: `Validation failed: ${error.details[0].message}`,
      });
    }
    const productToAdd = { ...productData, employee_id: user._id };
    const newProduct = new Product(productToAdd);
    await newProduct.save();
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};
/**-------------------------------------------------
 * @desc  Get All Products
 * @route  /products
 * @method  GET
 * @access public 
 ---------------------------------------------------*/
//todo----------------- Get All Products ----------------------------
const getAllProductsController = async (req, res) => {
  try {
    const products = await getAllProductsService();
    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};
/**-------------------------------------------------
 * @desc  Get Product By Id
 * @route  /products/:id
 * @method  GET
 * @access public 
 ---------------------------------------------------*/
//todo----------------- Get Product By Id ----------------------------
const getProductByIdController = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await getProductByIdService(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};
/**-------------------------------------------------
 * @desc  Toggle Like
 * @route  /products/like/:id
 * @method  PATCH
 * @access public 
 ---------------------------------------------------*/
//todo----------------- Toggle Like ----------------------------
const toggleLikeController = async (req, res) => {
  let currentProduct;
  const { id: productId } = req.params;
  const user = req.user;
  const loggedInUser = req.user._id;
  try {
    //! check if user is exist
    if (!user) {
      return res.status(403).json({
        success: false,
        message: `Only Logged in user can likes products`,
      });
    }
    //! Fetch Product Data
    currentProduct = await Product.findById(productId);
    //! check if product is exist
    if (!currentProduct) {
      return res.status(404).json({
        success: false,
        message: `Product Not Found`,
      });
    }
    //! check if user likes this Product or not
    const isProductAlreadyLiked = currentProduct.likes.find(
      (user) => user.toString() === loggedInUser
    );
    if (isProductAlreadyLiked) {
      currentProduct = await Product.findByIdAndUpdate(
        productId,
        {
          $pull: {
            //to remove element from the array in mongoose
            likes: loggedInUser,
          },
        },
        { new: true }
      );
    } else {
      currentProduct = await Product.findByIdAndUpdate(
        productId,
        {
          $push: {
            //to add element to the array in mongoose
            likes: loggedInUser,
          },
        },
        { new: true }
      );
    }
    return res.status(200).json({
      success: true,
      message: `Toggle Like Successfully`,
      product: currentProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};
/**-------------------------------------------------
 * @desc  Fetch My Favorite Products
 * @route  /products/my-favorite/:id
 * @method  GET
 * @access private (only registered user)
 ---------------------------------------------------*/
const myFavoriteProductsController = async (req, res) => {
  const { id: userId } = req.params;
  const loggedInUserId = req.user._id;

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    //! Only Registered User can see his favorite products
    if (userId !== loggedInUserId) {
      res.status(403).json({
        success: false,
        message: "Only registered user can view Favorite products",
      });
    }
    //! Fetch Liked Products
    const likedProducts = await Product.find({ likes: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    //! check if the user like any products
    if (likedProducts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found for this user",
      });
    }
    //! Total product count & total pages
    const totalProducts = await Product.countDocuments({ likes: userId });
    const totalPages = Math.ceil(totalProducts / limit);
    return res.status(200).json({
      success: true,
      message: "Liked products fetched successfully",
      count: totalProducts,
      products: likedProducts,
      page,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error :" + error.message,
    });
  }
};
export {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  toggleLikeController,
  myFavoriteProductsController,
};
