"use client";
import React from "react";
import Image from "next/image";
// import { FaTrash, FaEdit } from "react-icons/fa";
interface ProductProps {
  product: {
    id?: string;
    name: string;
    price: number;
    discount: number;
    imageUrl: string;
  };
}
const Product: React.FC<ProductProps> = ({ product }) => {
  const discountedPrice =
    product.price - (product.price * product.discount) / 100;

  return (
    <section className="relative w-52 bg-white shadow-lg overflow-hidden">
      {/* Product Image with Overlay Icons */}
      <div className="relative h-44 w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h1 className="text-lg font-semibold text-gray-900">{product.name}</h1>
        <div className="flex items-center mt-2 space-x-2">
          <span className="text-xl font-bold text-gray-900">
            ${discountedPrice.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500 line-through">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-red-600 bg-red-100 text-[10px] p-1 rounded-full">
            {product.discount}% OFF
          </span>
        </div>
      </div>
    </section>
  );
};

export default Product;
