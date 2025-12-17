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

    if (!registeredUser.isManager) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const [
      totalProducts,
      totalUsers,
      totalReviews,
      totalContact,
      totalOrders,
      totalEarningResult,
    ] = await Promise.all([
      Product.countDocuments(),
      User.countDocuments(),
      Review.countDocuments(),
      Contact.countDocuments(),
      Order.countDocuments(),

      // 💰 Total Earnings (ALL Orders)
      Order.aggregate([
        {
          $group: {
            _id: null,
            totalEarning: { $sum: "$amount" },
          },
        },
      ]),
    ]);

    const totalEarning =
      totalEarningResult.length > 0 ? totalEarningResult[0].totalEarning : 0;

    res.status(200).json({
      success: true,
      message: "Fetch Data Successfully",
      totalProducts,
      totalUsers,
      totalReviews,
      totalContact,
      totalOrders,
      totalEarning,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
};

export { getTotalDataController };
