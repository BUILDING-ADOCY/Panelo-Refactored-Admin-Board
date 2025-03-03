"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FiBell, FiSearch, FiChevronDown } from "react-icons/fi";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the token cookie exists
  useEffect(() => {
    if (document.cookie.includes("token=")) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsAuthenticated(false);
    window.location.href = "/auth/login";
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="bg-black/80 backdrop-blur-xl border-b border-gray-800 px-6 py-3 flex justify-between items-center shadow-2xl shadow-black/40"
    >
      {/* Left Section */}
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          DASHBOARD
        </h1>

        {/* Search Bar */}
        <motion.div
          layout
          className={`flex items-center ${
            searchExpanded ? "bg-gray-900/60" : "bg-gray-900/30"
          } backdrop-blur-sm px-4 py-2 gap-3 rounded-xl transition-all`}
          whileHover={{ scale: 1.02 }}
        >
          <FiSearch className="text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search..."
            onFocus={() => setSearchExpanded(true)}
            onBlur={() => setSearchExpanded(false)}
            className="bg-transparent outline-none text-white placeholder-gray-500 text-sm w-48 focus:w-64 transition-all duration-300"
          />
        </motion.div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Login/Logout Button */}
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => (window.location.href = "/auth/login")}
            className="bg-blue-500 px-4 py-2 rounded"
          >
            Login
          </button>
        )}

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2.5 hover:bg-gray-800/40 rounded-xl transition-colors"
        >
          <FiBell className="text-gray-300 text-xl" />
          <span className="absolute top-1 right-1.5 w-2 h-2 bg-sky-500 rounded-full ring-2 ring-black" />
        </motion.button>

        {/* Profile Section with Monogram Badge */}
        <motion.div
          className="flex items-center gap-3 group cursor-pointer relative"
          onHoverStart={() => setIsDropdownOpen(true)}
          onHoverEnd={() => setIsDropdownOpen(false)}
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-medium text-sm shadow-lg hover:scale-105 transition-transform">
              JD
              {/* Status indicator */}
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border-2 border-black" />
            </div>
          </div>

          <div className="flex flex-col items-start">
            <span className="text-gray-200 font-medium text-sm">John Doe</span>
            <span className="text-xs text-gray-400">Admin</span>
          </div>

          {/* Dropdown arrow */}
          <motion.div
            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <FiChevronDown className="text-gray-400 text-lg" />
          </motion.div>

          {/* Dropdown menu */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full right-0 mt-3 w-56 bg-gray-900/90 backdrop-blur-xl shadow-2xl rounded-xl border border-gray-800 overflow-hidden"
              >
                {/* Dropdown content remains same */}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.nav>
  );
}