import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await authService.logout();
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      className="inline-block px-6 py-2 font-bold rounded-full cursor-pointer md:hover:border-b text-white"
      onClick={logoutHandler}
      aria-label="Logout"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
