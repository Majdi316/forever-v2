//TODO Libraries
import express from "express";
//TODO Token
import { verifyAuthToken } from "../auth/verifyAuthToken.js";
//TODO Controllers
import { getTotalDataController } from "../controller/manager/getTotalDataController.js";
import { updateUserActivity } from "../middleware/updateActivity.js";
import {
  getKPI,
  getMonthlyEarnings,
  getMonthlyOrdersCount,
  getTopProducts,
} from "../controller/manager/earningController.js";
import {
  getTopActiveUsers,
  updateUserStatus,
} from "../controller/manager/usersController.js";
import { getUsersWithStats } from "../controller/manager/getAllUsersController.js";
import {
  answerMessage,
  getUserMessages,
} from "../controller/manager/messagesController.js";
import {
  deleteSoldOutProduct,
  getEmployees,
  getProductsSalesAnalytics,
} from "../controller/manager/productsSalesAnalytics.js";
import {
  deleteReview,
  getAllReviewsForManager,
} from "../controller/manager/getAllReviewsForManager.js";
import {
  answerContact,
  deleteContact,
  getAllContactsForManager,
} from "../controller/manager/manageMessagesController.js";

// Create the router
const managerRouter = express.Router();
//todo --------------------- GET ----------------------------
managerRouter.get(
  "/total-data",
  verifyAuthToken,
  updateUserActivity,
  getTotalDataController
);
//!----------------- EARNING ENDPOINTS ------------------------
//todo --------------------- GET ----------------------------
managerRouter.get(
  "/earnings/monthly",
  verifyAuthToken,
  updateUserActivity,
  getMonthlyEarnings
);
managerRouter.get(
  "/earnings/monthly-orders",
  verifyAuthToken,
  updateUserActivity,
  getMonthlyOrdersCount
);
managerRouter.get(
  "/earnings/top-products",
  verifyAuthToken,
  updateUserActivity,
  getTopProducts
);
managerRouter.get("/earnings/kpi", verifyAuthToken, updateUserActivity, getKPI);
//!----------------- USERS ENDPOINTS ------------------------
//todo --------------------- GET ----------------------------
managerRouter.get(
  "/top-active-users",
  verifyAuthToken,
  updateUserActivity,
  getTopActiveUsers
);
managerRouter.get(
  "/all-users",
  verifyAuthToken,
  updateUserActivity,
  getUsersWithStats
);
managerRouter.get(
  "/users/:userId/messages",
  verifyAuthToken,
  updateUserActivity,
  getUserMessages
);
//todo --------------------- PUT ----------------------------
managerRouter.put(
  "/update-status/:userId",
  verifyAuthToken,
  updateUserActivity,
  updateUserStatus
);
managerRouter.put(
  "/messages/:contactId/answer",
  verifyAuthToken,
  updateUserActivity,
  answerMessage
);

//!----------------- PRODUCTS ENDPOINTS ------------------------
//todo --------------------- GET ----------------------------
managerRouter.get(
  "/products-analytics",
  verifyAuthToken,
  updateUserActivity,
  getProductsSalesAnalytics
);
managerRouter.get(
  "/employees",
  verifyAuthToken,
  updateUserActivity,
  getEmployees
);
//todo --------------------- DELETE ----------------------------
managerRouter.delete(
  "/delete-soldout/:productId",
  verifyAuthToken,
  updateUserActivity,
  deleteSoldOutProduct
);
//!----------------- REVIEWS ENDPOINTS ------------------------
//todo --------------------- GET ----------------------------
managerRouter.get(
  "/reviews",
  verifyAuthToken,
  updateUserActivity,
  getAllReviewsForManager
);
//todo --------------------- DELETE ----------------------------
managerRouter.delete(
  "/reviews/:reviewId",
  verifyAuthToken,
  updateUserActivity,
  deleteReview
);
//!----------------- MESSAGES ENDPOINTS ------------------------
//todo --------------------- GET ----------------------------
managerRouter.get(
  "/messages",
  verifyAuthToken,
  updateUserActivity,
  getAllContactsForManager
);
//todo --------------------- PUT ----------------------------
managerRouter.put(
  "/messages/:id/answer",
  verifyAuthToken,
  updateUserActivity,
  answerContact
);
//todo --------------------- DELETE ----------------------------
managerRouter.delete(
  "/messages/:id",
  verifyAuthToken,
  updateUserActivity,
  deleteContact
);
export default managerRouter;
