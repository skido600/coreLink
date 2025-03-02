"use client";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loader from "@/helper/Loader";
import { useLogin } from "@/hooks/useLogin";
import GoggleProvider from "./GoggleProvider";
function Login() {
  const {
    details,
    loading,
    error,
    // termsChecked,
    showPassword,
    handleChange,
    handleSubmit,
    // handleCheckboxChange,
    togglePasswordVisibility,
  } = useLogin();
  return (
    <main className="bg-[#181a1f] min-h-screen md:px-4 py-[7rem] lg:py-4 grid md:grid-cols-2 relative">
      <section className="bg-[#03346E] py-2 px-4 mx-4 md:py-4 relative rounded-lg">
        <h1 className="text-3xl text-white font-inter font-bold">
          Core
          <span className="bg-gradient-to-r from-[#6857F6] to-[#A549E2] bg-clip-text text-transparent">
            Link
          </span>
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-2 mt-12">
          <p className="bg-gradient-to-r text-[2rem] font-inter from-[#6857F6] to-[#A549E2] bg-clip-text text-transparent">
            Login in
          </p>

          <div className="mt-2 mb-8">
            <Link href="/signup">
              <p className="font-Ibm text-white text-[15px]">
                Didn&quot; t have an account?{" "}
                <span className="bg-gradient-to-r from-[#6857F6] to-[#A549E2] bg-clip-text text-transparent">
                  Signup
                </span>
              </p>
            </Link>
          </div>

          {error && (
            <p className="text-red-500 text-sm font-inter text-center">
              {error}
            </p>
          )}

          <div className="mt-2 flex flex-col gap-8">
            <div>
              <input
                type="email"
                name="email"
                value={details.email}
                onChange={handleChange}
                placeholder="Email"
                className="border border-[#CBCBCB] w-full text-white px-4 py-2 rounded-full bg-transparent outline-none font-inter placeholder:text-white"
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={details.password}
                onChange={handleChange}
                placeholder="Password"
                className="border border-[#CBCBCB] w-full text-white px-4 py-2 rounded-full bg-transparent outline-none font-inter placeholder:text-white"
              />
              <div
                className="absolute top-3 right-2 text-[#CBCBCB] cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="p-2 w-full text-center text-white font-inter bg-[#01162A] rounded-full"
                disabled={loading}
              >
                {loading ? <Loader /> : "Login"}
              </button>
            </div>
          </div>

          {/* <menu className="mt-8 flex gap-2 items-center">
            <input
              type="checkbox"
              checked={termsChecked}
              onChange={handleCheckboxChange}
              className="w-4 h-4"
            />
            <label className="font-Ibm text-white text-[12px]">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </menu> */}
          <GoggleProvider />
        </form>
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

export default Login;
