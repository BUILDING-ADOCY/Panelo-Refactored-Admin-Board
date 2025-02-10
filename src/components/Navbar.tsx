"use client";
import { motion } from "framer-motion";
import { FaBell, FaUserCircle, FaSearch } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
      className="bg-black/95 backdrop-blur-md border-b border-gray-700 px-6 py-4 flex justify-between items-center shadow-lg shadow-black/50"
    >
      {/* Left Section */}
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-bold text-white uppercase">
          Dashboard
        </h1>

        {/* Search Bar */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          // Added rounded-full for a rounded search bar container
          className="flex items-center bg-gray-800 backdrop-blur-sm pl-5 pr-4 py-2 gap-3 transition-all rounded-full"
        >
          <FaSearch className="text-white text-lg" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-white placeholder-gray-400 text-sm w-40 focus:w-56 transition-all duration-300"
          />
        </motion.div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          // Added rounded-xl for a rounded notifications button
          className="relative p-2.5 bg-gray-800 hover:bg-gray-700 transition-all group rounded-xl"
        >
          <FaBell className="text-white text-xl" />
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute top-0 right-0 bg-white text-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg"
          >
            3
          </motion.span>
        </motion.button>

        {/* Profile Section */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex items-center gap-3 pl-4 border-l border-gray-700 cursor-pointer group relative"
        >
          <div className="relative">
            <FaUserCircle className="text-white text-3xl transition-transform group-hover:scale-105" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-white rounded-full border-2 border-black" />
          </div>

          <div className="flex flex-col">
            <span className="text-white font-medium text-sm">John Doe</span>
            <span className="text-xs text-gray-400">Administrator</span>
          </div>

          <FiChevronDown className="text-white ml-1.5 text-lg transition-transform group-hover:rotate-180" />

          {/* Profile Dropdown (Placeholder) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
            className="absolute top-full right-0 mt-3 w-48 bg-black/95 backdrop-blur-md shadow-xl border border-gray-700 overflow-hidden"
          >
            {/* Dropdown items can be added here */}
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  );
}