import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const MAX_IMAGES = 5;

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [types, setTypes] = useState([]);

  // existing images (URLs from server/cloud)
  const [existingImages, setExistingImages] = useState([]);

  // new image files and their preview URLs
  const [newImages, setNewImages] = useState([]); // File[]
  const [newPreviews, setNewPreviews] = useState([]); // object URLs

  const fileInputRef = useRef(null);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchProductAndTypes = async () => {
      try {
        const [productRes, typeRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/product-types`),
        ]);
        setProduct(productRes.data);
        setTypes(typeRes.data || []);
        setExistingImages(productRes.data.images || []);
      } catch (err) {
        console.error("Fetch error", err);
      }
    };
    fetchProductAndTypes();
  }, [id]);

  // cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [newPreviews]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    // enforce max across existing + new
    if (existingImages.length + newImages.length + files.length > MAX_IMAGES) {
      alert(`Max ${MAX_IMAGES} images allowed (existing + new).`);
      // reset input so user can re-select
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // add files and create previews
    const newUrls = files.map((f) => URL.createObjectURL(f));
    setNewPreviews((prev) => [...prev, ...newUrls]);
    setNewImages((prev) => [...prev, ...files]);

    // reset input so same file can be reselected later if needed
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    // revoke object URL
    URL.revokeObjectURL(newPreviews[index]);
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !product?.name ||
      !product?.description ||
      !product?.price ||
      !product?.type
    ) {
      return alert("Please fill all required fields");
    }

    if (!token) {
      return alert("Not authenticated - admin token missing.");
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("offer", product.offer || "");
    formData.append("type", product.type);

    // Append new files
    newImages.forEach((file) => {
      // many backends accept repeated 'images' fields (multer .array('images'))
      formData.append("images", file);
    });

    // send which existing images you want to keep (backend must support this)
    // e.g. backend will remove any server-side images that are not in this array
    formData.append("existingImages", JSON.stringify(existingImages));

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/products/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // do NOT set Content-Type here; let axios set the boundary automatically
          },
        }
      );
      alert("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      console.error("Update error", err);
      // if backend responds with 403/401 or multer maxCount error, inspect err.response.data
      alert("Update failed: " + (err.response?.data?.message || err.message));
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          placeholder="Product Name"
          className="border p-2 w-full"
          required
        />
        <textarea
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          placeholder="Description"
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          placeholder="Price"
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          value={product.offer || ""}
          onChange={(e) => setProduct({ ...product, offer: e.target.value })}
          placeholder="Offer (optional)"
          className="border p-2 w-full"
        />
        <select
          value={product.type}
          onChange={(e) => setProduct({ ...product, type: e.target.value })}
          className="border p-2 w-full"
          required
        >
          <option value="">Select Type</option>
          {types.map((t) => (
            <option key={t._id} value={t._id}>
              {t.name}
            </option>
          ))}
        </select>

        {/* Image Upload */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 w-full"
        />
        <p className="text-sm text-gray-500">
          Max {MAX_IMAGES} images total (existing + new)
        </p>

        {/* Preview - show existing first then new ones */}
        <div className="grid grid-cols-3 gap-2">
          {existingImages.map((url, i) => (
            <div key={`exist-${i}`} className="relative">
              <img
                src={url}
                className="w-full h-32 object-cover rounded"
                alt={`existing-${i}`}
              />
              <button
                type="button"
                onClick={() => removeExistingImage(i)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded px-2 py-1 text-xs"
              >
                Remove
              </button>
            </div>
          ))}

          {newPreviews.map((url, i) => (
            <div key={`new-${i}`} className="relative">
              <img
                src={url}
                className="w-full h-32 object-cover rounded"
                alt={`new-${i}`}
              />
              <button
                type="button"
                onClick={() => removeNewImage(i)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded px-2 py-1 text-xs"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
