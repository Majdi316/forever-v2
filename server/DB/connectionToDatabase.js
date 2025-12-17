//TODO Libraries
import mongoose from "mongoose";
import dotenv from "dotenv";
import config from "config";
dotenv.config({ quiet: true });

export const connectToDatabase = async () => {
  try {
    //TODO Variables
    const dbEnv = config.get("DB_ENVIRONMENT");

    const connectionString =
      dbEnv === "local" ? process.env.LOCAL_DB : process.env.ATLAS_DB;

    const connectionMsg =
      dbEnv === "local"
        ? "connected to MongoDb Locally!"
        : "connected to MongoDb Atlas!";

    mongoose
      .connect(connectionString)
      .then(() => console.log(connectionMsg))
      .catch((error) => console.log(`could not connect to mongoDb: ${error}`));
  } catch (error) {
    console.log(`Error in connection to DB: ${error.message}`);
  }
};
