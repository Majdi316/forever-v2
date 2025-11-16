//TODO Schema
import {
  createReviewValidation,
} from "../schema/reviewSchema.js";

//TODO Functions
const validateCreateReview = (data) => {
  return createReviewValidation.validate(data);
};


//TODO Export
export { validateCreateReview };
