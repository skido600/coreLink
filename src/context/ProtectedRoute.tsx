/* eslint-disable */
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";
import AuthLoader from "@/helper/AuthLoader";

const ProtectedRoute = ({ children }: any) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) return <AuthLoader />;

  return user ? children : null; // Ensure content is only rendered when user is available
};

export default ProtectedRoute;
