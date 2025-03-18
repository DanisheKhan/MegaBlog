import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    appwriteService
      .getPosts()
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="w-12 h-12 text-purple-500 animate-spin" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <Container>
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <div className="glass-container relative p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl max-w-2xl w-full">
              <div className="relative z-10 space-y-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-purple-200">
                  Discover Amazing Content
                </h1>
                <p className="text-lg text-purple-100/80 font-medium">
                  Please sign in to view the latest content from our amazing
                  creators.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => handleNavigate("/login")}
                    className="px-8 py-3.5 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 font-semibold text-purple-50"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleNavigate("/signup")}
                    className="px-8 py-3.5 rounded-xl bg-purple-500 hover:bg-purple-600 transition-all duration-300 font-semibold text-white"
                  >
                    Get Started
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
    <div className="w-full py-8">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div key={post.$id} className="p-2">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
