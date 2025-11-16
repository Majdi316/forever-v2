import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  alt: { type: String, default: "product image" },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: 10,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    image: {
      type: [imageSchema],
      validate: [(arr) => arr.length > 0, "At least one image is required"],
    },
    likes: {
      type: [String],
      default: [],
    },
    employee_id: {
      type: String,
    },
    category: {
      type: String,
      required: true,
      enum: ["Men", "Women", "Kids"],
    },
    subCategory: {
      type: String,
      required: [true, "subCategory is required"],
      enum: ["Topwear", "Bottomwear", "Winterwear"],
    },
    sizes: {
      type: [String],
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    date: {
      type: Number,
      default: Date.now,
    },
    bestseller: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["Available", "Sold-Out", "Coming-Soon"],
      default: "Available",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
