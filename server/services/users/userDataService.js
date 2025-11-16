//TODO Models
import { User } from "../../models/User.js";

//todo------------------ Create New User --------------------------
const createNewUser = async (user) => {
  try {
    const userForDb = new User(user);
    await userForDb.save();
    return userForDb;
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.email) {
      throw new Error("Email already exists");
    }
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      throw new Error(`Validation failed: ${messages.join(", ")}`);
    }
    if (
      error.name === "MongoNetworkError" ||
      error.message.includes("ECONNREFUSED")
    ) {
      throw new Error("Database connection error");
    }
    throw new Error("MongoDb - Error in creating new user");
  }
};

//todo-----------get user by email----------
const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

//todo-----------get user by id----------
const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
export { createNewUser, getUserByEmail, getUserById };
