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
const usersRouter = express.Router();

// Routes
//todo --------------------- GET ----------------------------
usersRouter.get("/test", testServer);
usersRouter.get("/check-auth", verifyToken, checkAuthController);
//todo --------------------- POST ----------------------------
usersRouter.post("/signup", createNewUserController);
usersRouter.post("/verify-email", verifyEmailController);
usersRouter.post("/login", loginController);
usersRouter.post("/logout", logoutController);
usersRouter.post("/forgot-password", forgotPasswordController);
usersRouter.post("/reset-password/:token", resetPasswordController);

export default usersRouter;
