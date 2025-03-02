"use client";
import Link from "next/link";
import Loader from "../helper/Loader";
import { useSignup } from "@/hooks/useSignup";
import { MdEmail } from "react-icons/md";
import GoggleProvider from "./GoggleProvider";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
function Signup() {
  const {
    details,
    error,
    loading,
    showPassword,
    termsChecked,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
    handleCheckboxChange,
  } = useSignup();

  return (
    <main className="flex justify-center items-center min-h-screen  p-4">
      <section className="w-full max-w-md bg-white rounded-xl p-4 ">
        <h1 className="text-3xl text-center mb-4 text-[#000235] font-inter font-bold">
          Core
          <span className="bg-gradient-to-r from-[#6857F6] to-[#A549E2] bg-clip-text text-transparent">
            Link
          </span>
        </h1>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create an account
          </h1>
        </div>
        <form className="space-y-6">
          {error && (
            <p className="text-red-500 text-sm font-inter text-center">
              {error}
            </p>
          )}
          <div className="mt-2 flex flex-col gap-8">
            <div className="relative">
              <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#000235]" />
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                value={details.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border-2 outline-none  border-[#000235] rounded-lg focus:outline-none focus:border-[#000235] focus:ring-1 focus:ring-[#000235] placeholder:text-[#000235] placeholder:font-Jaldi"
              />
            </div>
            <div className="relative">
              <MdEmail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#000235]" />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={details.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border-2 outline-none  border-[#000235] rounded-lg focus:outline-none focus:border-[#000235] focus:ring-1 focus:ring-[#000235] placeholder:text-[#000235] placeholder:font-Jaldi"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#000235]" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 border-2 outline-none  border-[#000235] rounded-lg focus:outline-none focus:border-[#000235] focus:ring-1 focus:ring-[#000235] placeholder:text-[#000235] placeholder:font-Jaldi"
              />
              <div
                className="absolute top-3 right-2 text-[#CBCBCB] cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FaEye className="text-[#000235]" />
                ) : (
                  <FaEyeSlash className="text-[#000235]" />
                )}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full bg-[#0B001A] text-white py-3 rounded-lg hover:bg-[#2d3748] transition-colors font-medium"
            >
              {loading ? <Loader /> : "Sign Up"}
            </button>
          </div>
        </form>
        <div className="">
          <Link href="/login">
            <p className="font-Ibm text-[#0B001A] text-[15px]">
              Already have an account?{" "}
              <span className="bg-gradient-to-r from-[#6857F6] to-[#A549E2] bg-clip-text text-transparent">
                Login
              </span>
            </p>
          </Link>
        </div>
        <menu className="mt-8 flex gap-2 items-center">
          <input
            type="checkbox"
            className="w-4 h-4"
            checked={termsChecked}
            onChange={handleCheckboxChange}
          />
          <label className="font-Ibm text-[#0B001A] text-[12px]">
            I agree to the Terms of Service and Privacy Policy
          </label>
        </menu>
        <div className="mt-2 flex items-center px-2 bg-gradient-to-r from-[#6857F6] to-[#A549E2] bg-clip-text text-transparent">
          <hr className="border-[#CBCBCB] flex-grow" />{" "}
          <p className=" bg-gradient-to-r from-[#6857F6] px-2 to-[#A549E2] bg-clip-text text-transparent">
            or register with
          </p>
          <hr className="border-[#CBCBCB] flex-grow" />
        </div>

        <GoggleProvider />
      </section>
    </main>
  );
}

export default Signup;
