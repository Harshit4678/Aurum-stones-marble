import dotenv from "dotenv";
dotenv.config();
console.log(
  "ENV DEBUG:",
  process.env.CLOUDINARY_CLOUD_NAME,
  process.env.CLOUDINARY_API_KEY,
  process.env.CLOUDINARY_API_SECRET
);

import "./config/cloudinary.js";
import express from "express";

import cors from "cors";
import connectDB from "./config/db.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productTypeRoutes from "./routes/productTypesRoutes.js";

// Connect to MongoDB
connectDB();

// Initialize express app
const app = express();

const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];
// Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin like mobile apps or curl
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json()); // to parse JSON requests

// Routes
app.use("/api/gallery", galleryRoutes);
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/product-types", productTypeRoutes);
app.use("/api/admin", adminRoutes);

// Basic route (optional - for testing)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
