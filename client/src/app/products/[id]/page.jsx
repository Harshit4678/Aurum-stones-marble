"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import RelatedProducts from "@/components/RelatedProducts";
import Link from "next/link";
import ProductInquiryModal from "@/components/ProductInquiryModal";

const ProductDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, [id]);

  const fetchProductDetails = async (productId) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`
      );
      setProduct(res.data);
    } catch (err) {
      console.error("Failed to fetch product details", err);
    }
  };

  if (!product)
    return <div className="p-10 text-center text-gray-600">Loading...</div>;

  const getImageUrl = (url) => {
    if (!url) return "/placeholder.jpg";
    if (url.startsWith("http")) return url;
    return `${process.env.NEXT_PUBLIC_API_URL}/${url
      .replace(/\\/g, "/")
      .replace(/^\/?/, "")}`;
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* Image Carousel */}
        <div>
          <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-md">
            <Image
              src={getImageUrl(product.images[currentImg])}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex gap-2 mt-4 flex-wrap">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImg(idx)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                  idx === currentImg
                    ? "border-[#d4af37] scale-105"
                    : "border-gray-300"
                }`}
              >
                <img
                  src={getImageUrl(img)}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="text-gray-800">
          <h1 className="text-4xl font-['Playfair_Display'] font-semibold mb-2">
            {product.name}
          </h1>
          <p className="text-gray-600 font-['Inter'] mb-1">
            <span className="font-medium">Type:</span>{" "}
            {product.type?.name || product.type}
          </p>

          <p className="text-2xl font-bold text-[#d4af37] mt-2 font-['Inter']">
            ₹{product.price}
            {product.offer && (
              <span className="text-green-600 text-base ml-2 font-medium">
                ({product.offer} OFF)
              </span>
            )}
          </p>

          <p className="mt-6 text-gray-700 font-['Inter'] leading-relaxed text-justify">
            {product.description}
          </p>

          <button
            className="mt-8 bg-black text-white px-8 py-3 rounded-full text-lg tracking-wide hover:bg-gray-800 transition-all"
            onClick={() => setModalOpen(true)}
          >
            Get Quotation
          </button>
          <ProductInquiryModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            productName={product.name}
            productPrice={product.price}
            productImage={getImageUrl(product.images[0])}
          />
        </div>
      </div>

      {/* Related Products Section */}
      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Related Products
        </h2>
        <RelatedProducts
          type={product.type?._id || product.type}
          currentId={product._id}
        />
      </div>
    </div>
  );
};

export default ProductDetailPage;
