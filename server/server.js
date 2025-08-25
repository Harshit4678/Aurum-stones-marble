import dotenv from "dotenv";

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import "./config/cloudinary.js";

import inquiryRoutes from "./routes/inquiryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productTypeRoutes from "./routes/productTypesRoutes.js";

dotenv.config();

connectDB();

// Initialize express app
const app = express();

// Allowed origins (add frontend domains here)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://aurum-stones-admin-panel.vercel.app",
  process.env.FRONTEND_URL, // in case you deploy
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // mobile apps, curl, postman
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  })
);

app.use(express.json()); // Parse incoming JSON

// Routes
app.use("/api/gallery", galleryRoutes);
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/product-types", productTypeRoutes);
app.use("/api/admin", adminRoutes);

// Health check / root
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
