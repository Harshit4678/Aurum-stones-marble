"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const videoRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(0);

  const videos = ["/Herov1.mp4", "/Herov2.mp4"];

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.playbackRate = 2; // Fast forward 2x speed
      video.play();

      const handleEnded = () => {
        const nextVideo = (currentVideo + 1) % videos.length;
        setCurrentVideo(nextVideo);
      };

      video.addEventListener("ended", handleEnded);

      return () => {
        video.removeEventListener("ended", handleEnded);
      };
    }
  }, [currentVideo]);

  return (
    <section className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center text-white">
      {/* 🎥 Background Video with Faded Zoom */}
      <motion.video
        ref={videoRef}
        key={videos[currentVideo]} // Important: forces re-render when video changes
        autoPlay
        muted
        playsInline
        loop={false} // ⛔️ manual loop logic
        initial={{ scale: 1 }}
        animate={{ scale: 1.08 }}
        transition={{ duration: 10, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-full h-full object-cover opacity-100"
      >
        <source src={videos[currentVideo]} type="video/mp4" />
        Your browser does not support the video tag.
      </motion.video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10" />

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 text-center px-6 max-w-4xl"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-xl leading-tight font-[Playfair]">
          Discover Timeless
          <br />
          <span className="text-amber-400">Luxury Interior Decores</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-white/90 font-medium drop-shadow-md">
          Handpicked elegance, handcrafted perfection — elevate your living with
          Marquise.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push("/products")}
          className="mt-8 inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold tracking-wide px-6 py-3 rounded-full shadow-lg transition duration-300 hover:animate-bounce"
        >
          Explore Products
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <span className="text-3xl text-white animate-bounce">⬇</span>
      </motion.div>
    </section>
  );
}
