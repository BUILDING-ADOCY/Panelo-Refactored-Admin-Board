import { motion } from "framer-motion";
import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white shadow-md p-4 flex justify-between items-center"
    >
      {/* Navbar Title */}
      <h1 className="text-xl font-bold">Dashboard</h1>

      {/* Icons Section */}
      <div className="flex gap-4">
        {/* Notifications Icon */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative"
        >
          <FaBell size={24} className="text-gray-700 hover:text-gray-900 transition-all" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
            3
          </span>
        </motion.button>

        {/* Profile Icon */}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <FaUserCircle size={30} className="text-gray-700 hover:text-gray-900 transition-all" />
        </motion.div>
      </div>
    </motion.nav>
  );
}