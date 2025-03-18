import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

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

  return !loading ? (
    <>
    <div className="bg" />
      <div className="min-h-screen flex flex-col absolute  top-0 left-0 w-full h-full">
        <Header  />
        <main className="flex-grow mt-20">
          <Outlet className="Card" />
        </main>
        <Footer />
      </div>
    </>
  ) : null;
}

export default App;
