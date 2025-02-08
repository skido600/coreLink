"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import Loader_2 from "@/app/helper/Loader_2";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <Loader_2 />;
  }

  return user ? <>{children}</> : null; // Render children only if user is authenticated
}
