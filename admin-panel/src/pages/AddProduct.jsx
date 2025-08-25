import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [offer, setOffer] = useState("");
  const [type, setType] = useState("");
  const [types, setTypes] = useState([]);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch product types on load
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/product-types`
        );
        setTypes(res.data);
      } catch (err) {
        console.error("Error loading product types", err);
      }
    };
    fetchTypes();
  }, []);

  // ✅ Handle image input
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      alert("Maximum 5 images allowed.");
      return;
    }
    setImages([...images, ...files]);
  };

  // ✅ Submit product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!type || !name || !desc || !price || images.length === 0) {
      return alert("Please fill all fields and upload at least 1 image.");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", desc);
    formData.append("price", price);
    formData.append("offer", offer);
    formData.append("type", type); // type _id
    images.forEach((img) => formData.append("images", img));

    const token = localStorage.getItem("adminToken");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/products`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("✅ Product added successfully");
      navigate("/admin/products");
    } catch (err) {
      console.error("Product upload failed", err);
      alert("❌ Error uploading product");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">➕ Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          className="border p-2 w-full"
          required
        />

        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
          className="border p-2 w-full"
          required
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="border p-2 w-full"
          required
        />

        <input
          type="text"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
          placeholder="Offer (optional)"
          className="border p-2 w-full"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 w-full"
          required
        >
          <option value="">-- Select Product Type --</option>
          {types.length > 0 ? (
            types.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name}
              </option>
            ))
          ) : (
            <option disabled>Loading types...</option>
          )}
        </select>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 w-full"
          required
        />

        <p className="text-sm text-gray-500">Max 5 images allowed</p>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
