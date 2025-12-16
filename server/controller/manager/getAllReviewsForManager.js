import { Review } from "../../models/Review.js";

export const getAllReviewsForManager = async (req, res) => {
  try {
    const manager = req.user;
    if (!manager.isManager) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const { rating, user } = req.query;

    const pipeline = [
      {
        $addFields: {
          userObjectId: { $toObjectId: "$userId" },
          productObjectId: { $toObjectId: "$productId" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userObjectId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "products",
          localField: "productObjectId",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: { path: "$product", preserveNullAndEmptyArrays: true } },
    ];

    // Rating filter
    if (rating) {
      pipeline.push({ $match: { rating: Number(rating) } });
    }

    // User filter
    if (user) {
      pipeline.push({
        $match: {
          $or: [
            { "user.email": { $regex: user, $options: "i" } },
            { "user.name.first": { $regex: user, $options: "i" } },
            { "user.name.last": { $regex: user, $options: "i" } },
          ],
        },
      });
    }
    // Duplicate pipeline for counting total
    const countPipeline = [...pipeline, { $count: "total" }];
    const countResult = await Review.aggregate(countPipeline);
    const total = countResult[0]?.total || 0;
    const totalPages = Math.ceil(total / limit);

    // Add pagination
    pipeline.push(
      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
      {
        $project: {
          rating: 1,
          comment: 1,
          createdAt: 1,
          user: { name: 1, email: 1, image: 1, isVerified: 1, isBlocked: 1 },
          product: {
            name: 1,
            price: 1,
            category: 1,
            image: 1,
            isAvailable: 1,
            status: 1,
          },
        },
      }
    );

    const reviews = await Review.aggregate(pipeline);

    res.status(200).json({
      success: true,
      reviews,
      page,
      totalPages,
      total,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch reviews" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const manager = req.user;

    // Only manager can delete
    if (!manager.isManager) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Managers only.",
      });
    }

    const { reviewId } = req.params;

    const deleted = await Review.findByIdAndDelete(reviewId);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Delete review error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete review",
    });
  }
};