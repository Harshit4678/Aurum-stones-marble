import mongoose from "mongoose";

const productTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // ensures no duplicate
    trim: true,
  },
});

const ProductType = mongoose.model("ProductType", productTypeSchema);

export default ProductType;
