import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { FaSignInAlt } from "react-icons/fa";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (<div className="mt-8 flex items-center justify-center p-4">
    <div className="glass-container relative group p-8 rounded-2xl border border-gray-700/30 bg-[#182234]/80 shadow-xl transition-all duration-300 max-w-md w-full">
      {/* Decorative Elements */}
      <div className="absolute inset-0 rounded-2xl border border-gray-700/20 bg-gradient-to-br from-blue-900/5 to-transparent" />
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-xl bg-[#1e40af]/90 border border-gray-700/30 flex items-center justify-center shadow-lg shadow-blue-950/20">
        <FaSignInAlt className="w-6 h-6 text-blue-100" />
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex flex-col items-center gap-4">            <Logo className="w-24 h-24 text-blue-200" />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-50">
              Welcome Back
            </h1>
            <p className="text-gray-300 mt-2">
              Sign in to access your account
            </p>
          </div>
        </div>        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(login)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Input
                label="Email Address"
                disable
                id="email"
                type="email"
                placeholder="danish@example.com" className={`w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 placeholder:text-blue-100/50 text-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300/50 transition-all ${errors.email ? "border-red-400/50" : ""
                  }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-300 text-sm mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="relative">
              <Input
                label="Password"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••" className={`w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 placeholder:text-blue-100/50 text-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300/50 transition-all ${errors.password ? "border-red-400/50" : ""
                  }`}
                {...register("password", {
                  required: "Password is required",
                })}
              />              <button
                type="button"
                className="absolute right-3 top-13 transform -translate-y-1/2 text-blue-300 hover:text-blue-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="w-5 h-5" />
                ) : (
                  <FaEye className="w-5 h-5" />
                )}
              </button>
              {errors.password && (
                <span className="text-red-300 text-sm mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>          <Button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all gap-2 flex justify-center items-center"
          >
            <FaSignInAlt className="w-5 h-5" />
            Sign In
          </Button>
        </form>        {/* OAuth2 Options */}


        {/* Signup Link */}
        <p className="text-center text-blue-100/80 text-sm mt-5">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-300 hover:text-blue-200 transition-colors font-semibold"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  </div>
  );
}

export default Login;
