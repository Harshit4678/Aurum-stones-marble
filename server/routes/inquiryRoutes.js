import {
  createInquiry,
  getAllInquiries,
  deleteInquiry, // <-- add this import
} from "../controllers/inquiryController.js";
import express from "express";

const router = express.Router();

// Public route - used by client contact form
router.post("/", createInquiry);

// Admin route - used in admin panel
router.get("/", getAllInquiries);
router.delete("/:id", deleteInquiry);

export default router;
