import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { FaSpinner } from "react-icons/fa"; // Import spinner icon

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    setLoading(true); // Set loading to true when fetching data
    appwriteService
      .getPosts()
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .finally(() => {
        setLoading(false); // Set loading to false after data is fetched
      });
  }, []);

  // Function to handle navigation with loading state
  const handleNavigate = (path) => {
    setLoading(true); // Set loading to true before navigation
    setTimeout(() => {
      navigate(path); // Navigate after a short delay
    }, 500); // Adjust delay as needed
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="w-12 h-12 text-purple-500 animate-spin" />{" "}
        {/* Loading spinner */}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <Container>
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            {/* Glass Morphism Card */}
            <div className="glass-container relative group p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/30 hover:shadow-purple-500/20 transition-all duration-500 max-w-2xl w-full">
              {/* Inner Glow Effect */}
              <div className="absolute inset-0 rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 to-transparent" />

              {/* Content */}
              <div className="relative z-10 space-y-6">
                {/* Icon */}
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-lg">
                    <svg
                      className="w-16 h-16 text-purple-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-4 text-center">
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                    Discover Amazing Content
                  </h1>
                  <p className="text-lg text-purple-100/80 font-medium">
                    Please sign in to view the latest content from our amazing
                    creators.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => handleNavigate("/login")} // Use handleNavigate
                    className="px-8 py-3.5 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 font-semibold text-purple-50 flex items-center justify-center gap-2"
                  >
                    <span>Sign In</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={() => handleNavigate("/signup")} // Use handleNavigate
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold text-white flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30"
                  >
                    <span>Get Started</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Elements (Optional) */}
            <div className="absolute top-20 left-1/4 w-24 h-24 rounded-full bg-purple-500/20 blur-3xl -z-10" />
            <div className="absolute bottom-10 right-1/4 w-32 h-32 rounded-full bg-pink-500/20 blur-3xl -z-10" />
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap -mx-2">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
