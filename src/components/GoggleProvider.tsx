/* eslint-disable */
import React, { useState } from "react";

import Image from "next/image";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase/ultil";
import { useToast } from "@/hooks/use-toast";

import { useRouter } from "next/navigation";

import GoggleLoader from "@/helper/GoggleLoader";
function GoggleProvider() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      //   const user = result.user;
      //   console.log("Google sign-in successful:", user);
      toast({
        title: "Success!",
        description:
          "User created successfully. Please log in after verifying your email.",
        variant: "successful",
      });
      setTimeout(() => {
        router.push("/admin");
      }, 300);
    } catch (error) {
      toast({
        description: `Error signing in:  ${error as any}`,
        variant: "destructive",
      });
      console.error("Google sign-in error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main>
      {loading ? (
        <GoggleLoader />
      ) : (
        <div className="mt-2 cursor-pointer" onClick={handleGoogleSignIn}>
          <p className="font-inter flex items-center gap-3 border border-[#CBCBCB] rounded-full justify-center py-3 text-white">
            <Image
              src="/svg/Google Icon.svg"
              alt="Description"
              width={20}
              height={20}
            />
            Google
          </p>
        </div>
      )}
    </main>
  );
}

export default GoggleProvider;
