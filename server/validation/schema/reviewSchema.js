import Joi from "joi";

const reviewSchema = {
  userId: Joi.string().required(),
  productId: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().min(5).max(500).required(),
};
// Create and Update Validation Schemas
export const createReviewValidation = Joi.object(reviewSchema);


