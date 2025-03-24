"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiLock, FiArrowRight, FiAlertCircle } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await loginWithEmail(email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle animated grid background */}
      <div className="absolute inset-0 opacity-10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
        <div className="absolute inset-0 bg-[linear-gradient(#0F172A_1px,transparent_1px),linear-gradient(90deg,#0F172A_1px,transparent_1px)] bg-[size:24px_24px] animate-grid-pan"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-md bg-slate-800/60 backdrop-blur-2xl rounded-xl shadow-2xl p-8 relative border border-slate-700/30"
      >
        <div className="mb-10 text-center space-y-1">
          <motion.div 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex justify-center mb-6"
          >
            <div className="w-12 h-12 bg-gradient-to-tr from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
              <FiArrowRight className="w-6 h-6 text-slate-900" />
            </div>
          </motion.div>
          <h1 className="text-3xl font-medium text-slate-100 font-display">
            Welcome Back
          </h1>
          <p className="text-slate-400/90 font-light tracking-wide">
            Sign in to continue to your workspace
          </p>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-3 bg-rose-900/20 border border-rose-800/40 rounded-lg flex items-center gap-3 backdrop-blur-sm"
            >
              <FiAlertCircle className="text-rose-400/80 flex-shrink-0" />
              <span className="text-rose-300/90 text-sm font-light">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-4">
            <div className="relative group">
              <FiMail className="absolute top-3 left-4 text-slate-400/60 text-lg" />
              <input
                type="email"
                placeholder="Email address"
                className="w-full pl-12 pr-4 py-2.5 bg-slate-700/20 border border-slate-600/30 rounded-lg text-slate-100 placeholder-slate-400/60 focus:border-teal-400 focus:ring-1 focus:ring-teal-400/20 outline-none transition-all duration-200 hover:border-slate-500/50 font-light tracking-wide"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative group">
              <FiLock className="absolute top-3 left-4 text-slate-400/60 text-lg" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-2.5 bg-slate-700/20 border border-slate-600/30 rounded-lg text-slate-100 placeholder-slate-400/60 focus:border-teal-400 focus:ring-1 focus:ring-teal-400/20 outline-none transition-all duration-200 hover:border-slate-500/50 font-light tracking-wide"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-teal-500/90 to-cyan-500/90 text-slate-100 font-medium rounded-lg flex items-center justify-center gap-2 transition-transform relative overflow-hidden group"
            >
              <span className="relative z-10 tracking-wider">Continue</span>
              <FiArrowRight className="text-lg relative z-10 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </div>
        </form>

        <div className="my-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-600/30"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-slate-800/40 text-slate-400/70 text-sm font-light backdrop-blur-sm">
              Or continue with
            </span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={loginWithGoogle}
          className="w-full py-2.5 bg-slate-700/20 border border-slate-600/30 rounded-lg text-slate-100 flex items-center justify-center gap-2 transition-all hover:border-slate-500/50 font-light tracking-wide"
        >
          <FcGoogle className="text-xl" />
          <span>Google</span>
        </motion.button>

        <p className="text-center text-slate-400/80 mt-8 text-sm font-light">
          Don't have an account?{" "}
          <a
            href="/auth/signup"
            className="text-teal-400/90 hover:text-teal-300/90 font-medium transition-colors duration-200"
          >
            Create account
          </a>
        </p>
      </motion.div>
    </div>
  );
}