//TODO Libraries
import express from "express";
//TODO Controllers
import { getTotalDataController } from "../controller/manager/getTotalDataController.js";

//TODO Token
import { verifyAuthToken } from "../auth/verifyAuthToken.js";
import { updateUserActivity } from "../middleware/updateActivity.js";
import {
  getKPI,
  getMonthlyEarnings,
  getMonthlyOrdersCount,
  getTopProducts,
} from "../controller/manager/earningController.js";
import { getTopActiveUsers } from "../controller/manager/usersController.js";
import { getUsersWithStats } from "../controller/manager/getAllUsersController.js";

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

export default managerRouter;
