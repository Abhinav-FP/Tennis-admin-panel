import React, { useEffect, useState } from "react";
import { MdDashboard, MdLogin } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineX } from "react-icons/hi";
import { HiOutlineBars3 } from "react-icons/hi2";
import { MdLogout } from "react-icons/md";
import ApiDev from "./api/ApiDev";
import toast from "react-hot-toast";
import Api from "./api/Api";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Function to delete the token
  const deleteToken = () => {
    localStorage.removeItem('token');
    setToken(null); // Update state if necessary
  };
  // console.log(`token`,token);

  const handleLogout = async () => {
    try {
      // const logoutData = new FormData();
      // logoutData.append("token",token);
      // const response = await Api.post("/api/extract/logout",logoutData);
      // if (response.data.status === true) {
        deleteToken();
        // console.log("Token Removed");
        toast.success("Logout Successful");
        navigate("/login");
      // } else {
        // Handle unsuccessful logout (optional)
        // console.error("Logout request failed");
        // toast.error("Failed to logout. Please try again.");
      // }
    } catch (error) {
      console.error("Error occurred during logout:", error);
      toast.error("Error occurred during logout. Please try again.");
    }
  };
  return (
    <>
      <button
        onClick={toggleSidebar}
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-400 rounded-lg sm:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
      >
        <span className="sr-only">
          {isOpen ? "Close sidebar" : "Open sidebar"}
        </span>
        <HiOutlineBars3 size={24} />
      </button>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 bg-gray-800`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <button
            onClick={toggleSidebar}
            aria-label="Close sidebar"
            className="absolute top-2 right-2 sm:hidden text-gray-400 hover:text-gray-700 focus:outline-none"
          >
            <HiOutlineX size={24} />
          </button>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/"
                className="flex items-center p-2 text-gray-100 rounded-lg hover:bg-gray-700 group"
              >
                <MdDashboard size={24} className="text-white" />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="flex items-center p-2 text-gray-100 rounded-lg hover:bg-gray-700 group"
              >
                <MdLogin size={24} className="text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Login</span>
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex text-left w-full items-center p-2 text-gray-100 rounded-lg hover:bg-gray-700 group"
              >
                <MdLogout size={24} className="text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
