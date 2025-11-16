//TODO Libraries
import { Schema } from "mongoose";
//TODO Pages
import { DEFAULT_VALIDATION, URL } from "../mongooseValidators.js";

export const Image = new Schema({
  url: URL,
  alt: {
    ...DEFAULT_VALIDATION,
    minLength: 0,
    required: false,
    default: "thats an image",
  },
});
