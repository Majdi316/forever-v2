//TODO Libraries
import express from "express";
//TODO Middleware
//TODO Middleware
import { verifyAuthToken } from "../auth/verifyAuthToken.js";
import { updateUserActivity } from "../middleware/updateActivity.js";
import {
  createNewContactController,
  deleteContactController,
  getContactsByUserId,
} from "../controller/contactController.js";
//TODO Controllers
// Create the router
const contactRouter = express.Router();

// Routes
//todo --------------------- GET ----------------------------
contactRouter.get(
  "/my-contacts/:id",
  verifyAuthToken,
  updateUserActivity,
  getContactsByUserId
);
//todo --------------------- POST ----------------------------
contactRouter.post(
  "/create",
  verifyAuthToken,
  updateUserActivity,
  createNewContactController
);
//todo --------------------- DELETE ----------------------------
contactRouter.delete(
  "/:id",
  verifyAuthToken,
  updateUserActivity,
  deleteContactController
);
export default contactRouter;
