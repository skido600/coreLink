"use client";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useToast } from "@/hooks/use-toast";
import { collection, addDoc } from "firebase/firestore";
// import { firestore } from "@/app/firebase/ultil";

import { getAuth } from "firebase/auth";
import { firestore } from "@/firebase/ultil";

const Dashboard: React.FC = () => {
  const { toast } = useToast();
  const [loading, setloading] = useState<boolean>(false);
  const [products, setProducts] = useState([
    { name: "", price: "", discount: "", category: "", image: null },
  ]);

  const [categories, setCategories] = useState<string[]>([
    "Electronics",
    "Fashion",
    "Books",
    "Clothes",
  ]);

  const [newCategory, setNewCategory] = useState<string>("");

  const handleProductChange = (
    index: number,
    field: string,
    value: string | File | null
  ) => {
    const updatedProducts = [...products];

    if (field === "price" && typeof value === "string") {
      const numericValue = value.replace(/[^0-9,]/g, "");
      updatedProducts[index] = {
        ...updatedProducts[index],
        [field]: numericValue,
      };
    } else {
      updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    }

    setProducts(updatedProducts);
  };

  const handleAddProduct = () => {
    setProducts([
      ...products,
      { name: "", price: "", discount: "", category: "", image: null },
    ]);
  };

  const handleRemoveProduct = (index: number) => {
    if (products.length > 1) {
      setProducts(products.filter((_, i) => i !== index));
    }
  };

  // Remove category by index
  const handleRemoveCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };
  const handleUpload = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) {
      toast({
        description: "User not authenticated.",
        variant: "destructive",
      });
      return;
    }
    // Validate all products
    for (let i = 0; i < products.length; i++) {
      const { name, price, category, image } = products[i];
      if (!name || !price || !category || !image) {
        toast({
          description: `Error: Product ${i + 1} is missing required fields.`,
          variant: "destructive",
        });
        return;
      }
    }

    setloading(true);
    try {
      for (const product of products) {
        if (!product.image) {
          throw new Error("Image is required for all products");
        }

        // Step 1: Upload image to Cloudinary
        const cloudinaryFormData = new FormData();
        cloudinaryFormData.append("file", product.image);
        cloudinaryFormData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
        );
        cloudinaryFormData.append(
          "cloud_name",
          process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!
        );

        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, // Use environment variable
          {
            method: "POST",
            body: cloudinaryFormData,
          }
        );

        if (!cloudinaryResponse.ok) {
          throw new Error("Failed to upload image to Cloudinary");
        }

        const cloudinaryData = await cloudinaryResponse.json();
        const imageUrl = cloudinaryData.secure_url;
        console.log(cloudinaryData);

        const productData = {
          name: product.name,
          price: parseFloat(product.price.replace(/,/g, "")),
          discount: parseFloat(product.discount || "0"),
          category: product.category,
          imageUrl: imageUrl,
          userId: currentUser.uid,
        };

        await addDoc(collection(firestore, "products"), productData);
      }

      // Success message
      toast({
        title: "Success!",
        description: "All products uploaded successfully!",
        variant: "successful",
      });

      // Reset the form
      setProducts([
        { name: "", price: "", discount: "", category: "", image: null },
      ]);
    } catch (error) {
      toast({
        description: `${error}`,
        variant: "destructive",
      });
    } finally {
      setloading(false);
    }
  };
  // In your handleProductChange function, update the price handling:

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-gray-100 p-6 border-r border-gray-200 rounded-lg md:block">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <ul className="mb-4">
          {categories.map((cat, index) => (
            <li key={cat} className="mb-2 flex items-center justify-between">
              <span className="cursor-pointer font-inter">{cat}</span>
              <button
                onClick={() => handleRemoveCategory(index)}
                className="text-red-600 hover:bg-red-200 rounded-full p-1"
              >
                <IoMdClose size={20} />
              </button>
            </li>
          ))}
        </ul>
        <form onSubmit={handleAddCategory} className="mt-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Add new category"
            className="w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="mt-2 w-full py-2 px-4 font-inter rounded-md bg-[#3F4F44] text-white hover:bg-[#7F8F84] drop-shadow-sm"
          >
            Add Category
          </button>
        </form>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p- md:p-10">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r mt-3 from-[#6857F6] to-[#A549E2] bg-clip-text text-transparent font-inter">
          Add Products
        </h1>

        {/* Product Form */}
        {products.map((product, index) => (
          <div
            key={index}
            className="border p-4 mb-4 rounded-lg shadow flex items-start gap-4"
          >
            {/* Close Button */}
            {products.length > 1 && (
              <button
                onClick={() => handleRemoveProduct(index)}
                className="text-red-600 hover:bg-red-200 rounded-full p-1"
              >
                <IoMdClose size={24} />
              </button>
            )}

            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2 font-inter">
                Product {index + 1}
              </h3>

              {/* Product Name */}
              <input
                type="text"
                value={product.name}
                onChange={(e) =>
                  handleProductChange(index, "name", e.target.value)
                }
                placeholder="Product Name"
                className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-500 mb-2"
                required
              />

              {/* Image Upload */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleProductChange(
                    index,
                    "image",
                    e.target.files?.[0] || null
                  )
                }
                className="w-full p-2 border rounded-md shadow-sm mb-"
              />

              {/* Category Selection */}
              <select
                value={product.category}
                onChange={(e) =>
                  handleProductChange(index, "category", e.target.value)
                }
                className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-500 mb-2"
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {/* Price Input */}
              <input
                type="number"
                value={product.price}
                onChange={(e) => {
                  // Allow only numbers and commas
                  const value = e.target.value.replace(/[^0-9,]/g, "");
                  handleProductChange(index, "price", value);
                }}
                placeholder="Price (₦)"
                className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-500 mb-2"
                required
              />

              {/* Discount Input */}
              <input
                type="number"
                value={product.discount}
                onChange={(e) =>
                  handleProductChange(index, "discount", e.target.value)
                }
                placeholder="Discount (%)"
                className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-500"
              />
            </div>
          </div>
        ))}

        {/* Add Product Button */}
        <button
          onClick={handleAddProduct}
          className="w-full py-3 px-6 mb-4 rounded-md font-inter bg-[#3F4F44] text-white hover:bg-[#7F8F84]"
        >
          Add Another Product
        </button>

        {/* Upload All Button */}
        {products.length > 0 && (
          <button
            disabled={loading}
            onClick={handleUpload}
            className="w-full py-3 px-6 font-inter rounded-md bg-[#3A7D44] text-white"
          >
            {loading ? "uploading..." : "   Upload All Products"}
          </button>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
