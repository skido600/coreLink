/* eslint-disable */
"use client";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { useUserUid } from "@/context/useUserUid";
function Page() {
  const userUid = useUserUid();
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      // Construct the product link URL
      const productLink = `${window.location.origin}/products/${userUid}`;

      // Use Clipboard API to copy text
      await navigator.clipboard.writeText(productLink);

      // Show success toast
      toast({
        title: "Success!",
        description: "Product link copied to clipboard",
        variant: "successful",
      });
    } catch (err) {
      // Show error toast
      toast({
        title: "Error",
        description: "Failed to copy link to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <main>
      <button
        onClick={copyToClipboard}
        className="bg-green-400 w-full px-4 py-2 font-inter rounded-[2px] hover:bg-green-500 transition-colors"
      >
        Copy Link
      </button>
    </main>
  );
}

export default Page;
