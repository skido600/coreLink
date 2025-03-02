/* eslint-disable */
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CgMenuRight } from "react-icons/cg";
import { FiHome, FiBox, FiLink, FiX } from "react-icons/fi";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/ultil";
import { IoIosLogOut } from "react-icons/io";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
function Sidebar() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  //
  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Success!",
        description: `Logged out successfully!`,
        variant: "successful",
      });
    } catch (error: any) {
      toast({
        description: "Logout failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FiHome className="icon" />,
      path: "/admin/dashboard",
    },
    {
      name: "Products",
      icon: <FiBox className="icon" />,
      path: "/admin",
    },
    {
      name: "Shared Links",
      icon: <FiLink className="icon" />,
      path: "/admin/link",
    },
    {
      name: "Logout",
      icon: <IoIosLogOut className="icon" />,
      action: handleLogout,
    },
  ];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={handleToggle}
        className="md:hidden fixed top-1 left-2 z-50 p-2 rounded-lg"
      >
        {isOpen ? <FiX size={24} /> : <CgMenuRight size={24} />}
      </button>

      {/* Self-close overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-[#06141799] backdrop-blur-sm z-40"
          onClick={handleToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`h-screen w-64 fixed left-0 top-0 bg-[#FBFBFB] border-r border-[#E5E5E5] p-6
          transform transition-transform overflow-y-auto duration-300 ease-in-out
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 z-50`}
      >
        {/* Logo */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold">
            Core
            <span className="bg-gradient-to-r from-[#6857F6] to-[#A549E2] bg-clip-text text-transparent">
              Link
            </span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">Admin Dashboard</p>
        </div>

        {/* Menu Items */}
        <nav className="h-[50vh] md:h-auto overflow-y-auto">
          <ul>
            <div>
              <h1 className="text-gray-600 font-medium font-inter mb-4">
                Menu
              </h1>
            </div>
            {menuItems.map((item) => (
              <li key={item.name}>
                {item.path ? (
                  <Link
                    href={item.path}
                    className="flex items-center md:py-3 md:px-0 py-3 px-2 rounded-lg transition-all hover:bg-gradient-to-r from-[#6857F610] to-[#A549E210] text-gray-600"
                    onClick={handleToggle}
                  >
                    <span className="mr-3 text-xl">{item.icon}</span>
                    <span className="font-medium font-inter">{item.name}</span>
                  </Link>
                ) : (
                  <button
                    onClick={item.action}
                    className="flex items-center w-full md:py-3 md:px-0 py-3 px-2 rounded-lg transition-all hover:bg-gradient-to-r from-[#6857F610] to-[#A549E210] text-gray-600"
                  >
                    <span className="mr-3 text-xl">{item.icon}</span>
                    <span className="font-medium font-inter">{item.name}</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Profile */}
        <div className="absolute bottom-0 mb-4 left-6 right-6 border-t border-gray-100 pt-4">
          <div className="flex items-center">
            {currentUser?.photoURL ? (
              <Image
                src={currentUser.photoURL}
                alt="Profile Photo"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-xl font-medium text-white">
                  {currentUser?.displayName?.charAt(0) || "U"}
                </span>
              </div>
            )}
            <div className="ml-3">
              <p className="font-medium">
                {currentUser?.displayName || "User"}
              </p>
              <p className="text-sm text-gray-500">
                {currentUser?.email || "Administrator"}
              </p>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default Sidebar;
