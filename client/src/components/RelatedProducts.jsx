"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const RelatedProducts = ({ type, currentId }) => {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products?type=${type}`
      );
      const data = await res.json();
      const filtered = data.filter((p) => p._id !== currentId); // Exclude current
      setRelated(filtered);
    };
    fetchRelated();
  }, [type, currentId]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {related.map((p) => (
        <Link key={p._id} href={`/products/${p._id}`}>
          <div className="bg-white p-3 shadow rounded hover:shadow-lg transition">
            <img
              src={p.images[0]}
              alt={p.name}
              className="w-full h-32 object-cover rounded"
            />
            <h3 className="text-sm mt-2 font-medium">{p.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RelatedProducts;
