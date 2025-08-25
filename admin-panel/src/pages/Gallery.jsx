import { useState, useEffect } from "react";
import axios from "axios";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);

  const fetchImages = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/gallery`
      );
      setImages(res.data);
    } catch (err) {
      console.error("Error fetching gallery:", err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/gallery/upload`,
        formData
      );
      setFile(null);
      fetchImages(); // Refresh images
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/gallery/${id}`);
      fetchImages(); // Refresh
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Gallery</h1>

      <form onSubmit={handleUpload} className="mb-6 flex gap-4 items-center">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img._id} className="bg-white rounded shadow p-2">
            <img
              src={img.imageUrl}
              alt="Gallery"
              className="w-full h-40 object-cover rounded"
            />
            <button
              onClick={() => handleDelete(img._id)}
              className="mt-2 text-red-600 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
