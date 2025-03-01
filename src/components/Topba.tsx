"use client";
import { IoIosNotificationsOutline } from "react-icons/io";
// import { FaPlus } from "react-icons/fa6";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
export default function Topba() {
  const { toast } = useToast();
  const [toggle, setToggle] = useState<boolean>(false);
  const handleToggle = () => {
    setToggle(!toggle);
    toast({
      description: "hello this dark mode will be avaliable in the next update ",
      variant: "default",
    });
  };
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex-1 flex items-center justify-end space-x-4">
        <div>
          <IoIosNotificationsOutline />
        </div>
        {/* <div className="bg-[#0F172A] text-white font-inter flex items-center rounded-lg p-2">
          <FaPlus />
          <p className="md:block hidden">Update</p>
        </div> */}
        <div>
          <button
            onClick={handleToggle}
            className="p-2 rounded-lg bg-gray-200 transition-colors duration-200"
          >
            {toggle ? <MdDarkMode /> : <CiLight />}
          </button>
        </div>
      </div>
    </div>
  );
}
