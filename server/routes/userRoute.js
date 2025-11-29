//TODO Libraries
import express from "express";
//TODO Import Function
import {
  getUserByIdController,
  getUserDataController,
} from "../controller/userController.js";
import { verifyAuthToken } from "../auth/verifyAuthToken.js";
import { updateUserActivity } from "../middleware/updateActivity.js";
import { getMyReviewsController } from "../controller/userReviewsController.js";

const usersAuthRouter = express.Router();
//TODO-------------------- GET ----------------------------
usersAuthRouter.get(
  "/profile/:id",
  verifyAuthToken,
  updateUserActivity,
  getUserDataController
);
usersAuthRouter.get(
  "/my-reviews/:id/reviews",
  verifyAuthToken,
  updateUserActivity,
  getMyReviewsController
);
usersAuthRouter.get(
  "/:id",
  verifyAuthToken,
  updateUserActivity,
  getUserByIdController
);

export default usersAuthRouter;
