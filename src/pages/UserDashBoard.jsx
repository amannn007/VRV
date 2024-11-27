import React, { useEffect, useState } from "react";
import Sidebar from "../components/UserNav";
import Shimmer from "../components/Shimmer";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [followedCreators, setFollowedCreators] = useState(new Set());

  // Fetch posts from the DummyJSON API
  useEffect(() => {
    const fetchPosts = async () => {
      const url = "https://dummyjson.com/posts";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        setError("Failed to load posts");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Handle post selection for the modal
  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedPost(null);
  };

  // Toggle follow/unfollow for the creator
  const toggleFollow = (creatorId) => {
    const updatedFollowedCreators = new Set(followedCreators);
    if (updatedFollowedCreators.has(creatorId)) {
      updatedFollowedCreators.delete(creatorId); // Unfollow if already followed
    } else {
      updatedFollowedCreators.add(creatorId); // Follow the creator
    }
    setFollowedCreators(updatedFollowedCreators);
  };

  // Close the modal if the click is outside of the modal
  const handleModalClickOutside = (e) => {
    if (e.target.id === "modal-overlay") {
      closeModal();
    }
  };

  // Return early if there's an error
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center text-red-600 text-lg">
          {error}. Please try again later.
        </div>
      </div>
    );
  }

  // Return loading shimmer or posts
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 font-spaceGrotesk">
      <Sidebar followedCreators={followedCreators} />

      <main className="ml-0 sm:ml-64 flex-1 p-8 bg-white rounded-xl shadow-lg transition-all duration-300">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Trending Posts
        </h1>

        {loading ? (
          <Shimmer />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 mt-4">
                  {post.body.slice(0, 100)}...
                </p>

                <div className="mt-4 text-xs text-gray-500">
                  {post.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="mr-2 inline-block bg-gray-200 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between text-sm text-gray-500 mt-4">
                  <span>{post.reactions?.likes} Likes</span>
                  <span>{post.reactions?.dislikes} Dislikes</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Views: {post.views}
                </div>

                <button
                  className={`mt-4 px-6 py-2 rounded-lg text-sm font-semibold ${
                    followedCreators.has(post.userId)
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  } transition-colors duration-300 w-full`}
                  onClick={() => toggleFollow(post.userId)}
                >
                  {followedCreators.has(post.userId) ? "Unfollow" : "Follow"} Creator
                </button>

                <Link
                  to="#"
                  className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 w-full text-center"
                  aria-label={`Read more about ${post.title}`}
                  onClick={() => handlePostClick(post)} 
                >
                  <span className="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Read More
                  </span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>

      {selectedPost && (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleModalClickOutside}
        >
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {selectedPost.title}
            </h2>
            <p>{selectedPost.body}</p>
            <button
              onClick={closeModal}
              className="mt-4 px-6 py-2 rounded-lg bg-red-600 text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
