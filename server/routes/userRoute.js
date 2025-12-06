//TODO Libraries
import express from "express";
//TODO Import Function
import {
  getUserByIdController,
  getUserDataController,
  toggleSubscribeController,
  updateUserController,
} from "../controller/userController.js";
import { verifyAuthToken } from "../auth/verifyAuthToken.js";
import { updateUserActivity } from "../middleware/updateActivity.js";
import { getMyReviewsController } from "../controller/userReviewsController.js";
import { validateUpdateUser } from "../middleware/validateUpdateUser.js";

const usersRouter = express.Router();
//TODO-------------------- GET ----------------------------
usersRouter.get(
  "/profile/:id",
  verifyAuthToken,
  updateUserActivity,
  getUserDataController
);
usersRouter.get(
  "/my-reviews/:id/reviews",
  verifyAuthToken,
  updateUserActivity,
  getMyReviewsController
);
usersRouter.get(
  "/:id",
  verifyAuthToken,
  updateUserActivity,
  getUserByIdController
);
//TODO-------------------- PUT ----------------------------
usersRouter.put(
  "/subscribe",
  verifyAuthToken,
  updateUserActivity,
  toggleSubscribeController
);
usersRouter.put(
  "/update/:id",
  verifyAuthToken,
  updateUserActivity,
  validateUpdateUser,
  updateUserController
);
export default usersRouter;
