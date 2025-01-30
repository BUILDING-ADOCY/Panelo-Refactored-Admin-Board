import Link from "next/link";
import { motion } from "framer-motion";
import { FaChartPie, FaCog, FaBell, FaQuestionCircle } from "react-icons/fa";
import { JSX } from "react";

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-[#121212] text-white w-72 min-h-screen p-8 shadow-xl flex flex-col justify-between"
    >
      {/* Logo */}
      <div className="mb-8 ">
        <h1 className="text-2xl font-bold tracking-wide text-white">Admin Panel</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-4">
          <SidebarItem href="/dashboard" icon={<FaChartPie size={22} />} text="Dashboard" />
          <SidebarItem href="/notifications" icon={<FaBell size={22} />} text="Notifications" />
          <SidebarItem href="/settings" icon={<FaCog size={22} />} text="Settings" />
          <SidebarItem href="/faq" icon={<FaQuestionCircle size={22} />} text="FAQ" />
        </ul>
      </nav>

      {/* Footer */}
      <div className="mt-auto">
        <p className="text-sm text-gray-400">© 2025 Admin Panel</p>
      </div>
    </motion.aside>
  );
}

/* Reusable Sidebar Item Component */
const SidebarItem = ({ href, icon, text }: { href: string; icon: JSX.Element; text: string }) => {
  return (
    <motion.li
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="transition-all duration-300"
    >
      <Link href={href} className="flex items-center gap-4 px-4 py-3 rounded-md hover:bg-gray-800 transition-all">
        {icon}
        <span className="text-lg font-medium">{text}</span>
      </Link>
    </motion.li>
  );
};