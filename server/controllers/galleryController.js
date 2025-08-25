import Gallery from "../models/galleryModel.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../config/cloudinary.js";

// Upload image
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload to Cloudinary using helper
    const { url, public_id } = await uploadToCloudinary(req.file.path);

    const newImage = new Gallery({
      imageUrl: url,
      publicId: public_id,
    });

    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    console.error("Gallery Upload Error:", error);
    res.status(500).json({ message: "Upload failed", error });
  }
};

// Get all images
export const getAllImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Fetching failed", error });
  }
};

// Delete image
export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Gallery.findById(id);

    if (!image) return res.status(404).json({ message: "Image not found" });

    await deleteFromCloudinary(image.publicId);
    await image.deleteOne();

    res.json({ message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error });
  }
};
