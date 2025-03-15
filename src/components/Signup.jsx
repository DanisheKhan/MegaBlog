import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Lock, UserRound, Mail } from "lucide-react";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen  py-16 flex items-center justify-center">
      <div className="glass-container relative group p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/30 hover:shadow-purple-500/20 transition-all duration-500 max-w-md w-full mx-4">

        {/* Decorative Elements */}
        <div className="absolute inset-0 rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 to-transparent" />
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg flex items-center justify-center">
          <Lock className="w-6 h-6 text-purple-300" />
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
              <p className="text-purple-100/80 mt-1">
                Join our community in just a few steps
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-300 text-center text-sm">{error}</p>}

          {/* Form */}
          <form onSubmit={handleSubmit(create)} className="space-y-5">
            <div className="space-y-4">
              <Input
                label=""
                placeholder="Full Name"
                icon={<UserRound className="w-5 h-5 text-purple-200" />}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 placeholder:text-purple-100/50 text-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300/50 transition-all"
                {...register("name", { required: true })}
              />

              <Input
                label=""
                placeholder="Email Address"
                type="email"
                icon={<Mail className="w-5 h-5 text-purple-200" />}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 placeholder:text-purple-100/50 text-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300/50 transition-all"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                      "Email address must be valid",
                  },
                })}
              />

              <Input
                label=""
                type="password"
                placeholder="Password"
                icon={<Lock className="w-5 h-5 text-purple-200" />}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 placeholder:text-purple-100/50 text-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300/50 transition-all"
                {...register("password", { required: true })}
              />
            </div>

            <Button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold text-white shadow-lg shadow-purple-500/30"
            >
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
              Sign In
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