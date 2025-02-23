// // //* eslint-disable */
// // import { NextResponse } from "next/server";
// // import { firestore, storage } from "../../firebase/ultil";
// // import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// // import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// // import { v4 as uuidv4 } from "uuid";

// // interface ProductData {
// //   id: string;
// //   name: string;
// //   price: number;
// //   discount: number | null;
// //   category: string;
// //   imageUrl: string;
// //   createdAt: ReturnType<typeof serverTimestamp>;
// // }
// // // interface UploadedProduct extends ProductData {
// // //   id: string;
// // // }
// // export async function POST(request: Request) {
// //   try {
// //     const formData = await request.formData();
// //     const uploadedProducts: ProductData[] = [];
// //     let index = 0;

// //     // Process each product from the form data
// //     while (true) {
// //       const productPrefix = `products[${index}]`;

// //       // Get required fields
// //       const price = formData.get(`${productPrefix}[price]`);
// //       const category = formData.get(`${productPrefix}[category]`);
// //       const imageFile = formData.get(`${productPrefix}[image]`) as File;
// //       const discount = formData.get(`${productPrefix}[discount]`);

// //       // Validate required fields
// //       if (!price || !category || !imageFile) {
// //         return NextResponse.json(
// //           { error: `Product ${index + 1}: Missing required fields` },
// //           { status: 400 }
// //         );
// //       }

// //       // Upload the image to Firebase Storage and get its download URL
// //       const imageUrl = await uploadToFirebaseStorage(imageFile);

// //       // Prepare product data object with server timestamp
// //       const productData = {
// //         name: name.toString(),
// //         price: parseFloat(price.toString()),
// //         discount: discount ? parseFloat(discount.toString()) : null,
// //         category: category.toString(),
// //         imageUrl,
// //         createdAt: serverTimestamp(),
// //       };

// //       // Save the product details to Firestore in the "products" collection
// //       const docRef = await addDoc(
// //         collection(firestore, "products"),
// //         productData
// //       );

// //       uploadedProducts.push({
// //         id: docRef.id,
// //         ...productData,
// //       });

// //       index++;
// //     }

// //     return NextResponse.json({
// //       success: true,
// //       message: `${uploadedProducts.length} product(s) uploaded successfully`,
// //       products: uploadedProducts,
// //     });
// //   } catch (error) {
// //     console.error("Upload error:", error);
// //     return NextResponse.json(
// //       { error: "Failed to process product upload" },
// //       { status: 500 }
// //     );
// //   }
// // }

// // // Helper function to upload an image to Firebase Storage
// // async function uploadToFirebaseStorage(file: File): Promise<string> {
// //   // Create a unique filename to avoid collisions
// //   const uniqueFilename = `${uuidv4()}-${file.name.replace(/\s/g, "_")}`;
// //   const storageRef = ref(storage, `products/${uniqueFilename}`);

// //   // Upload the file (as a Blob) to the storage reference
// //   await uploadBytes(storageRef, file);

// //   // Retrieve the download URL for the uploaded file
// //   const downloadUrl = await getDownloadURL(storageRef);
// //   return downloadUrl;
// // }

// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   try {
//     // Parse the FormData from the request
//     const formData = await request.formData();

//     // Extract individual fields from FormData
//     const name = formData.get("name") as string;
//     const price = formData.get("price") as string;
//     const category = formData.get("category") as string;
//     const discount = formData.get("discount") as string;
//     const image = formData.get("image") as File | null;

//     // Log the extracted data
//     console.log({ name, price, category, discount, image });

//     // Return a success response
//     return NextResponse.json(
//       {
//         message: "Data received successfully",
//         data: { name, price, category, discount, image },
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error processing request:", error);

//     // Return an error response
//     return NextResponse.json(
//       {
//         message: "Failed to process request",
//         error: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 }
//     );
//   }
// }
