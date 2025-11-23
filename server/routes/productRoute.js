//TODO Libraries
import express from "express";
import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  myFavoriteProductsController,
  toggleLikeController,
} from "../controller/productController.js";
import { verifyAuthToken } from "../auth/verifyAuthToken.js";
import { updateUserActivity } from "../middleware/updateActivity.js";
import { updateProductController } from "../controller/updateProductController.js";

//TODO Controllers

// Create the router
const productRouter = express.Router();
//Endpoints
//todo --------------------- GET ----------------------------
productRouter.get("/", getAllProductsController);
productRouter.get("/product-info/:id", getProductByIdController);
productRouter.get(
  "/my-favorite/:id/products",
  verifyAuthToken,
  updateUserActivity,
  myFavoriteProductsController
);
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
//todo --------------------- PUT ----------------------------

productRouter.put(
  "/update/:id",
  verifyAuthToken,
  updateUserActivity,
  updateProductController
);
export default productRouter;
