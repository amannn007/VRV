import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CSidebar = () => {
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogOut = () => {
    logout();
  };

  return (
    <>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="sm:hidden fixed top-4 left-4 mt-10 z-50 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-3 rounded-full text-white shadow-lg hover:bg-gradient-to-l transition-all duration-300"
      >
        {isSidebarOpen ? "Close" : "Menu"}
      </button>

      <aside
        className={`fixed top-0 left-0 h-full bg-gradient-to-r from-blue-900 to-teal-800 shadow-xl flex flex-col font-spaceGrotesk transform transition-transform duration-500 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:w-64 rounded-r-xl`}
      >
        <div className="p-6 text-2xl font-bold text-white border-b border-gray-600 shadow-md">
          Creator Role
        </div>
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-6">
            <li>
              <Link
                to="/creator"
                className="block p-4 rounded-lg text-lg text-white bg-transparent hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-500 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Past Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/creator/write"
                className="block p-4 rounded-lg text-lg text-white bg-transparent hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-500 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Write a Blog
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-600">
          <button
            onClick={handleLogOut}
            className="w-full p-3 text-center bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:bg-gradient-to-l transition-all duration-300 text-lg font-medium text-white shadow-lg"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default CSidebar;
