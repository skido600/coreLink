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
              src="/svg/Holding the arrow-bro.svg"
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
              <button className="w-full bg-gradient-to-r from-[#92E3A9] to-[#6BCB88] hover:from-[#7ad494] hover:to-[#5ab572] text-white font-semibold py-3 rounded-lg transition-all duration-300">
                Login
              </button>
            </Link>
            <button className="w-full border-2 border-[#92E3A9] hover:border-[#6BCB88] text-gray-800 font-semibold py-3 rounded-lg transition-all duration-300">
              <Link href="/signup"> Register</Link>
            </button>{" "}
            {/* </Link> */}
          </div>
        </section>
      </main>
    </>
  );
}

export default HomeU;
