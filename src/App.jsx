import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import { Bg } from "./components/Bg";

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
    {/* <Bg className=" -z-10 fixed top-0 left-0 " /> */}
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
