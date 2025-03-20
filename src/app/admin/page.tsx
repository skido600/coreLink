"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { MdDeleteForever } from "react-icons/md";
import { firestore } from "../../firebase/ultil";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
// import { useUserUid } from "@/context/useUserUid";

import { TbCurrencyNaira } from "react-icons/tb";
import { deleteDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { formatCurrency } from "@/helper/formatCurrency";
import { useUserUid } from "@/context/useUserUid";

interface ProductData {
  id: string;
  name: string;
  price: number;
  discount: number;
  imageUrl: string;
  userId: string;
}

export default function AdminProductsPage() {
  // const [userUid, setUserUid] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(
    null
  );

  const [form, setForm] = useState({
    name: "",
    price: "",
    discount: "",
    imageUrl: "",
  });
  const userUid = useUserUid();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchProducts() {
      if (!userUid) return;
      try {
        const q = query(
          collection(firestore, "products"),
          where("userId", "==", userUid)
        );
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ProductData[];

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [userUid]);

  // Handle edit action
  const handleEdit = (product: ProductData) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price.toString(),
      discount: product.discount.toString(),
      imageUrl: product.imageUrl,
    });
  };

  // Update Firestore document
  const handleUpdate = async () => {
    if (!editingProduct) return;
    setUpdating(true);
    try {
      const productRef = doc(firestore, "products", editingProduct.id);
      await updateDoc(productRef, {
        name: form.name,
        price: parseFloat(form.price),
        discount: parseFloat(form.discount),
        imageUrl: form.imageUrl,
      });

      toast({
        title: "Updated",
        description: "Product updated successfully",
        variant: "successful",
      });

      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: form.name,
                price: parseFloat(form.price),
                discount: parseFloat(form.discount),
                imageUrl: form.imageUrl,
              }
            : p
        )
      );

      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
      toast({ description: "Error updating product", variant: "destructive" });
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = (product: ProductData) => {
    Swal.fire({
      title: "Delete Product",
      text: "Are you sure you want to permanently delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(firestore, "products", product.id));
          Swal.fire("Deleted!", "Product deleted successfully.", "success");
          setProducts((prev) => prev.filter((p) => p.id !== product.id));
        } catch (error) {
          console.error("Error deleting product:", error);
          Swal.fire("Error", "Failed to delete product.", "error");
        }
      } else {
        Swal.fire("Cancelled", "Product deletion cancelled", "info");
      }
    });
  };

  return (
    <div className="container mx-auto px-2">
      <h1 className="text-2xl font-bold mb-4 font-Ibm">Admin Products</h1>

      {loading ? (
        <p className="font-meta">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="font-inter ">No products found or check your internet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border px-3 py-2  rounded shadow">
              <div className="relative h-48 w-70 mb-4">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="rounded-sm"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <h2 className="text-xl font-bold font-inter">{product.name}</h2>
              <p className="font-inter flex items-center">
                Price: <TbCurrencyNaira />
                {formatCurrency(product.price)}
              </p>
              <p className="font-inter flex items-center">
                Discount: <TbCurrencyNaira /> {formatCurrency(product.discount)}
              </p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleEdit(product)}
                  className="px-2 py-1 bg-gradient-to-r from-[#6857F6] to-[#A549E2]  text-white rounded mt-2 font-inter"
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(product)}>
                  <MdDeleteForever className="text-red-500" size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 p-4 bg-[#06141799] backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 font-Ibm">Edit Product</h2>
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="number"
              placeholder="Discount"
              value={form.discount}
              onChange={(e) => setForm({ ...form, discount: e.target.value })}
              className="border p-2 mb-2 w-full"
            />

            <div className="flex gap-2">
              <button
                disabled={updating}
                onClick={handleUpdate}
                className="px-4 py-2 bg-gradient-to-r from-[#6857F6] to-[#A549E2] text-white rounded"
              >
                {updating ? "updating..." : "Update"}
              </button>
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
