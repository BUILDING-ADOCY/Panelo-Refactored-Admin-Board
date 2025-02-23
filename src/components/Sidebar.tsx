"use client";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { FaChartPie, FaCog, FaBell, FaQuestionCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radius = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(${radius}px`;

  useEffect(() => {
    animate(radius, 20, { duration: 0.8, ease: "easeOut" });
  }, []);

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0, scale: 0.95 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        scale: { duration: 0.6, ease: "backOut" }
      }}
      className="bg-gray-900 text-white w-80 min-h-screen p-8 flex flex-col justify-between border-r border-gray-800/50 rounded-r-3xl relative overflow-hidden"
      onMouseMove={(e) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - bounds.left);
        mouseY.set(e.clientY - bounds.top);
      }}
      style={{ background }}
    >
      {/* Animated border gradient */}
      <motion.div 
        className="absolute inset-0 border-r border-gray-700/30 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      />
      
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h1 
          className="text-2xl font-semibold tracking-tight"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Admin Suite
          </span>
        </h1>
      </motion.div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1, 
              transition: { 
                staggerChildren: 0.12,
                delayChildren: 0.3
              } 
            },
          }}
          className="space-y-1"
        >
          <SidebarItem 
            href="/dashboard" 
            icon={<FaChartPie className="w-5 h-5" />} 
            text="Dashboard" 
            active={pathname === "/dashboard"} 
          />
          {/* <SidebarItem
            href="/notifications"
            icon={<FaBell className="w-5 h-5" />}
            text="Notifications"
            active={pathname === "/notifications"}
          /> */}
          <SidebarItem 
            href="/settings" 
            icon={<FaCog className="w-5 h-5" />} 
            text="Settings" 
            active={pathname === "/settings"} 
          />
          <SidebarItem 
            href="/faq" 
            icon={<FaQuestionCircle className="w-5 h-5" />} 
            text="FAQ" 
            active={pathname === "/faq"} 
          />
        </motion.ul>
      </nav>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-auto pt-8 border-t border-gray-800/50"
      >
        <p className="text-sm text-gray-400 font-light tracking-wide">
          © 2025 AdminSuite v2.0
        </p>
      </motion.div>
    </motion.aside>
  );
}

const SidebarItem = ({
  href,
  icon,
  text,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
  active?: boolean;
}) => {
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, x: -12 },
        visible: { 
          opacity: 1, 
          x: 0, 
          transition: { 
            type: "spring", 
            stiffness: 260,
            damping: 20
          } 
        },
      }}
      className="relative"
    >
      <Link
        href={href}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative group ${
          active ? "bg-gray-800/50" : "hover:bg-gray-800/30"
        }`}
      >
        <motion.span
          className={`p-2 rounded-md backdrop-blur-sm ${
            active 
              ? "bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg"
              : "bg-gray-800/50 text-gray-300 group-hover:bg-gray-700/50"
          }`}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {icon}
        </motion.span>
        
        <span className={`text-base font-medium ${
          active ? "text-blue-100" : "text-gray-300"
        }`}>
          {text}
        </span>

        {active && (
          <motion.div
            layoutId="active-pill"
            className="absolute inset-0 border border-gray-700/50 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-400/10 shadow-xl"
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        )}
        
        {/* Hover effect */}
        {!active && (
          <motion.div
            className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.2 }}
          />
        )}
      </Link>
    </motion.li>
  );
};