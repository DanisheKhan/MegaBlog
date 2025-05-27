import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const dispatch = useDispatch();

  // Realistic loading simulation
  useEffect(() => {
    let interval;

    if (loading) {
      interval = setInterval(() => {
        setLoadingProgress(prev => {
          // Progress increases faster at beginning, slows down near completion
          const increment = Math.random() * (95 - prev) / 10;
          const newProgress = prev + increment;
          // Cap at 95% until fully loaded
          return newProgress > 95 ? 95 : newProgress;
        });
      }, 200);
    }

    return () => clearInterval(interval);
  }, [loading]);

  // Actual authentication process
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        // Set to 100% when loaded
        setLoadingProgress(100);
        // Add completion class for animation
        setLoadingComplete(true);
        // Small delay for smooth transition
        setTimeout(() => setLoading(false), 800);
      });
  }, []);

  return !loading ? (
    <div className="relative content-reveal">
      <div className="bg" />
      <div className="min-h-screen flex flex-col relative w-full">
        <Header />
        <main className="flex-grow mt-20 mb-8 page-transition">
          <Outlet className="Card" />
        </main>
        <Footer />
      </div>
    </div>) : (<div className="min-h-screen flex flex-col items-center justify-center bg-[#0c1425] overflow-hidden">
      {/* Background Particles */}
      <div className="particles-container">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <div className="relative">
        {/* Brand Logo Effect */}
        <div className="absolute -z-10 w-96 h-96 bg-blue-800/10 rounded-full filter blur-3xl animate-pulse"></div>

        {/* Primary Loader Container */}        <div className={`glass-container relative shadow-2xl backdrop-blur-lg bg-[#182234]/60 px-10 py-8 rounded-2xl border border-blue-900/30 flex flex-col items-center overflow-hidden ${loadingComplete ? 'loader-complete' : ''}`}>          {/* Progress Indicator */}
          <div
            className="loading-progress"
            style={{ width: `${loadingProgress}%` }}
          ></div>

          {/* Loader Animation */}
          <div className="loader-rings mb-8">
            <div className="ring-container">              <div className="loading-ring loading-ring-1"></div>
              <div className="loading-ring loading-ring-2"></div>
              <div className="loading-ring loading-ring-3"></div>
              <div className="dot-pulse">
                <div className="dot-pulse-1"></div>
                <div className="dot-pulse-2"></div>
                <div className="dot-pulse-3"></div>
              </div>
            </div>
          </div>
          {/* Logo and Loading Text */}
          <div className="text-center relative">
            <div className="logo-animation mb-4">

            </div>            <h2 className="text-xl font-medium text-blue-50 mb-2">Loading MegaBlog</h2>
            <div className="overflow-hidden border-r-2 border-blue-300/30">
              <p className="typing-animation text-blue-200/70 text-sm">Please wait while we set up your experience</p>
            </div>
          </div>

          {/* Progress Percentage */}
          <div className="loading-percentage">
            {Math.floor(loadingProgress)}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
