//TODO Libraries
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
//TODO Import Functions
import { connectToDatabase } from "./DB/connectionToDatabase.js";
import router from "./routes/router.js";
import logger from "./middleware/logger.js";
//TODO Global Variables
dotenv.config({ quiet: true });
const app = express();
const PORT = process.env.PORT || 8080;

//! middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(logger);
//! Rate Limiter
const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 250, // limit each IP to 100 requests per window
  message: {
    status: 429,
    error: "Too many requests. You can only make 100 requests per 24 hours.",
  },
});
app.use("/api/", limiter); 

//!api router
app.use("/api/", router);

// Start The Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
  connectToDatabase();
});
