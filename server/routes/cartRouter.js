//TODO Libraries
import express from "express";
//TODO Middleware
import { verifyAuthToken } from "../auth/verifyAuthToken.js";
import { updateUserActivity } from "../middleware/updateActivity.js";
//TODO Controllers
import {
  addToCartController,
  getUserCartController,
  updateQuantityController,
} from "../controller/cartController.js";

// Create the router
const cartRouter = express.Router();

// Routes
//todo --------------------- POST ----------------------------
cartRouter.post(
  "/add",
  verifyAuthToken,
  updateUserActivity,
  addToCartController
);
cartRouter.post(
  "/update",
  verifyAuthToken,
  updateUserActivity,
  updateQuantityController
);
cartRouter.post(
  "/get",
  verifyAuthToken,
  updateUserActivity,
  getUserCartController
);

export default cartRouter;
