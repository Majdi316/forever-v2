//TODO Models
import Product from "../models/Product.js";
import { Review } from "../models/Review.js";

/**-------------------------------------------------
 * @desc  Fetch My Products
 * @route  /employee/:id/products
 * @method  GET
 * @access private (only user that created this product)
 ---------------------------------------------------*/
const getProductsByEmployee = async (req, res) => {
  const { id } = req.params;

  try { 
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    //! Step 1: Get products
    const products = await Product.find({ employee_id: id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found for this employee",
      });
    }

    //! Step 2: Collect product IDs
    const productIds = products.map((p) => p._id.toString());

    //! Step 3: Fetch ALL reviews for these products in one query
    const reviews = await Review.find({
      productId: { $in: productIds },
    });

    //! Step 4: Group reviews -> count + rating sum
    const reviewStats = {}; // { productId: { count, totalRating } }

    reviews.forEach((r) => {
      if (!reviewStats[r.productId]) {
        reviewStats[r.productId] = {
          count: 0,
          totalRating: 0,
        };
      }

      reviewStats[r.productId].count++;
      reviewStats[r.productId].totalRating += r.rating;
    });

    //! Step 5: Merge stats into products
    const productsWithStats = products.map((product) => {
      const id = product._id.toString();
      const stats = reviewStats[id] || { count: 0, totalRating: 0 };

      const averageRating =
        stats.count > 0 ? stats.totalRating / stats.count : 0;

      return {
        ...product._doc,
        reviewCount: stats.count,
        averageRating: Number(averageRating.toFixed(1)),
      };
    });

    //! Step 6: Total product count
    const totalProducts = await Product.countDocuments({ employee_id: id });
    const totalPages = Math.ceil(totalProducts / limit);

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      page,
      totalPages,
      totalProducts,
      products: productsWithStats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error :" + error.message,
    });
  }
};

export { getProductsByEmployee };
