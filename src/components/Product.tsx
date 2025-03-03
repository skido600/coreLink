/* eslint-disable */
import React from "react";
import Image from "next/image";
export interface ProductType {
  id: string;
  name: string;
  price: number;
  discount: number;
  imageUrl: string;
  category?: string;
}
import { TbCurrencyNaira } from "react-icons/tb";
import { formatCurrency } from "@/helper/formatCurrency";
interface ProductProps {
  product: ProductType;
  className?: string;
}

export default function Product({ product, className }: ProductProps) {
  const discountedPrice =
    product.price - (product.price * product.discount) / 100;

  return (
    <div className={className}>
      <div className="relative h-48 w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2">
          <p className="text-xl font-bold flex items-center text-gray-900">
            <TbCurrencyNaira />
            {formatCurrency(product.price)}
          </p>

          <sup className="text-[10px] text-gray-500 line-through">
            ${product.discount}
          </sup>
          {/* <span className="text-sm text-green-600 ml-2"></span> */}
        </div>

        {product.category && (
          <div className="mt-2">
            <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-sm">
              {product.category}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
