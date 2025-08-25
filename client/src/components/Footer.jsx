import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f4] text-[#1a1a1a] pt-12 pb-6 mt-20 font-['Inter'] text-base sm:text-lg">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-semibold text-[#d4af37] mb-4 font-['Playfair_Display']">
            Aurum Stones
          </h2>
          <p className="text-base sm:text-sm text-gray-700 leading-relaxed">
            Discover timeless luxury in premium marble and gemstone decor.
            Designed with elegance — crafted to perfection for every space.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold text-[#d4af37] mb-4 font-['Playfair_Display']">
            Quick Links
          </h2>
          <ul className="space-y-2 text-base sm:text-sm text-gray-700">
            <li>
              <Link href="/" className="hover:text-[#d4af37] transition">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="hover:text-[#d4af37] transition"
              >
                Products
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-[#d4af37] transition">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#d4af37] transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#d4af37] transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold text-[#d4af37] mb-4 font-['Playfair_Display']">
            Contact Us
          </h2>
          <p className="text-base sm:text-sm text-gray-700">
            📍 Aurum Stones, India
          </p>
          <p className="text-base sm:text-sm text-gray-700 mt-1">
            📞 +91-9999999999
          </p>
          <p className="text-base sm:text-sm text-gray-700 mt-1">
            📧 contact@aurumstones.com
          </p>
        </div>

        {/* Social Icons */}
        <div>
          <h2 className="text-xl font-semibold text-[#d4af37] mb-4 font-['Playfair_Display']">
            Follow Us
          </h2>
          <div className="flex space-x-4 mt-2 text-2xl sm:text-xl">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1a1a1a] hover:text-pink-600 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1a1a1a] hover:text-blue-600 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1a1a1a] hover:text-sky-500 transition"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="border-t border-gray-300 mt-10 pt-4 text-center text-base sm:text-sm text-gray-600">
        &copy; {2025} Aurum Stones (Demo Project). All rights reserved.
      </div>
    </footer>
  );
}
