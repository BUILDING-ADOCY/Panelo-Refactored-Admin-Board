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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background particles */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -top-48 -left-48"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -bottom-48 -right-48"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md bg-gray-800/40 backdrop-blur-2xl rounded-2xl shadow-2xl p-8 relative border border-gray-700/20"
      >
        <motion.div 
          className="mb-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="mb-8 flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-14 h-14 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-2xl p-1.5 shadow-lg"
            >
              <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center">
                <FiArrowRight className="w-6 h-6 text-blue-400" />
              </div>
            </motion.div>
          </div>
          <h1 className="text-3xl font-semibold text-gray-100 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-400/80 font-light">
            Sign in to your account
          </p>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-3 bg-red-900/20 border border-red-800/30 rounded-lg flex items-center gap-3 backdrop-blur-sm"
            >
              <FiAlertCircle className="text-red-400/80 flex-shrink-0" />
              <span className="text-red-300/90 text-sm">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleLogin} className="space-y-5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-5"
          >
            <div className="relative">
              <FiMail className="absolute top-4 left-4 text-gray-400/60" />
              <input
                type="email"
                placeholder="Email address"
                className="w-full pl-12 pr-4 py-3 bg-gray-700/30 border border-gray-600/30 rounded-xl text-gray-100 placeholder-gray-400/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all hover:border-gray-500/50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <FiLock className="absolute top-4 left-4 text-gray-400/60" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3 bg-gray-700/30 border border-gray-600/30 rounded-xl text-gray-100 placeholder-gray-400/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all hover:border-gray-500/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-blue-500/90 to-purple-500/90 text-gray-100 font-medium rounded-xl flex items-center justify-center gap-2 transition-transform relative overflow-hidden group"
            >
              <span className="relative z-10">Continue</span>
              <FiArrowRight className="text-lg relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </motion.div>
        </form>

        <div className="my-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600/30"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-gray-800/40 text-gray-400/70 text-sm backdrop-blur-sm">
              Or continue with
            </span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={loginWithGoogle}
          className="w-full py-3 bg-gray-700/20 border border-gray-600/30 rounded-xl text-gray-100 flex items-center justify-center gap-2 transition-all hover:border-gray-500/50"
        >
          <FcGoogle className="text-xl" />
          <span>Google</span>
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-400/80 mt-8 text-sm"
        >
          Don't have an account?{" "}
          <a
            href="/auth/signup"
            className="text-blue-400/90 hover:text-blue-300/90 font-medium transition-colors"
          >
            Create account
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
}