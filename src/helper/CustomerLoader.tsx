// components/CustomerLoader.tsx
import React from "react";

export default function CustomerLoader() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="h-48 w-full bg-gray-200 animate-pulse" />
          <div className="p-4">
            <div className="h-6 w-3/4 mb-2 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
