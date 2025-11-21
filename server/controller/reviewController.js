//TODO Import Models
import Product from "../models/Product.js";
import { Review } from "../models/Review.js";
import { User } from "../models/User.js";
//TODO Validation
import { validateCreateReview } from "../validation/service/reviewService.js";
/**-------------------------------------------------
 * @desc  Create New Review
 * @route  /reviews/:id
 * @method  POST
 * @access private (authenticated users)
 ---------------------------------------------------*/
//todo----------------- Create New Review ----------------------------
const createReviewController = async (req, res) => {
  const productId = req.params.id;
  const { rating, comment } = req.body;
  const userId = req.user._id;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    //! Check if user has already reviewed the product
    const existingReview = await Review.findOne({
      productId,
      userId,
    });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    //! Create review object
    const reviewData = {
      productId,
      userId,
      rating,
      comment,
    };
    //! validate product data
    const { error } = validateCreateReview(reviewData);
    if (error) {
      return res.status(400).json({
        success: false,
        message: `Validation failed: ${error.details[0].message}`,
      });
    }
    const newReview = new Review(reviewData);
    await newReview.save();
    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      review: newReview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};
/**-------------------------------------------------
 * @desc  get All Reviews for a Product
 * @route  /reviews/:id
 * @method  GET
 * @access public
 ---------------------------------------------------*/
const getAllReviewsForProductController = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const reviews = await Review.find({ productId });
    if (reviews.length !== 0) {
      let newReviews = reviews.map((review) => review.toObject());
      for (let i = 0; i < newReviews.length; i++) {
        //! fetch user data
        const user = await User.findById(newReviews[i].userId);
        newReviews[i].userName = user ? user.name : "Unknown User";
        newReviews[i].userEmail = user ? user.email : "Unknown Email";
        newReviews[i].userAvatar = user ? user?.image?.url : "unknown Avatar";
      }
      return res.status(200).json({
        success: true,
        reviews: newReviews,
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
/**-------------------------------------------------
 * @desc  edit review 
 * @route  /reviews/edit/:id
 * @method  POST
 * @access private (only user that created this review)
 ---------------------------------------------------*/
const editReviewController = async (req, res) => {
  const { id: reviewId } = req.params;
  const userId = req.user._id;
  const { rating, comment } = req.body;
  try {
    //! fetch review data
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }
    //! check if the logged user is created this review
    if (userId !== review.userId) {
      return res.status(404).json({
        success: false,
        message: "Only the user who created this review can update it.",
      });
    }
    //! Update fields if provided
    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;
    //! Save the updated review
    await review.save();
    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};
/**-------------------------------------------------
 * @desc  delete review 
 * @route  /reviews/delete/:id
 * @method  POST
 * @access private (only user that created this post and manager)
 ---------------------------------------------------*/
const deleteReviewController = async (req, res) => {
  const reviewId = req.params.id;
  const userId = req.user._id; 
  const user = req.user;

  try {
    //! Fetch Review Data 
    const review = await Review.findById(reviewId)

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found or you do not have permission to delete it.",
      });
    }

    //! Check that the logged-in user owns this review 
    //! manager or owns user can delete this review
    if (review.userId.toString() !== userId.toString() && !user.isManager) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You can only delete your own review.",
      });
    }

    //! Delete the review
    await review.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};
//TODO Export Controllers
export {
  createReviewController,
  getAllReviewsForProductController,
  editReviewController,
  deleteReviewController,
};
