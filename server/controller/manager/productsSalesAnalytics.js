import Product from "../../models/Product.js";
import Order from "../../models/Order.js";
import { User } from "../../models/User.js";

export const getProductsSalesAnalytics = async (req, res) => {
  try {
    const manager = req.user;
    if (!manager.isManager) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const { page = 1, limit = 10, category, employeeId, search } = req.query;

    const skip = (page - 1) * limit;

    // 🔍 Filters
    const filter = {};
    if (category) filter.category = category;
    if (employeeId) filter.employee_id = employeeId;
    if (search) filter.name = { $regex: search, $options: "i" };

    const totalProducts = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .lean();
    const orders = await Order.find().lean();

    const data = await Promise.all(
      products.map(async (product) => {
        const employee = product.employee_id
          ? await User.findById(product.employee_id)
              .select("name email image")
              .lean()
          : null;

        let soldCount = 0;
        let earnings = 0;

        orders.forEach((order) => {
          order.items.forEach((item) => {
            if (item._id?.toString() === product._id.toString()) {
              soldCount += item.quantity;
              earnings += item.quantity * item.price;
            }
          });
        });

        return {
          ...product,
          employee,
          soldCount,
          earnings,
        };
      })
    );
    res.status(200).json({
      success: true,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
      },
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const deleteSoldOutProduct = async (req, res) => {
  try {
    if (!req.user.isManager) {
      return res.status(403).json({ message: "Access denied" });
    }

    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.status !== "Sold-Out") {
      return res
        .status(400)
        .json({ message: "Only sold-out products can be deleted" });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Sold-out product deleted",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getEmployees = async (req, res) => {
  if (!req.user.isManager) {
    return res.status(403).json({ message: "Access denied" });
  }

  const employees = await User.find({ isEmployee: true })
    .select("name email image")
    .lean();

  res.status(200).json({
    success: true,
    data: employees,
  });
};
