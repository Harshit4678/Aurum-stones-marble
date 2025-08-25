// server/models/adminUserModel.js
import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model("AdminUser", adminUserSchema);
