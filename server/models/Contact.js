import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 1000,
    },

    answer: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);
const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
