//TODO Libraries
import mongoose from "mongoose";
//TODO Pages
import { DEFAULT_VALIDATION } from "../mongooseValidators.js";
export const Name = new mongoose.Schema({
  first: DEFAULT_VALIDATION,
  middle: {
    ...DEFAULT_VALIDATION,
    required: false,
    minLength: 0,
  },
  last: DEFAULT_VALIDATION,
});
