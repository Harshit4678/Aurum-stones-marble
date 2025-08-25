import Inquiry from "../models/inquiryModel.js";

export const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, message, productInfo } = req.body;

    if (!name || !message) {
      return res.status(400).json({ message: "Name and message are required" });
    }

    const inquiry = new Inquiry({ name, email, phone, message, productInfo });
    await inquiry.save();

    res.status(201).json({ message: "Inquiry submitted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating inquiry", error: err.message });
  }
};

export const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching inquiries", error: err.message });
  }
};

export const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const inquiry = await Inquiry.findByIdAndDelete(id);
    if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });
    res.json({ message: "Inquiry deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting inquiry", error: err.message });
  }
};
