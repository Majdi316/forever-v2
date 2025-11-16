//TODO Libraries
import express from "express";
//TODO Controllers
import {
  createReviewController,
  deleteReviewController,
  editReviewController,
  getAllReviewsForProductController,
} from "../controller/reviewController.js";
//TODO Middlewares
import { verifyAuthToken } from "../auth/verifyAuthToken.js";
import { updateUserActivity } from "../middleware/updateActivity.js";

// Create the router
const reviewRouter = express.Router();

//Endpoints
//todo --------------------- POST ----------------------------
reviewRouter.post(
  "/:id",
  verifyAuthToken,
  updateUserActivity,
  createReviewController
);
reviewRouter.post(
  "/edit/:id",
  verifyAuthToken,
  updateUserActivity,
  editReviewController
);
reviewRouter.post(
  "/delete/:id",
  verifyAuthToken,
  updateUserActivity,
  deleteReviewController
);
//todo --------------------- GET ----------------------------
reviewRouter.get("/:id", getAllReviewsForProductController);

export default reviewRouter;
