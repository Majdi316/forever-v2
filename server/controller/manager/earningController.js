import Order from "../../models/Order.js";

/**-------------------------------------------------
 * @desc    calculate monthly earnings by year
 * @route   /manager/earnings/monthly
 * @method  GET
 * @access  Private (Only Manager)
 --------------------------------------------------*/
export const getMonthlyEarnings = async (req, res) => {
  try {
    const registeredUser = req.user;
    //! only manager can view this data
    if (!registeredUser.isManager) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
    const { year } = req.query;

    const start = new Date(`${year}-01-01`);
    const end = new Date(`${year}-12-31`);

    const earnings = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: start,
            $lte: end,
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const result = Array(12).fill(0);
    earnings.forEach((item) => {
      result[item._id - 1] = item.total;
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**-------------------------------------------------
 * @desc    get order count by month
 * @route   /manager/earnings/monthly-orders
 * @method  GET
 * @access  Private (Only Manager)
 --------------------------------------------------*/
export const getMonthlyOrdersCount = async (req, res) => {
  try {
    const registeredUser = req.user;
    //! only manager can view this data
    if (!registeredUser.isManager) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
    const { year } = req.query;

    const start = new Date(`${year}-01-01`);
    const end = new Date(`${year}-12-31`);

    const orders = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalOrders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const result = Array(12).fill(0);
    orders.forEach((item) => {
      result[item._id - 1] = item.totalOrders;
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**-------------------------------------------------
 * @desc    get top 5 product sells
 * @route   /manager/earnings/top-products
 * @method  GET
 * @access  Private (Only Manager)
 --------------------------------------------------*/

export const getTopProducts = async (req, res) => {
  try {
    const registeredUser = req.user;
    //! only manager can view this data
    if (!registeredUser.isManager) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
    const { year, limit = 5 } = req.query;

    const start = new Date(`${year}-01-01`);
    const end = new Date(`${year}-12-31`);

    const products = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
        },
      },
      { $unwind: "$items" }, // Flatten the items array
      {
        $group: {
          _id: "$items.name", // Assuming each item has a 'name' field
          totalQuantity: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: parseInt(limit) },
    ]);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**-------------------------------------------------
 * @desc    get kpi
 * @route   /manager/earnings/kpi
 * @method  GET
 * @access  Private (Only Manager)
 --------------------------------------------------*/
export const getKPI = async (req, res) => {
  try {
    const registeredUser = req.user;
    //! only manager can view this data
    if (!registeredUser.isManager) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
    const { year } = req.query;

    const start = new Date(`${year}-01-01`);
    const end = new Date(`${year}-12-31`);

    const totalOrdersData = await Order.aggregate([
      { $match: { createdAt: { $gte: start, $lte: end } } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" },
          totalOrders: { $sum: 1 },
        },
      },
    ]);

    const topProductData = await Order.aggregate([
      { $match: { createdAt: { $gte: start, $lte: end } } },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.name",
          totalQuantity: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 1 },
    ]);

    const kpi = {
      totalRevenue: totalOrdersData[0]?.totalRevenue || 0,
      totalOrders: totalOrdersData[0]?.totalOrders || 0,
      topProduct: topProductData[0]?._id || "N/A",
      topProductQuantity: topProductData[0]?.totalQuantity || 0,
    };

    res.status(200).json(kpi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
