"use client";
import Image from "next/image";

const getImageUrl = (url) => {
  if (!url) return "/placeholder.jpg";
  if (url.startsWith("http")) return url;
  return `${process.env.NEXT_PUBLIC_API_URL}/${url
    .replace(/\\/g, "/")
    .replace(/^\/?/, "")}`;
};

const ProductCard = ({ title, imageUrl, description, price }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-100">
      <div className="relative w-full h-64">
        <Image
          src={getImageUrl(imageUrl)}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover rounded-t-2xl"
          priority
        />
      </div>

      <div className="p-5">
        <h2 className="text-xl font-['Playfair_Display'] text-gray-900 mb-2">
          {title}
        </h2>

        <p className="text-sm text-gray-700 font-['Inter'] line-clamp-2 mb-3">
          {description}
        </p>

        {price && (
          <p className="text-lg font-semibold text-[#d4af37] font-['Inter']">
            ₹{price}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
