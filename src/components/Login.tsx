"use client";
import Link from "next/link";
import Loader from "@/helper/Loader";
import { useLogin } from "@/hooks/useLogin";
import GoggleProvider from "./GoggleProvider";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
function Login() {
  const {
    details,
    loading,
    error,

    showPassword,
    handleChange,
    handleSubmit,

    togglePasswordVisibility,
  } = useLogin();
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
            Welcome Back
          </h1>
        </div>
        <form className="space-y-6">
          {error && (
            <p className="text-red-500 text-sm font-inter text-center">
              {error}
            </p>
          )}
          <div className="relative">
            <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#000235]" />
            <input
              type="email"
              name="email"
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
              name="password"
              value={details.password}
              onChange={handleChange}
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

          <div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full bg-[#0B001A] text-white py-3 rounded-lg hover:bg-[#2d3748] transition-colors font-medium"
              disabled={loading}
            >
              {loading ? <Loader /> : "Login"}
            </button>
            {/* </div> */}
          </div>

          <div className="mt-2 mb-8">
            <Link href="/signup">
              <p className="font-Ibm text-[#0B001A] text-[15px]">
                Didn&#39; t have an account?{" "}
                <span className="bg-gradient-to-r from-[#6857F6] to-[#A549E2] bg-clip-text text-transparent">
                  Signup
                </span>
              </p>
            </Link>
          </div>
          <div className="relative text-center my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <span className="relative bg-white px-4 text-gray-500">
              Or continue with
            </span>
          </div>

          <GoggleProvider />
        </form>
      </section>
    </main>
  );
}

export default Login;
