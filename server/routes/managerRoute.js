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

// Create the router
const managerRouter = express.Router();
//todo --------------------- GET ----------------------------
managerRouter.get(
  "/total-data",
  verifyAuthToken,
  updateUserActivity,
  getTotalDataController
);
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
managerRouter.get(
  "/earnings/kpi",
  verifyAuthToken,
  updateUserActivity,
  getKPI
);
export default managerRouter;
