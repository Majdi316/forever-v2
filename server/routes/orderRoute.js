//TODO Libraries
import express from "express";
//TODO Controllers
import {
  getAllOrdersController,
  getUserOrdersController,
  placeOrderController,
  placeOrderStripeController,
  updateOrderStatusController,
  verifyStripePayment,
} from "../controller/orderController.js";
//TODO Middleware
import { verifyAuthToken } from "../auth/verifyAuthToken.js";
import { updateUserActivity } from "../middleware/updateActivity.js";

// Create the router
const orderRouter = express.Router();

// Routes
//todo --------------------- POST ----------------------------
//Manager Features
orderRouter.post(
  "/list",
  verifyAuthToken,
  updateUserActivity,
  getAllOrdersController
);
orderRouter.post(
  "/status",
  verifyAuthToken,
  updateUserActivity,
  updateOrderStatusController
);
//User Features
orderRouter.post(
  "/userOrders",
  verifyAuthToken,
  updateUserActivity,
  getUserOrdersController
);
//payment Methods
orderRouter.post(
  "/place",
  verifyAuthToken,
  updateUserActivity,
  placeOrderController
);
orderRouter.post(
  "/stripe",
  verifyAuthToken,
  updateUserActivity,
  placeOrderStripeController
);
//stripe payment verification
orderRouter.post(
  "/verifyStripe",
  verifyAuthToken,
  updateUserActivity,
  verifyStripePayment
);



export default orderRouter;
