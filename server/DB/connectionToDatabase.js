//TODO Libraries
import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDb connected to : ${connection.connection.host} successfully !!! `
    );
  } catch (error) {
    console.log(`Error in connection to DB: ${error.message}`);
  }
};
