"use client";
import { motion } from "framer-motion";
import { FaBell, FaUserCircle, FaSearch } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#0a0a0a] border-b border-white/10 p-4 flex justify-between items-center"
    >
      {/* Left Section */}
      <div className="flex items-center gap-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Dashboard
        </h1>
        
        {/* Search Bar */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center bg-white/5 rounded-xl px-4 py-2 gap-3"
        >
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-gray-300 placeholder-gray-500 w-64"
          />
        </motion.div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
        >
          <FaBell className="text-gray-300" size={20} />
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center"
          >
            3
          </motion.span>
        </motion.button>

        {/* Profile Section */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3 pl-4 border-l border-white/10 cursor-pointer"
        >
          <div className="relative">
            <FaUserCircle className="text-gray-300" size={32} />
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border-2 border-[#0a0a0a]" />
          </div>
          
          <div className="flex flex-col">
            <span className="text-gray-200 font-medium">John Doe</span>
            <span className="text-xs text-gray-400">Administrator</span>
          </div>
          
          <FiChevronDown className="text-gray-400 ml-2" />
          
          {/* Profile Dropdown (Hidden by default) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute top-full right-0 mt-2 w-48 bg-[#121212] rounded-xl shadow-2xl border border-white/10 overflow-hidden"
          >
            <div className="py-2">
              <button className="w-full px-4 py-3 text-left text-gray-300 hover:bg-white/5 transition-all">
                Profile Settings
              </button>
              <button className="w-full px-4 py-3 text-left text-gray-300 hover:bg-white/5 transition-all">
                Logout
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  );
}