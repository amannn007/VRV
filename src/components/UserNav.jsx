import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handle logout functionality
  const handleLogOut = () => {
    logout();
  };

  return (
    <>
      {/* Menu Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="sm:hidden fixed top-4 left-4 z-50 p-3 rounded-full bg-gradient-to-r from-[#6A5ACD] to-[#3A4F84] text-white shadow-lg transition-all duration-300 transform hover:scale-110"
      >
        {isSidebarOpen ? "Close" : "Menu"}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-[#3A4F84] shadow-lg flex flex-col transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:w-56 z-40`}
      >
        {/* Sidebar Header */}
        <div className="p-6 text-xl font-bold text-white border-b border-gray-700">
          User Dashboard
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-6">
            <li>
              <Link
                to="/user"
                className="block p-3 rounded-md text-lg text-white hover:bg-[#4C6A92] transition duration-200 ease-in-out"
              >
                Dashboard
              </Link>
            </li>
            {/* You can add more links here if needed */}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogOut}
            className="w-full p-3 text-center bg-gradient-to-r from-[#6A5ACD] to-[#3A4F84] rounded-md text-white font-medium text-lg shadow-lg hover:bg-[#4C6A92] hover:shadow-xl transform transition-all duration-200 ease-in-out"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
