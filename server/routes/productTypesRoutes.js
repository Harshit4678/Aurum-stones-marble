import express from "express";
import ProductType from "../models/ProductType.js";

const router = express.Router();

// ✅ Get All Product Types
router.get("/", async (req, res) => {
  try {
    const types = await ProductType.find();
    res.json(types);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product types" });
  }
});

// ✅ Create New Product Type
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    // check if already exists
    const exists = await ProductType.findOne({ name });
    if (exists) return res.status(409).json({ message: "Type already exists" });

    const type = new ProductType({ name });
    await type.save();

    res.status(201).json(type);
  } catch (err) {
    console.error("Error creating product type:", err);
    res.status(500).json({ message: "Failed to create product type" });
  }
});

export default router;
