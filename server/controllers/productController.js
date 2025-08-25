import Product from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Helper to upload to Cloudinary and remove local file
const uploadToCloudinary = async (localPath) => {
  try {
    const result = await cloudinary.uploader.upload(localPath, {
      folder: "marquise_luxury/products",
      resource_type: "image",
    });
    // Remove local file after upload
    fs.unlinkSync(localPath);
    return result.secure_url;
  } catch (err) {
    if (fs.existsSync(localPath)) fs.unlinkSync(localPath);
    throw err;
  }
};

// Create Product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, offer, type } = req.body;

    if (
      !name ||
      !description ||
      !price ||
      !type ||
      !req.files ||
      req.files.length === 0
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Upload all images to Cloudinary
    const imageUrls = [];
    for (const file of req.files) {
      const url = await uploadToCloudinary(file.path);
      imageUrls.push(url);
    }

    const newProduct = new Product({
      name,
      description,
      price,
      offer,
      type,
      images: imageUrls,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created", product: newProduct });
  } catch (err) {
    console.error("Create Error:", err);
    res.status(500).json({ message: "Failed to create product" });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, offer, type } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.offer = offer || product.offer;
    product.type = type || product.type;

    // If new images uploaded, upload to Cloudinary
    if (req.files && req.files.length > 0) {
      const newImageUrls = [];
      for (const file of req.files) {
        const url = await uploadToCloudinary(file.path);
        newImageUrls.push(url);
      }
      product.images = newImageUrls;
    }

    await product.save();
    res.status(200).json({ message: "Product updated", product });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ message: "Failed to update product" });
  }
};

// Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("type", "name");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// Get Single Product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "type",
      "name"
    );
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

// Delete
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
