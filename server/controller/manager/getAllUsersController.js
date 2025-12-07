import Product from "../../models/Product.js";
import Order from "../../models/Order.js";
import { User } from "../../models/User.js";
import { Review } from "../../models/Review.js";
import Contact from "../../models/Contact.js";

export const getUsersWithStats = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page || 1));
    const limit = Math.max(1, Number(req.query.limit || 100));
    const skip = (page - 1) * limit;
    const search = (req.query.search || "").trim();

    // ✅ Search Filter
    const filter = search
      ? {
          $or: [
            { "name.first": { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { "address.city": { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const total = await User.countDocuments(filter);

    const users = await User.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ lastActivity: -1 })
      .lean();

    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const userId = user._id.toString();

        const [
          productsCount,
          reviewsCount,
          likesCount,
          ordersData,
          totalContacts,
          answeredContacts,
        ] = await Promise.all([
          Product.countDocuments({ employee_id: userId }),
          Review.countDocuments({ userId }),
          Product.countDocuments({ likes: userId }),
          Order.aggregate([
            { $match: { userId } },
            {
              $group: {
                _id: null,
                count: { $sum: 1 },
                totalAmount: { $sum: "$amount" },
              },
            },
          ]),
          Contact.countDocuments({ userId: user._id }),
          Contact.countDocuments({ userId: user._id, answer: { $ne: "" } }),
        ]);

        return {
          ...user,
          employeeProductsCount: productsCount,
          reviewsCount,
          likesCount,
          ordersCount: ordersData[0]?.count || 0,
          ordersTotalAmount: ordersData[0]?.totalAmount || 0,
          contacts: {
            total: totalContacts,
            answered: answeredContacts,
            unAnswered: totalContacts - answeredContacts,
          },
        };
      })
    );

    res.json({
      success: true,
      page,
      totalPages: Math.ceil(total / limit),
      total,
      users: usersWithStats,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
