//TODO Libraries
import express from "express";

//TODO Import Functions
import {
  checkAuthController,
  createNewUserController,
  forgotPasswordController,
  loginController,
  logoutController,
  resetPasswordController,
  testServer,
  verifyEmailController,
} from "../controller/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

// Create the router
const usersAuthRouter = express.Router();

// Routes
//todo --------------------- GET ----------------------------
usersAuthRouter.get("/test", testServer);
usersAuthRouter.get("/check-auth", verifyToken, checkAuthController);
//todo --------------------- POST ----------------------------
usersAuthRouter.post("/signup", createNewUserController);
usersAuthRouter.post("/verify-email", verifyEmailController);
usersAuthRouter.post("/login", loginController);
usersAuthRouter.post("/logout", logoutController);
usersAuthRouter.post("/forgot-password", forgotPasswordController);
usersAuthRouter.post("/reset-password/:token", resetPasswordController);
export default usersAuthRouter;
