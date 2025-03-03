import Image from "next/image";
import React from "react";
import Link from "next/link";
function HomeU() {
  return (
    <>
      <main className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
        <section className="w-full max-w-md p-8 space-y-8">
          {/* Logo Section */}
          <div className="flex justify-center">
            <Image
              src="/svg/bro.svg"
              width={240}
              height={240}
              alt="CoreLink Platform"
              className="mx-auto"
            />
          </div>

          {/* Content Section */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-800 text-center">
              Welcome to CoreLink
            </h1>
            <p className="text-gray-600 text-center leading-relaxed">
              CoreLink is a centralized platform for seamless collaboration,
              real-time updates, and secure task management between admins,
              workers, and clients.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link href="/login">
              <button className="w-full bg-[#0B001A]  text-white font-semibold py-3 rounded-lg transition-all duration-300">
                Login
              </button>
            </Link>

            <Link href="/signup">
              <button className="w-full mt-4 border-2 border-[#0B001A]  text-gray-800 font-semibold py-3 rounded-lg transition-all duration-300">
                Register
              </button>{" "}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default HomeU;
