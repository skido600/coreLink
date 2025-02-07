/* eslint-disable */
"use client";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import Link from "next/link";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { ref, set, serverTimestamp } from "firebase/database";
import { auth, db } from "../app/firebase/ultil";
import Loader from "../app/helper/Loader";
import { useToast } from "@/hooks/use-toast";
const errorMap: { [key: string]: string } = {
  "auth/invalid-email": "The email address is badly formatted.",
  "auth/email-already-in-use":
    "The email address is already in use by another account. Try using a different email or reset your password.",
  "auth/weak-password":
    "The password is too weak. Please choose a stronger password.",
  "auth/user-disabled":
    "Your account has been disabled. Please contact support for assistance.",
  "auth/operation-not-allowed":
    "Operation not allowed. Please contact support.",
  "auth/requires-recent-login":
    "This operation is sensitive and requires recent authentication. Please log in again and try.",
  "auth/account-exists-with-different-credential":
    "An account already exists with the same email address but different sign-in credentials.",
  "auth/credential-already-in-use":
    "The credential is already associated with a different user account.",
  "auth/popup-closed-by-user":
    "The popup was closed by the user before completing the sign-in.",
  "auth/popup-blocked":
    "The popup was blocked by the browser. Please allow popups and try again.",
  "auth/too-many-requests": "Too many requests. Please try again later.",
  "auth/network-request-failed":
    "Network error. Please check your internet connection.",
  "auth/user-not-found": "No user found with this email. Please sign up first.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/invalid-credential":
    "The authentication credential is invalid or has expired.",
  "auth/invalid-verification-code": "The verification code is invalid.",
  "auth/invalid-verification-id": "The verification ID is invalid.",
};

interface Datas {
  name: string;
  email: string;
  password: string;
}

function Signup() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [details, setDetails] = useState<Datas>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, password } = details;

    if (!name || !email || !password) {
      toast({
        description: "All fields are required",
        variant: "destructive",
      });
      setError("All fields are required.");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      setError("Please enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      toast({
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      setError("Password must be at least 6 characters long.");
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (validateForm()) {
      try {
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          details.email,
          details.password
        );
        const user = userCredentials.user;
        console.log("users", user);
        await sendEmailVerification(user);

        await set(ref(db, "users/" + user.uid), {
          email: details.email,
          name: details.name,
          createdAt: serverTimestamp(),
        });
        toast({
          title: "Success!",
          description:
            "User created successfully. Please log in after verifying your email.",
          variant: "successful",
        });
      } catch (error: any) {
        console.error(error);
        setError(
          errorMap[error.code] ||
            "Error signing up. Check your internet connection."
        );
        toast({
          description: errorMap[error.code],
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

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
