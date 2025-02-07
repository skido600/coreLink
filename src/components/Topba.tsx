import { IoIosNotificationsOutline } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
export default function Topba() {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex-1 flex items-center justify-end space-x-4">
        <div>
          <IoIosNotificationsOutline />
        </div>
        <div className="bg-[#0F172A] text-white font-inter flex items-center rounded-lg p-2">
          <FaPlus />
          <p className="md:block hidden">Update</p>
        </div>
      </div>
    </div>
  );
}
