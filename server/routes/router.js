//TODO Libraries
import express from "express";
//TODO Pages
import usersAuthRouter from "./authRoute.js";
import heroRouter from "./heroRoute.js";
import productRouter from "./productRoute.js";
import cartRouter from "./cartRouter.js";
import orderRouter from "./orderRoute.js";
import reviewRouter from "./reviewRoute.js";
import employeeRouter from "./employeeRoute.js";
import contactRouter from "./contactRoute.js";
import usersRouter from "./userRoute.js";

//create router
const router = express.Router();
//endpoints
router.use("/auth", usersAuthRouter);
router.use("/users", usersRouter);
router.use("/hero", heroRouter);
router.use("/products", productRouter);
router.use("/cart", cartRouter);
router.use("/order", orderRouter);
router.use("/reviews", reviewRouter);
router.use("/employee", employeeRouter);
router.use("/contacts", contactRouter);

router.use((req, res) => {
  res.status(404).send("Page Not Found");
});

//TODO Export
export default router;
