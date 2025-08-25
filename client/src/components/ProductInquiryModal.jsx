import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const ProductInquiryModal = ({
  open,
  onClose,
  productName,
  productPrice,
  productImage,
}) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [confirmClose, setConfirmClose] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isFilled = form.name || form.phone || form.email || form.message;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    if (isFilled && !confirmClose) {
      setConfirmClose(true);
    } else {
      setConfirmClose(false);
      onClose();
      setForm({ name: "", phone: "", email: "", message: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/inquiry`, {
        ...form,
        productInfo: {
          name: productName,
          price: productPrice,
          image: productImage,
        },
      });
      setSubmitting(false);
      onClose();
      setForm({ name: "", phone: "", email: "", message: "" });
      toast.success("Inquiry submitted successfully!");
    } catch {
      setSubmitting(false);
      toast.error("Failed to submit inquiry. Please try again.");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-xl"
          onClick={handleClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-2">Product Inquiry</h2>
        <div className="flex items-center gap-3 mb-4">
          <img
            src={productImage}
            alt={productName}
            className="w-14 h-14 object-cover rounded"
          />
          <div>
            <div className="font-semibold">{productName}</div>
            <div className="text-[#b08955] font-bold">₹{productPrice}</div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            name="email"
            placeholder="Email (optional)"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <textarea
            name="message"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            disabled={submitting}
            className="bg-[#b08955] text-white px-4 py-2 rounded w-full"
          >
            {submitting ? "Submitting..." : "Submit Inquiry"}
          </button>
        </form>
        {confirmClose && (
          <div className="mt-4 bg-yellow-50 border border-yellow-300 p-3 rounded">
            <p>Form is partially filled. Close anyway?</p>
            <div className="flex gap-2 mt-2">
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => {
                  setConfirmClose(false);
                  onClose();
                  setForm({ name: "", phone: "", email: "", message: "" });
                }}
              >
                Yes, Close
              </button>
              <button
                className="bg-gray-300 px-3 py-1 rounded"
                onClick={() => setConfirmClose(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInquiryModal;
