// admin/src/components/GalleryCard.jsx
import React from "react";

const GalleryCard = ({ image, onDelete }) => (
  <div className="w-full sm:w-1/2 md:w-1/3 p-2">
    <div className="rounded-lg shadow-lg overflow-hidden">
      <img
        src={image.imageUrl}
        alt="Gallery"
        className="w-full h-48 object-cover"
      />
      <div className="p-2 flex justify-between items-center">
        <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        <button
          onClick={() => onDelete(image._id)}
          className="text-red-600 font-bold"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default GalleryCard;
