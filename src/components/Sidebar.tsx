"use client";
import React, { useState } from "react";
import { CgMenuRight } from "react-icons/cg";
import {
  FiHome,
  FiBox,
  FiUsers,
  FiSettings,
  FiLink,
  FiX,
} from "react-icons/fi";
import { FaChartLine } from "react-icons/fa";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [
    {
      name: "Dashboard",
      icon: <FiHome className="icon" />,
      path: "/dashboard",
    },
    {
      name: "Products",
      icon: <FiBox className="icon" />,
      path: "/products",
    },

    {
      name: "Shared Links",
      icon: <FiLink className="icon" />,
      path: "/links",
    },

    {
      name: "Workers",
      icon: <FiUsers className="icon" />,
      path: "/workers",
    },
    {
      name: "Analytics",
      icon: <FaChartLine className="icon" />,
      path: "/analytics",
    },
    {
      name: "Settings",
      icon: <FiSettings className="icon" />,
      path: "/settings",
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-1 left-2 z-50 p-2 rounded-lg  text-[#]"
      >
        {isOpen ? <FiX size={24} /> : <CgMenuRight size={24} />}
      </button>

      {/* self colse div */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`h-screen w-64 fixed left-0 top-0 bg-white border-r border-gray-200 shadow-lg p-6
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
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.path}
                  className="flex items-center p-3 rounded-lg transition-all
                    hover:bg-gradient-to-r from-[#6857F610] to-[#A549E210]
                  
                    text-gray-600"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="mr-3 text-xl ">{item.icon}</span>
                  <span className="font-medium font-inter">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* user profile will be here*/}
        {/* <div className="absolute top-0 right-0 w-1 h-16 bg-gradient-to-b from-[#6857F6] to-[#A549E2] rounded-l-full" /> */}

        {/* Bottom Profile */}
        <div className="absolute bottom-6 left-6 right-6 border-t border-gray-100 pt-4">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-gradient-to-r from-[#6857F6] to-[#A549E2] rounded-full" />
            <div className="ml-3">
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
