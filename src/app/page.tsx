"use client";

import { motion } from "framer-motion";
import { FaChartBar, FaBell, FaCog, FaUsers, FaArrowUp } from "react-icons/fa";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { JSX } from "react";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#000000] to-[#121212] text-[#f5f5f5]">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="p-8 sm:p-12 overflow-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <h1
              style={{ fontFamily: "Arial Black", textTransform: "uppercase" }}
              className="text-4xl font-bold bg-gradient-to-r from-white to-white bg-clip-text text-transparent"
            >
              PANELO - REFACTOR ADMIN BOARD
            </h1>
            <p className="text-gray-400 mt-3 text-lg">
              Comprehensive overview of your system performance
            </p>
          </motion.div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <FaUsers />, title: "Total Users", value: "1,250", trend: "12.5%" },
              { icon: <FaChartBar />, title: "System Load", value: "89%", trend: "2.1%" },
              { icon: <FaBell />, title: "Notifications", value: "12 New", trend: "3" },
              { icon: <FaCog />, title: "Uptime", value: "99.99%", trend: "45d" },
            ].map((card, index) => (
              <DashboardCard
                key={index}
                icon={card.icon}
                title={card.title}
                value={card.value}
                trend={card.trend}
                index={index}
              />
            ))}
          </div>

          {/* Additional Content Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-2xl font-semibold mb-6 text-white">Performance Overview</h2>
            <div className="h-64 bg-white/5 rounded-xl border border-white/10">
              {/* Placeholder for chart */}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

function DashboardCard({
  icon,
  title,
  value,
  trend,
  index,
}: {
  icon: JSX.Element;
  title: string;
  value: string;
  trend: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "backOut" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-gradient-to-br from-white/5 to-white/2 rounded-2xl p-6 backdrop-blur-lg border border-white/10 cursor-pointer hover:border-gray-500/30 transition-all"
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <div className="mb-4 p-3 bg-white/10 rounded-xl w-fit">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-white"
            >
              {icon}
            </motion.div>
          </div>
          
          <h3 className="text-lg font-medium text-gray-300 mb-1">{title}</h3>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>

        <div className="flex items-center gap-1 bg-[#1DB954]/10 px-3 py-1 rounded-full">
  <FaArrowUp className="text-[#36ff7d] text-sm" />
  <span className="text-[#1DB954] text-sm font-medium">{trend}</span>
</div>
      </div>

      {/* Animated background gradient on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(200px_at_50%_150%,rgba(255,255,255,0.1),transparent)]" />
    </motion.div>
  );
}