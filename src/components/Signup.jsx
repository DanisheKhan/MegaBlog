import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { FaUserPlus } from "react-icons/fa";
import { login } from "../store/authSlice";

function Signup() {
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

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="glass-container relative group p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/30 hover:shadow-purple-500/20 transition-all duration-500 max-w-md w-full">
        {/* Decorative Elements */}
        <div className="absolute inset-0 rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 to-transparent" />
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg flex items-center justify-center">
          <FaUserPlus className="w-6 h-6 text-purple-300" />
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-6">
          {/* Header */}
          <div className="flex flex-col items-center gap-4">
            <Logo className="w-24 h-24 text-purple-300" />
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                Create Account
              </h1>
              <p className="text-purple-100/80 mt-2">
                Join our community in just a few steps
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-300 text-center text-sm">{error}</p>}

          {/* Form */}
          <form onSubmit={handleSubmit(createAccount)} className="space-y-6">
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <Input
                  label="Full Name"
                  id="name"
                  placeholder="John Doe"
                  className={`glass-input focus:ring-2 focus:ring-purple-300/50 focus:outline-none transition-all duration-200 ${
                    errors.name ? "border-red-400/50" : ""
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
              <div>
                <Input
                  label="Email Address"
                  id="email"
                  type="email"
                  placeholder="hello@example.com"
                  className={`glass-input focus:ring-2 focus:ring-purple-300/50 focus:outline-none transition-all duration-200 ${
                    errors.email ? "border-red-400/50" : ""
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
              <div>
                <Input
                  label="Password"
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className={`glass-input focus:ring-2 focus:ring-purple-300/50 focus:outline-none transition-all duration-200 ${
                    errors.password ? "border-red-400/50" : ""
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
                />
                {errors.password && (
                  <span className="text-red-300 text-sm mt-1">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <Input
                  label="Confirm Password"
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className={`glass-input focus:ring-2 focus:ring-purple-300/50 focus:outline-none transition-all duration-200 ${
                    errors.confirmPassword ? "border-red-400/50" : ""
                  }`}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <span className="text-red-300 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="flex items-center justify-center w-full py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all gap-2"
            >
              <FaUserPlus className="w-5 h-5" />
              Create Account
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-purple-100/80 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-300 hover:text-indigo-200 transition-colors font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute top-20 left-1/4 w-24 h-24 rounded-full bg-purple-500/20 blur-3xl -z-10" />
      <div className="absolute bottom-10 right-1/4 w-32 h-32 rounded-full bg-pink-500/20 blur-3xl -z-10" />
    </div>
  );
}

export default Signup;
