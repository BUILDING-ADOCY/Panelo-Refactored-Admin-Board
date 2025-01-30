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
  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, rgba(99, 102, 241, 0.15), transparent 80%)`;

  useEffect(() => {
    animate(radius, 100, { duration: 0.5 });
  }, []);

  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#0a0a0a] text-white w-80 min-h-screen p-8 shadow-2xl flex flex-col justify-between border-r border-white/10 rounded-r-3xl"
      onMouseMove={(e) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - bounds.left);
        mouseY.set(e.clientY - bounds.top);
      }}
      style={{ background }}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          AdminPanel
        </h1>
      </motion.div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="space-y-2"
        >
          <SidebarItem href="/dashboard" icon={<FaChartPie />} text="Dashboard" active={pathname === "/dashboard"} />
          <SidebarItem
            href="/notifications"
            icon={<FaBell />}
            text="Notifications"
            active={pathname === "/notifications"}
          />
          <SidebarItem href="/settings" icon={<FaCog />} text="Settings" active={pathname === "/settings"} />
          <SidebarItem href="/faq" icon={<FaQuestionCircle />} text="FAQ" active={pathname === "/faq"} />
        </motion.ul>
      </nav>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-auto pt-8 border-t border-white/5"
      >
        <p className="text-sm text-gray-400/80">© 2025 AdminPanel v2.0</p>
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
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120 } },
      }}
      className="relative"
    >
      <Link
        href={href}
        className={`flex items-center gap-4 px-5 py-3 rounded-xl transition-all ${
          active
            ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-400 border border-indigo-500/30 shadow-lg shadow-indigo-500/10"
            : "hover:bg-white/5"
        }`}
      >
        <span
          className={`p-2 rounded-lg ${
            active ? "bg-indigo-500/20 text-indigo-400" : "bg-white/5 text-gray-400"
          }`}
        >
          {icon}
        </span>
        <span className="text-lg font-medium">{text}</span>
        {active && (
          <motion.div
            layoutId="active-pill"
            className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-xl shadow-lg shadow-indigo-500/10"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </Link>
    </motion.li>
  );
};