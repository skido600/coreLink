/* eslint-disable */
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/ultil";
import Product from "@/components/Product";

export default function ProductsPage() {
  const params = useParams();
  const { userId } = params;
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        // Create a query to fetch products where userId equals the route parameter
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products available for this user.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
