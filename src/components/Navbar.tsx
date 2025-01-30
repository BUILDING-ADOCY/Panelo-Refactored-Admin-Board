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
      className="bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center rounded-b-2xl shadow-2xl shadow-black/40"
    >
      {/* Left Section */}
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Dashboard
        </h1>
        
        {/* Search Bar */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center bg-white/5 backdrop-blur-sm rounded-full pl-5 pr-4 py-2 gap-3 transition-all"
        >
          <FaSearch className="text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-gray-300 placeholder-gray-400 text-sm w-48 focus:w-64 transition-all duration-300"
          />
        </motion.div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all group"
        >
          <FaBell className="text-gray-300 text-xl" />
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-red-500/20"
          >
            3
          </motion.span>
        </motion.button>

        {/* Profile Section */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3 pl-4 border-l border-white/10 cursor-pointer group relative"
        >
          <div className="relative">
            <FaUserCircle className="text-gray-300 text-3xl transition-transform group-hover:scale-105" />
            <div className="absolute bottom-0.5 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#0a0a0a] shadow-sm" />
          </div>
          
          <div className="flex flex-col">
            <span className="text-gray-200 font-medium text-sm">John Doe</span>
            <span className="text-xs text-gray-400">Administrator</span>
          </div>
          
          <FiChevronDown className="text-gray-400 ml-1.5 text-lg transition-transform group-hover:rotate-180" />
          
          {/* Profile Dropdown */}
       
          </motion.div>
      </div>
    </motion.nav>
  );
}