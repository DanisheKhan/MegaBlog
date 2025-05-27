import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { LogOut } from 'lucide-react';

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      className="inline-flex items-center gap-1.5 px-5 py-2 font-medium rounded-lg cursor-pointer hover-lift text-blue-50 hover:text-white hover:bg-[#1e40af]/30 transition-all duration-300 wave-on-hover"
      onClick={logoutHandler}
      aria-label="Logout"
    >
      <LogOut className="w-4 h-4" />
      <span>Logout</span>
    </button>
  );
}

export default LogoutBtn;