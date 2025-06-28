import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header, Loader } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

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
      .finally(() => setLoading(false));
  }, []);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glass-container bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl backdrop-blur-lg">
          <Loader variant="dots" text="Loading application..." size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative page-transition">
      <div className="bg" />
      <div className="min-h-screen flex flex-col relative w-full">
        <Header />
        <main className="flex-grow mt-30 mb-8">
          <Outlet className="Card" />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
