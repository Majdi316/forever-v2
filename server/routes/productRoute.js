//TODO Libraries
import express from "express";
import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  toggleLikeController,
} from "../controller/productController.js";
import { verifyAuthToken } from "../auth/verifyAuthToken.js";
import { updateUserActivity } from "../middleware/updateActivity.js";
//TODO Controllers

// Create the router
const productRouter = express.Router();
//Endpoints
//todo --------------------- GET ----------------------------
productRouter.get("/", getAllProductsController);
productRouter.get("/product-info/:id", getProductByIdController);
//todo --------------------- POST ----------------------------
productRouter.post(
  "/",
  verifyAuthToken,
  updateUserActivity,
  createProductController
);
//todo --------------------- PATCH ----------------------------
productRouter.patch(
  "/like/:id",
  verifyAuthToken,
  updateUserActivity,
  toggleLikeController
);

export default productRouter;
