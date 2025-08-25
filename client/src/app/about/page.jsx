"use client";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fefcf9] via-[#f8f5ef] to-[#ece6da] py-12 px-4 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
        className="max-w-4xl w-full bg-white/90 shadow-[0_12px_30px_-5px_rgba(0,0,0,0.15)] rounded-3xl p-10 backdrop-blur-md border border-[#d1b187]/20"
      >
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
          className="text-5xl font-extrabold text-[#b08955] mb-6 text-center tracking-tight font-serif drop-shadow-md"
        >
          About <span className="text-black">Aurum Stones</span>
        </motion.h1>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-xl text-gray-700 mb-8 text-center font-medium leading-relaxed"
        >
          Since <span className="font-bold text-[#b08955]">2017</span>, Aurum
          Stones has been curating{" "}
          <span className="text-[#b08955] font-semibold">rare gemstones</span>{" "}
          and{" "}
          <span className="text-[#b08955] font-semibold">
            luxury marble decor
          </span>{" "}
          to redefine timeless living. With roots in Delhi, we combine nature’s
          most precious creations with master craftsmanship to craft decor that
          radiates elegance and exclusivity.
        </motion.p>

        {/* What We Do */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-[#b08955] mb-3 font-serif">
            What We Do
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-gray-800 text-lg font-medium">
            {[
              "Exquisite gemstone table tops",
              "Premium marble & stone decor",
              "Bespoke luxury interior solutions",
              "Pan-India delivery & service",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="text-[#b08955] text-xl">⦿</span> {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Why Choose */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-[#b08955] mb-3 font-serif">
            Why Choose Aurum Stones?
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-gray-800 text-lg font-medium">
            {[
              "Crafting luxury since 2017",
              "Exclusive, one-of-a-kind designs",
              "Personalized luxury experience",
              "Trusted by discerning clients across India",
            ].map((point, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="text-[#b08955] text-xl">★</span> {point}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-bold text-[#b08955] mb-3 font-serif">
            Contact & Location
          </h2>
          <div className="text-lg text-gray-700 space-y-1 font-medium">
            <div>
              <span className="font-semibold text-[#b08955]">Address:</span>{" "}
              xxxxxxxxx, xxxxxxxxx, Delhi
            </div>
            <div>
              <span className="font-semibold text-[#b08955]">Email:</span>{" "}
              info@aurumstones.com
            </div>
            <div>
              <span className="font-semibold text-[#b08955]">Phone:</span>{" "}
              +91-XXXXXXXXXX
            </div>
          </div>
        </motion.div>

        {/* Final Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-block bg-[#b08955] text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg tracking-wide font-serif">
            Luxury in every stone, since 2017
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
