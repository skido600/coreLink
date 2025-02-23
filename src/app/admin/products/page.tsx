"use client";
import React, { useEffect, useState } from "react";
import { collection, query, getDocs, doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/app/firebase/ultil";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
interface ProductData {
  id: string;
  name: string;
  price: number;
  discount: number;
  imageUrl: string;
  userId: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(
    null
  );
  const [form, setForm] = useState({
    name: "",
    price: "",
    discount: "",
    imageUrl: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    async function fetchProducts() {
      try {
        // Query all products from Firestore. You might want to add additional filters or ordering.
        const q = query(collection(firestore, "products"));
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
  }, []);

  // Called when the admin clicks the "Edit" button
  const handleEdit = (product: ProductData) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price.toString(),
      discount: product.discount.toString(),
      imageUrl: product.imageUrl,
    });
  };

  // Update product details in Firestore and update local state
  const handleUpdate = async () => {
    if (!editingProduct) return;
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
      toast({
        description: "Error updating product",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Products</h1>
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={100}
                height={100}
                style={{ objectFit: "cover" }}
              />
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p>Price: ${product.price}</p>
              <p>Discount: {product.discount}%</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
                {/* <button
                  onClick={() => shareLink(product)}
                  className="px-2 py-1 bg-green-500 text-white rounded"
                >
                  Share Link
                </button> */}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
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
            {/* <input
              type="text"
              placeholder="Image URL"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className="border p-2 mb-2 w-full"
            /> */}
            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Update
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
