/* eslint-disable */
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { ref, set, serverTimestamp } from "firebase/database";
import { auth, db } from "../firebase/ultil";
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

export function useSignup() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [termsChecked, setTermsChecked] = useState<boolean>(false);
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
    if (!termsChecked) {
      toast({
        description:
          "You must agree to the Terms of Service and Privacy Policy.",
        variant: "destructive",
      });
      setError("You must agree to the Terms of Service and Privacy Policy.");
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
        console.log("User:", user);
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

        // Reset
        setDetails({ name: "", email: "", password: "" });
        setTermsChecked(false);
      } catch (error: any) {
        console.error(error);
        setError(
          errorMap[error.code] ||
            "Error signing up. Check your internet connection."
        );
        toast({
          description:
            errorMap[error.code] || "Error signing up. Try again later.",
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

  const handleCheckboxChange = () => {
    setTermsChecked((prev) => !prev);
  };

  return {
    details,
    error,
    loading,
    showPassword,
    termsChecked,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
    handleCheckboxChange,
  };
}
