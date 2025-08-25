"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const GalleryPage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/gallery`
        );
        setImages(res.data);
      } catch (err) {
        console.error("Failed to fetch gallery", err);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f8f8] to-gray-100 px-4 py-12">
      {/* Section Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-extrabold text-[#a0783c] drop-shadow-sm tracking-wide">
          Aurum Stones Gallery
        </h2>
        <p className="mt-2 text-gray-600 max-w-xl mx-auto text-sm md:text-base">
          Discover the timeless elegance of handcrafted luxury decor — each
          piece a testament to artistry and precision.
        </p>
        <div className="mt-2 w-24 h-1 bg-gradient-to-r from-[#b58c5c] to-[#e6c99c] mx-auto rounded-full shadow-sm" />
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {images.map((img) => (
          <div
            key={img._id}
            className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={img.imageUrl}
              alt={img.title || "Gallery Image"}
              className="w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition duration-300 flex items-end p-4">
              <p className="text-white text-sm font-medium">
                {img.title || "Aurum Luxury Decor"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
