//TODO Libraries
import express from "express";
//TODO Controllers
import {
  createNewHeroSectionController,
  getHeroController,
  updateHeroController,
} from "../controller/heroController.js";
//TODO Token
import { verifyAuthToken } from "../auth/verifyAuthToken.js";
import { updateUserActivity } from "../middleware/updateActivity.js";

// Create the router
const heroRouter = express.Router();

//todo --------------------- GET ----------------------------
heroRouter.get("/", getHeroController);
//todo --------------------- POST ----------------------------
heroRouter.post(
  "/",
  verifyAuthToken,
  updateUserActivity,
  createNewHeroSectionController
);
//todo --------------------- PUT ----------------------------
heroRouter.put(
  "/:id",
  verifyAuthToken,
  updateUserActivity,
  updateHeroController
);

export default heroRouter;
