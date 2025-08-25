import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true, // needed for deleting from Cloudinary
    },
  },
  { timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema);
