import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard, Loader } from "../components";
import { useNavigate } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); useEffect(() => {
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
        if (isMounted) setLoading(false);
      }
    };

    fetchPosts(); return () => {
      isMounted = false; // Cleanup function
    };
  }, []);

  // Function to handle navigation
  const handleNavigate = (path) => {
    navigate(path);
  };
  if (loading) {
    return (<div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-container bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl backdrop-blur-lg">
        <Loader variant="dots" size="large" text="Loading posts..." />
      </div>
    </div>
    );
  }

  if (error) {
    return (<div className="min-h-screen py-16 flex flex-col items-center justify-center">
      <p className="text-xl text-blue-400">{error}</p><button
        onClick={() => window.location.reload()}
        className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
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
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            {/* Glass Morphism Card */}
            <div className="glass-container relative group p-8 rounded-3xl border border-white/10 bg-white/5  max-w-2xl w-full">
              <div className="absolute inset-0 rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 to-transparent" />
              <div className="relative z-10 space-y-6">
                <div className="flex justify-center">                  <div className="p-4 rounded-full bg-white/5 border border-white/10 ">
                  <svg
                    className="w-16 h-16 text-blue-300"
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
                </div>                <div className="space-y-4 text-center">
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-200 to-blue-100 bg-clip-text text-transparent">
                    Discover Amazing Content
                  </h1>
                  <p className="text-lg text-blue-100/80 font-medium">
                    Please sign in to view the latest content from our amazing creators.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">                  <button
                  onClick={() => handleNavigate("/login")}
                  className="px-8 py-3.5 rounded-xl bg-white/10 border border-white/20 cursor-pointer hover:bg-white/20 transition-all duration-300 font-semibold text-blue-50 flex items-center justify-center gap-2"
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
                </button>                  <button
                  onClick={() => handleNavigate("/signup")}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 cursor-pointer"
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
    <div className='min-h-screen py-12'>
      <Container>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {posts.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
