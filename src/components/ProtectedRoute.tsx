// "use client";
// import { useRouter } from "next/navigation";
// import { useAuth } from "../context/AuthContext";
// // import { useEffect } from "react";
// // import Loader_2 from "@/helper/Loader_2";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// export default function ProtectedRoute({ children }: ProtectedRouteProps) {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   if (loading) {
//     return <p>loading....</p>;
//   }

//   if (!user) {
//     return router.push("/");
//   }

//   // useEffect(() => {
//   //   if (!loading && !user) {
//   //     router.push("/");
//   //   }
//   // }, [user, loading, router]);

//   // if (loading) {
//   //   // return <Loader_2 />;
//   //   return <div>jjj/...</div>;
//   // }

//   return user ? <>{children}</> : null;
// }
