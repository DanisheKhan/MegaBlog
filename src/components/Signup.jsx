import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { FaUserPlus } from "react-icons/fa";
import { login } from "../store/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const createAccount = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) dispatch(login(currentUser));
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
        <FaUserPlus className="w-6 h-6 text-blue-100" />
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-6">
        {/* Header */}          <div className="flex flex-col items-center gap-4">
          <Logo className="w-24 h-24 text-blue-200" />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-50">
              Create Account
            </h1>
            <p className="text-gray-300 mt-2">
              Join our community in just a few steps
            </p>
          </div>
        </div>          {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(createAccount)} className="space-y-6">
          <div className="space-y-4">
            {/* Full Name */}
            <div>                <Input
              label="Full Name"
              id="name"
              placeholder="Danish Khan"
              className={`w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 placeholder:text-blue-100/50 text-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300/50 transition-all ${errors.name ? "border-red-400/50" : ""
                }`}
              {...register("name", {
                required: "Full name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
            />
              {errors.name && (
                <span className="text-red-300 text-sm mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div>                <Input
              label="Email Address"
              id="email"
              type="email"
              placeholder="danish@example.com"
              className={`w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 placeholder:text-blue-100/50 text-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300/50 transition-all ${errors.email ? "border-red-400/50" : ""
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

            {/* Password */}
            <div className="relative">                <Input
              label="Password"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 placeholder:text-blue-100/50 text-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300/50 transition-all ${errors.password ? "border-red-400/50" : ""
                }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                validate: (value) =>
                  (/[A-Z]/.test(value) && /[!@#$%^&*]/.test(value)) ||
                  "Password must contain at least one uppercase letter, one number, and one special character",
              })}
            />                <button
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

            {/* Confirm Password */}
            <div className="relative">                <Input
              label="Confirm Password"
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 placeholder:text-blue-100/50 text-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300/50 transition-all ${errors.confirmPassword ? "border-red-400/50" : ""
                }`}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
              <button
                type="button"
                className="absolute right-3 top-13 transform -translate-y-1/2 text-blue-300 hover:text-blue-200"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="w-5 h-5" />
                ) : (
                  <FaEye className="w-5 h-5" />
                )}
              </button>
              {errors.confirmPassword && (
                <span className="text-red-300 text-sm mt-1">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>

          {/* Submit Button */}            <Button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all gap-2 flex justify-center items-center"
          >
            <FaUserPlus className="w-5 h-5" />
            Create Account
          </Button>
        </form>

        {/* OAuth2 Options */}

        {/* Login Link */}          <p className="text-center text-blue-100/80 text-sm mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-300 hover:text-blue-200 transition-colors font-semibold"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  </div>
  );
}
export default Signup;
