//TODO Libraries
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

//TODO Global Variables
const salt = 10;

//TODO Functions
const generatePassword = (password) => bcrypt.hashSync(password, salt);

const comparePassword = (password, hashPassword) =>
  bcrypt.compareSync(password, hashPassword);

export { generatePassword, comparePassword };