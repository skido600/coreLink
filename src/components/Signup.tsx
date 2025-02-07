"use client";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

import Loader from "../app/helper/Loader";
import { useSignup } from "@/hooks/useSignup";

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
    <main className="bg-[#181a1f] min-h-screen md:px-4 py-5 grid md:grid-cols-2 relative">
      <section className="bg-[#03346E] py-2 px-4 mx-4 md:py-4 relative rounded-lg">
        <h1 className="text-3xl text-white font-inter font-bold">
          Core
          <span className="bg-gradient-to-r from-[#6857F6] to-[#A549E2] bg-clip-text text-transparent">
            Link
          </span>
        </h1>
        <article className="flex flex-col justify-center gap-y-4 mt-12">
          <div>
            <p className="bg-gradient-to-r text-[2rem] font-inter from-[#6857F6] to-[#A549E2] bg-clip-text text-transparent">
              Create an Account
            </p>
            <div className="mt-2">
              <Link href="/login">
                <p className="font-Ibm text-white">
                  Already have an account?{" "}
                  <span className="bg-gradient-to-r from-[#6857F6] to-[#A549E2] bg-clip-text text-transparent">
                    Log In
                  </span>
                </p>
              </Link>
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm font-inter text-center">
              {error}
            </p>
          )}
          <div className="mt-2 flex flex-col gap-8">
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={details.name}
              onChange={handleChange}
              className="border border-[#CBCBCB] w-full text-white px-4 py-2 rounded-full bg-transparent outline-none font-inter placeholder:text-white"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={details.email}
              onChange={handleChange}
              className="border border-[#CBCBCB] w-full text-white px-4 py-2 rounded-full bg-transparent outline-none font-inter placeholder:text-white"
            />
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={details.password}
                onChange={handleChange}
                className="border border-[#CBCBCB] w-full text-white px-4 py-2 rounded-full bg-transparent outline-none font-inter placeholder:text-white"
              />
              <div
                className="absolute top-3 right-2 text-[#CBCBCB] cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="p-2 w-full text-center text-white font-inter bg-[#01162A] rounded-full"
            >
              {loading ? <Loader /> : "Sign Up"}
            </button>
          </div>
        </article>
        <menu className="mt-8 flex gap-2 items-center">
          <input
            type="checkbox"
            className="w-4 h-4"
            checked={termsChecked}
            onChange={handleCheckboxChange}
          />
          <label className="font-Ibm text-white text-[12px]">
            I agree to the Terms of Service and Privacy Policy
          </label>
        </menu>
        <div className="mt-2 flex items-center px-2 bg-gradient-to-r from-[#6857F6] to-[#A549E2] bg-clip-text text-transparent">
          <hr className="border-[#ec9393] flex-grow" /> or Register with{" "}
          <hr className="border-[#CBCBCB] flex-grow" />
        </div>
        <div className="mt-2">
          <p className="font-inter flex items-center gap-3 border border-[#CBCBCB] rounded-full justify-center py-3 text-white">
            <Image
              src="/svg/Facebook Icon.svg"
              alt="Description"
              width={20}
              height={20}
            />
            Facebook
          </p>
        </div>
        <div className="mt-2">
          <p className="font-inter flex items-center gap-3 border border-[#CBCBCB] rounded-full justify-center py-3 text-white">
            <Image
              src="/svg/Google Icon.svg"
              alt="Description"
              width={20}
              height={20}
            />
            Google
          </p>
        </div>
      </section>
      <article className="relative mt-12">
        <p className="md:absolute bottom-0 px-4 text-[13px] text-white font-inter">
          &quot;CoreLink is a collaboration and productivity platform that
          empowers teams to work smarter, not harder. Whether you’re managing a
          project, sharing updates, or communicating with your team, CoreLink
          provides the tools you need to stay connected and productive.!&quot;
        </p>
      </article>
    </main>
  );
}

export default Signup;
