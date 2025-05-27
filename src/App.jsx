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



  return (
    <div className="relative">
      <div className="bg" />
      <div className="min-h-screen flex flex-col relative w-full">
        <Header />
        <main className="flex-grow mt-20 mb-8">
          <Outlet className="Card" />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
