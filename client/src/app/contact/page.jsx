"use client";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner"; // 👈 Sonner import

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError("");

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/inquiry`,
        formData
      );
      setSuccess(true);
      toast.success("Inquiry submitted successfully!", {
        description: "We'll get back to you soon 🚀",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setError("Something went wrong!");
      toast.error("Submission failed!", {
        description: "Please try again later ❌",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fefcf9] via-[#f8f5ef] to-[#ece6da] bg-fixed bg-no-repeat bg-cover p-4 md:p-10">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 p-6 md:p-10 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-[#d4b38f]/20 backdrop-blur"
        >
          <h2 className="text-3xl font-bold text-[#b08955] mb-4 font-serif">
            Visit Our Showroom
          </h2>
          <p className="text-gray-800 mb-1">
            📍 <strong>Address:</strong> Aurum Stones, Furniture Market, Kirti
            Nagar, Delhi
          </p>
          <p className="text-gray-800 mb-1">
            📞 <strong>Phone:</strong> +91-7302206202
          </p>
          <p className="text-gray-800 mb-1">
            ✉️ <strong>Email:</strong> contact@aurumstones.com
          </p>
          <p className="text-gray-800">
            🕐 <strong>Hours:</strong> Mon–Sat, 10 AM – 7 PM
          </p>
        </motion.div>

        {/* Form + Map */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/90 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] p-6 md:p-10 border border-[#d4b38f]/20 backdrop-blur"
          >
            <h2 className="text-3xl font-bold text-[#b08955] mb-6 font-serif">
              Contact Us
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#b08955] bg-white/70"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#b08955] bg-white/70"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#b08955] bg-white/70"
                value={formData.phone}
                onChange={handleChange}
              />
              <textarea
                name="message"
                placeholder="Your Message"
                className="w-full border border-gray-300 rounded-md p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#b08955] bg-white/70"
                value={formData.message}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="bg-[#b08955] hover:bg-[#9a7449] text-white font-semibold px-6 py-3 rounded-md transition duration-300"
              >
                Submit Inquiry
              </button>
            </form>
          </motion.div>

          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="rounded-3xl overflow-hidden shadow-lg h-[400px] border border-[#d4b38f]/30"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14013.368749335235!2d77.13034305!3d28.6515656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d02e597e81089%3A0x798b1c469e99386d!2sKirti%20Nagar%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1718430000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
