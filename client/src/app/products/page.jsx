"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import axios from "axios";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products`
    );
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen px-6 py-14 bg-[#f5f5f4]">
      <h1 className="text-4xl font-['Playfair_Display'] text-center text-[#d4af37] mb-10">
        Discover Our Luxury Collection
      </h1>

      <p className="max-w-2xl mx-auto text-center text-gray-700 text-sm font-light mb-12 font-['Inter']">
        Curated masterpieces crafted with the finest marble, onyx, and
        semi-precious stones. Explore timeless designs that redefine elegance.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {products.map((product) => (
          <Link key={product._id} href={`/products/${product._id}`}>
            <div className="transform transition hover:scale-105 hover:shadow-xl duration-300 bg-white rounded-2xl overflow-hidden">
              <ProductCard
                title={product.name}
                imageUrl={product.images[0]}
                description={product.description}
                price={product.price}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
