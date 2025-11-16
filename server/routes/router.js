//TODO Libraries
import express from "express";
//TODO Pages
import authRouter from "./authRoute.js";
import usersAuthRouter from "./userRoute.js";
import heroRouter from "./heroRoute.js";
import productRouter from "./productRoute.js";
import cartRouter from "./cartRouter.js";
import orderRouter from "./orderRoute.js";
import reviewRouter from "./reviewRoute.js";

//create router
const router = express.Router();
//endpoints
router.use("/auth", authRouter);
router.use("/users", usersAuthRouter);
router.use("/hero", heroRouter);
router.use("/products", productRouter);
router.use("/cart", cartRouter);
router.use("/order", orderRouter); 
router.use("/reviews", reviewRouter);
router.use((req, res) => {
  res.status(404).send("Page Not Found");
});

//TODO Export
export default router;
