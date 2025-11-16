//TODO Libraries
import mongoose from "mongoose";
//TODO Global Variables
import { Image } from "../helpers/subModels/Image.js";

const heroSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: Image,
});

export const Hero = mongoose.model("Hero", heroSchema);
