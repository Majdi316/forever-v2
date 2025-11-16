import { User } from "../models/User.js";

/**-------------------------------------------------
 * @desc  Add To Cart
 * @route  /cart/add
 * @method  POST
 * @access private (Only Users)
 ---------------------------------------------------*/
const addToCartController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, size } = req.body;
    //! Validate input
    if (!productId || !size) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID and size are required." });
    }
    //! Fetch user data
    const userData = await User.findById(userId);
    //! Check if user exists
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    //! get cart data
    let cartData = await userData.cartData;
    //! Update cart data
    if (cartData[productId]) {
      if (cartData[productId][size]) {
        cartData[productId][size] += 1;
      } else {
        cartData[productId][size] = 1;
      }
    } else {
      cartData[productId] = {};
      cartData[productId][size] = 1;
    }

    await User.findByIdAndUpdate(userId, { cartData });
    res.status(201).json({ success: true, message: "Added To Cart" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
/**-------------------------------------------------
 * @desc  Update Cart Quantity
 * @route  /cart/update
 * @method  POST
 * @access private (Only Users)
 ---------------------------------------------------*/
const updateQuantityController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { itemId, size, quantity } = req.body;
    //! Validate input
    if (!itemId || !size || quantity == null) {
      return res.status(400).json({
        success: false,
        message: "Item ID, size, and quantity are required.",
      });
    }
    //! Fetch user data
    const userData = await User.findById(userId);
    //! Check if user exists
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    let cartData = await userData.cartData;
    cartData[itemId][size] = quantity;
    await User.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ success: true, message: "Cart Updated" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
/**-------------------------------------------------
 * @desc  Get User Cart
 * @route  /cart/get
 * @method  POST
 * @access private (Only Users)
 ---------------------------------------------------*/
const getUserCartController = async (req, res) => {
  const userId = req.user._id;
  try {
    //! Fetch user data
    const userData = await User.findById(userId);
    //! Check if user exists
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
//TODO Export
export { addToCartController, updateQuantityController, getUserCartController };
