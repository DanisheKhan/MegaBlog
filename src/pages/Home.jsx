import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard, Loader } from "../components";
import { useNavigate } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; // Track mount status

    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await appwriteService.getPosts();
        if (isMounted) {
          setPosts(response?.documents || []);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        if (isMounted) setError("Failed to load posts. Please try again.");
      } finally {
        if (isMounted) {
          // Add a small delay for smooth transition
          setTimeout(() => {
            setLoading(false);
          }, 600);
        }
      }
    };

    fetchPosts();

    return () => {
      isMounted = false; // Cleanup function
    };
  }, []);

  // Function to handle navigation
  const handleNavigate = (path) => {
    navigate(path);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="relative w-full max-w-md">
          <Loader type="particles" size="large" text="Welcome to MegaBlog" />
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen py-16 flex flex-col items-center justify-center">
        <p className="text-xl text-red-300">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-3 bg-[#1e40af] text-white rounded-lg hover:bg-[#1e3a8a] transition-all shadow-md hover:shadow-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <Container>
          <div className="flex flex-col items-center justify-center min-h-[60vh]">            {/* Glass Morphism Card */}
            <div className="glass-container relative group p-8 rounded-2xl border border-gray-700/30 bg-[#182234]/80 max-w-2xl w-full shadow-xl">
              <div className="absolute inset-0 rounded-2xl border border-gray-700/20 bg-gradient-to-br from-blue-900/5 to-transparent" />
              <div className="relative z-10 space-y-6">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-[#1e40af]/20 border border-blue-500/20 shadow-inner shadow-blue-500/10">
                    <svg
                      className="w-16 h-16 text-blue-200"
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
                <div className="space-y-4 text-center">
                  <h1 className="text-4xl md:text-5xl font-bold text-blue-50">
                    Discover Amazing Content
                  </h1>
                  <p className="text-lg text-blue-100/80 font-medium">
                    Please sign in to view the latest content from our amazing creators.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => handleNavigate("/login")}
                    className="px-8 py-3.5 rounded-xl bg-[#1e40af]/20 border border-blue-500/30 cursor-pointer hover:bg-[#1e40af]/30 transition-all duration-300 font-semibold text-blue-50 flex items-center justify-center gap-2 shadow-md"
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
                    onClick={() => handleNavigate("/signup")}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition-all duration-300 font-semibold text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30 cursor-pointer"
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
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8 page-transition">
      <Container>
        <div className="flex flex-wrap -mx-2">
          {posts.map((post, index) => (
            <div
              key={post.$id}
              className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
              style={{
                animationDelay: `${index * 0.05}s`,
                animation: "fadeIn 0.5s ease-out forwards",
                opacity: 0
              }}
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
