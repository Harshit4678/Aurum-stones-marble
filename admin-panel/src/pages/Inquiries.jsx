// src/pages/Inquiries.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/inquiry`
      );
      setInquiries(res.data);
    } catch (err) {
      console.error("Error fetching inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/inquiry/${id}`);
      setInquiries((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      console.error("Error deleting inquiry:", err);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Inquiries</h1>
      {loading ? (
        <p>Loading...</p>
      ) : inquiries.length === 0 ? (
        <p>No inquiries found.</p>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry._id}
              className="border p-4 rounded bg-white shadow"
            >
              {/* Product Card */}
              {inquiry.productInfo && (
                <div className="flex items-center gap-3 mb-3 bg-gray-50 p-2 rounded">
                  <img
                    src={inquiry.productInfo.image}
                    alt={inquiry.productInfo.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <div className="font-semibold">
                      {inquiry.productInfo.name}
                    </div>
                    <div className="text-[#b08955] font-bold">
                      ₹{inquiry.productInfo.price}
                    </div>
                  </div>
                </div>
              )}
              <p>
                <strong>Name:</strong> {inquiry.name}
              </p>
              <p>
                <strong>Email:</strong> {inquiry.email}
              </p>
              <p>
                <strong>Phone:</strong> {inquiry.phone}
              </p>
              <p>
                <strong>Message:</strong> {inquiry.message}
              </p>
              <button
                className="text-red-600 mt-2"
                onClick={() => handleDelete(inquiry._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inquiries;
