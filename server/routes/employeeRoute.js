//TODO Libraries
import express from "express";
//TODO Auth
import { verifyAuthToken } from "../auth/verifyAuthToken.js";
//TODO Middleware
import { updateUserActivity } from "../middleware/updateActivity.js";
//TODO Controller
import {
  getProductsByEmployee,
} from "../controller/employeeProductController.js";

// Create the router
const employeeRouter = express.Router();

// Routes
//todo --------------------- GET ----------------------------
employeeRouter.get(
  "/:id/products",
  verifyAuthToken,
  updateUserActivity,
  getProductsByEmployee
);

export default employeeRouter;
