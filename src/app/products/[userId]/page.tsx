/* eslint-disable */
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/ultil";
import Product from "@/components/Product";
import CustomerLoader from "@/helper/CustomerLoader";
export default function ProductsPage() {
  const params = useParams();
  const { userId } = params;
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const q = query(
          collection(firestore, "products"),
          where("userId", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    if (userId) {
      fetchProducts();
    }
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Our Products
          </h1>
          <p className="text-gray-600">
            Explore our curated collection of premium items
          </p>
        </div>

        {loading ? (
          <CustomerLoader />
        ) : products.length === 0 ? (
          <div className="max-w-2xl mx-auto bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 text-blue-700">
              <span className="text-lg">ℹ️</span>
              <h3 className="font-semibold">No products found</h3>
            </div>
            <p className="text-gray-600 mt-2">
              This store currently has no available products. Please check back
              later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Product
                key={product.id}
                product={product}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
