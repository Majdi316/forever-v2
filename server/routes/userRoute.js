//TODO Libraries
import express from "express";
//TODO Import Function
import { getUserByIdController } from "../controller/userController.js";
import { verifyAuthToken } from "../auth/verifyAuthToken.js";
import { updateUserActivity } from "../middleware/updateActivity.js";

const usersAuthRouter = express.Router();

usersAuthRouter.get(
  "/:id",
  verifyAuthToken,
  updateUserActivity,
  getUserByIdController
);

export default usersAuthRouter;
