"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Brand Name */}
        <Link href="/" className="text-center sm:text-left">
          <h1
            className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-600 text-transparent bg-clip-text animate-title"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            AURUM STONES
          </h1>
          <p className="text-sm italic text-gray-500">
            Timeless Luxury in Marble
          </p>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden sm:flex space-x-6 text-base font-medium text-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`hover:text-blue-700 transition duration-200 ${
                pathname === link.path ? "text-blue-600 font-semibold" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-gray-700 focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu with Animation */}
      <div
        ref={menuRef}
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center py-4 space-y-3 bg-white border-t border-gray-200 shadow-md">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setMenuOpen(false)} // close menu on link click
              className={`hover:text-blue-700 transition duration-200 ${
                pathname === link.path ? "text-blue-600 font-semibold" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
