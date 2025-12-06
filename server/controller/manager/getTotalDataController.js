import Contact from "../../models/Contact.js";
import Order from "../../models/Order.js";
import Product from "../../models/Product.js";
import { Review } from "../../models/Review.js";
import { User } from "../../models/User.js";
/**-------------------------------------------------
 * @desc    Get Total Data
 * @route   /manager/total-data
 * @method  GET
 * @access  Private (Only Manager)
 --------------------------------------------------*/
const getTotalDataController = async (req, res) => {
  try {
    const registeredUser = req.user;
    //! only manager can view this data
    if (!registeredUser.isManager) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalReviews = await Review.countDocuments();
    const totalContact = await Contact.countDocuments();
    const totalOrders = await Order.countDocuments();

    res.status(200).json({
      success: true,
      message: "Fetch Data Successfully",
      totalProducts,
      totalUsers,
      totalReviews,
      totalContact,
      totalOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error" + error.message,
    });
  }
};

export { getTotalDataController };
