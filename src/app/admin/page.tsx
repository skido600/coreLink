import ProtectedRoute from "@/components/ProtectedRoute";

export default function admin() {
  return (
    <ProtectedRoute>
      <>
        <h1>Welcome admin</h1>
      </>
    </ProtectedRoute>
  );
}
