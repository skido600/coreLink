import { Metadata } from "next";
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";
import Topba from "@/components/Topba";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin control panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[] flex flex-col md:flex-row">
        <div className="fixed md:relative left-0 top-0 h-screen z-50">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 md:ml-64">
          {" "}
          {/* Topbar with mobile adjustments */}
          <div className="sticky top-0 z-40 bg-[#FBFBFB] border-[#E5E5E5]   border-b  shadow-sm md:shadow-none">
            <div className="px-4 md:px-6 py-3">
              <Topba />
            </div>
          </div>
          {/* Page Content with mobile padding */}
          <main className="p-4 md:p-6 ">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
