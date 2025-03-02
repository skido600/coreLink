"use client";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/firebase/ultil";
import { useRouter } from "next/navigation";

export function useLogin() {
  interface Datas {
    email: string;
    password: string;
  }
  const { toast } = useToast();
  const router = useRouter();

  interface Datas {
    email: string;
    password: string;
  }

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<Datas>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { email, password } = details;

    if (!email || !password) {
      toast({
        description: "All fields are required",
        variant: "destructive",
      });
      setError("All fields are required.");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      setError("Please enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      toast({
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      setError("Password must be at least 6 characters long.");
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        details.email,
        details.password
      );
      const user = userCredential.user;
      if (!user.emailVerified) {
        setError("Go to your email and verify befor login.");
        toast({
          description: "Go to your email and verify befor login.",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Success!",
        description: `welcome ${details.email}`,
        variant: "successful",
      });

      setDetails({ email: "", password: "" });

      router.push("/admin");
    } catch (error) {
      toast({
        description: `${error}`,
        variant: "destructive",
      });
      setError(`${error}`);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    details,
    loading,
    error,
    // termsChecked,
    showPassword,
    handleChange,
    handleSubmit,
    // handleCheckboxChange,
    togglePasswordVisibility,
  };
}
