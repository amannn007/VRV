import React, { useState, useEffect, useMemo } from "react";
import { useBlogs } from "../context/BlogContext";
import CSidebar from "../components/CreatorNav";

const PastBlogs = () => {
  const { blogs } = useBlogs();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) =>
      blog.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [blogs, debouncedSearch]);

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 font-spaceGrotesk">
      <CSidebar isOpen={isSidebarOpen} />

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64 sm:ml-64" : "ml-0 sm:ml-64"
        } p-8`}
      >
        <header className="flex flex-col sm:flex-row items-center justify-between pb-8 border-b-2 border-gray-300 space-y-4 sm:space-y-0">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center sm:text-left tracking-tight">
            Your Published Blogs
          </h1>
          <input
            type="text"
            placeholder="Search your blogs..."
            value={search}
            onChange={handleSearchChange}
            aria-label="Search blogs"
            className="px-6 py-3 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 w-full sm:w-auto"
          />
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">{blog.title}</h2>
                <p className="text-sm text-gray-500 mb-4">{blog.date}</p>
                <p className="text-lg text-gray-700 font-medium">{blog.content}</p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 font-light">
              You haven't written any blogs yet. Start sharing your thoughts!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PastBlogs;
