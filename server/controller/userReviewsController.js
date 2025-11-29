import Product from "../models/Product.js";
import { Review } from "../models/Review.js";
import { User } from "../models/User.js";

/**-------------------------------------------------
 * @desc  get All Reviews for a Product
 * @route  /users/my-reviews/:id
 * @method  GET
 * @access private (only registered user and Manager)
 ---------------------------------------------------*/
const getMyReviewsController = async (req, res) => {
  const userId = req.params.id;
  const user = req.user;
  try {
    //! variables for pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    //!---manager and registered user can show user information
    if (!user.isManger && userId !== user?._id) {
      return res.status(403).json({
        success: false,
        message: "Only Manager or registered user can look at user information",
      });
    }

    //!Fetch User Details
    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "userDetails not found",
      });
    }

    //!Fetch review for this user
    const reviews = await Review.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    //! Total product count & total pages
    const totalProducts = await Review.countDocuments({ userId });
    const totalPages = Math.ceil(totalProducts / limit);
    if (reviews.length !== 0) {
      let newReviews = reviews.map((review) => review.toObject());
      for (let i = 0; i < newReviews.length; i++) {
        //! fetch product data
        const product = await Product.findById(newReviews[i].productId);
        newReviews[i].productName = product
          ? product.name
          : "Unknown Product Name";
        newReviews[i].productCategory = product
          ? product.category
          : "Unknown Product Category";
        newReviews[i].productSubCategory = product
          ? product.subCategory
          : "Unknown Product subCategory";
        newReviews[i].productPrice = product
          ? product.price
          : "Unknown Product Price";
        newReviews[i].productStatus = product
          ? product.status
          : "Unknown Product Status";
        newReviews[i].productImageUrl = product
          ? product.image[0].url
          : "Unknown Product Image Url";
        newReviews[i].productImageAlt = product
          ? product.image[0].alt
          : "Unknown Product Image Alt";
        newReviews[i].productId = product
          ? product._id
          : "Unknown Product ID";
      }

      return res.status(200).json({
        success: true,
        reviews: newReviews,
        page,
        totalPages,
        count: totalProducts,
      });
    }
    return res.status(200).json({
      success: true,
      message: "No reviews found for this product",
      reviews: [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};
export { getMyReviewsController };
