//TODO Libraries
import { Schema } from "mongoose";
//TODO Pages
import { DEFAULT_VALIDATION } from "../mongooseValidators.js";

export const Address = new Schema({
  state: {
    type: String,
    maxLength: 256,
    trim: true,
  },
  country: DEFAULT_VALIDATION,
  city: DEFAULT_VALIDATION,
  street: DEFAULT_VALIDATION,
  houseNumber: {
    type: Number,
    minLength: 1,
    trim: true,
    require: true,
  },
  zip: {
    type: Number,
    minLength: 4,
    trim: true,
    default: 0,
  },
});
