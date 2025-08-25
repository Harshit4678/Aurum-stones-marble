import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";
import upload from "../middleware/upload.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.post("/", verifyAdmin, upload.array("images", 5), createProduct);
router.put("/:id", verifyAdmin, upload.array("images", 5), updateProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.delete("/:id", verifyAdmin, deleteProduct);

export default router;
