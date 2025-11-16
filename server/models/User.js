//TODO Libraries
import mongoose from "mongoose";
//TODO Import Global Variables
import { EMAIL, PHONE, URL } from "../helpers/mongooseValidators.js";
import { Address } from "../helpers/subModels/Address.js";
import { Image } from "../helpers/subModels/Image.js";
import { Name } from "../helpers/subModels/Name.js";

const userSchema = new mongoose.Schema(
  {
    name: Name,
    phone: PHONE,
    email: EMAIL,
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 120,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    cartData: {
      type: Object,
      default: {},
    },
    image: Image,
    address: Address,
    isEmployee: { type: Boolean, default: false },
    isManager: { type: Boolean, default: false },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    lastActivity: {
      type: Date,
      default: Date.now,
    },
    isSubscribe: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { minimize: false }
);

export const User = mongoose.model("User", userSchema);
