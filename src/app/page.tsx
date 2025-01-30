"use client";

import { motion } from "framer-motion";
import { FaChartBar, FaBell, FaCog, FaUsers } from "react-icons/fa";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { JSX } from "react";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="p-8 sm:p-12">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-[var(--accent)]">
              PANELO - REFACTOR ADMIN BOARD
            </h1>
            <p className="text-[var(--text-secondary)] mt-2">
              Here’s an overview of your system.
            </p>
          </motion.div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard
              icon={<FaUsers className="text-white" size={28} />}
              title="Total Users"
              value="1,250"
            />
            <DashboardCard
              icon={<FaChartBar className="text-white" size={28} />}
              title="System Analytics"
              value="89%"
            />
            <DashboardCard
              icon={<FaBell className="text-white" size={28} />}
              title="Notifications"
              value="12 New"
            />
            <DashboardCard
              icon={<FaCog className="text-white" size={28} />}
              title="System Settings"
              value="Updated"
            />
          </div>
        </main>
      </div>
    </div>
  );
}

// Dashboard Card Component
function DashboardCard({
  icon,
  title,
  value,
}: {
  icon: JSX.Element;
  title: string;
  value: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      className="card flex items-center gap-4"
    >
      <div className="bg-gray-800 p-3 rounded-full">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </motion.div>
  );
}