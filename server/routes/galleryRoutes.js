import express from "express";
import {
  uploadImage,
  getAllImages,
  deleteImage,
} from "../controllers/galleryController.js";
import upload from "../middleware/upload.js"; // multer middleware

const router = express.Router();

router.post("/upload", upload.single("image"), uploadImage);
router.get("/", getAllImages);
router.delete("/:id", deleteImage);

export default router;
