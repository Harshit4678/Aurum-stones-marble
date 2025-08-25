import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    message: { type: String, required: true },
    productInfo: {
      name: String,
      price: Number,
      image: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Inquiry", inquirySchema);
