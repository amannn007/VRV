import React, { useState } from "react";
import { useBlogs } from "../context/BlogContext";
import CSidebar from "../components/CreatorNav";
import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WriteBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const { addBlog } = useBlogs();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      addBlog({ title, content, date: new Date().toLocaleDateString() });
      setTitle(""); 
      setContent("");
      toast.success("Your blog post has been successfully published!"); 
    } else {
      toast.error("All fields are required. Please fill in the title and content."); 
    }
  };

  return (
    <div className="write-blog-container flex min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
   
      <CSidebar isOpen={isSidebarOpen} />

      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64 sm:ml-64" : "ml-0 sm:ml-64"
        } p-8 bg-gray-50 font-spaceGrotesk`}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center sm:text-left">
          Write a New Blog Post
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-8 space-y-8 max-w-4xl mx-auto"
        >
          <div className="form-group">
            <label
              htmlFor="title"
              className="block text-xl font-semibold text-gray-700 mb-2"
            >
              Blog Title:
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              placeholder="Enter an engaging title for your blog post"
              required
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="content"
              className="block text-xl font-semibold text-gray-700 mb-2"
            >
              Blog Content:
            </label>
            <Editor
              apiKey="3tyyaj049ws7lfwkluh6d4fq94g6g12kg47xsmsnj6qnb3yk" // API key
              value={content}
              onEditorChange={(newContent) => setContent(newContent)}
              init={{
                height: 400,
                plugins:
                  "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                toolbar:
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                content_style:
                  "body { font-family:Arial,sans-serif; font-size:16px; color:#333 }",
              }}
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-orange-500 text-white text-lg font-semibold rounded-lg hover:bg-orange-600 transition duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300"
          >
            Publish Your Blog
          </button>
        </form>
      </main>

      <ToastContainer />
    </div>
  );
};

export default WriteBlog;