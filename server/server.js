//TODO Libraries
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
//TODO Import Functions
import { connectToDatabase } from "./DB/connectionToDatabase.js";
import router from "./routes/router.js";

//TODO Global Variables
dotenv.config({ quiet: true });
const app = express();
const PORT = process.env.PORT || 8080;

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser()); 

//api router
app.use("/api/", router);

// Start The Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
  connectToDatabase();
});
