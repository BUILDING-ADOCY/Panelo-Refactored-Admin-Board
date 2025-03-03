"use client";

import { motion } from "framer-motion";
import { FiBarChart, FiBell, FiUsers, FiTrendingUp, FiClock } from "react-icons/fi";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import React from "react";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] text-[#FAFAFA] font-sans">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="p-8 sm:p-12 overflow-auto">
          {/* Animated Header Section */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            className="mb-16 space-y-2"
          >
            <motion.h1
              className="text-5xl font-bold tracking-tighter bg-gradient-to-r from-[#00F0FF] to-[#00FF87] bg-clip-text text-transparent"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Panelo Dashboard
            </motion.h1>
            <motion.p
              className="text-xl text-gray-400 font-light tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Intelligent System Analytics & Monitoring
            </motion.p>
          </motion.header>

          {/* Metrics Grid with Staggered Animation */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.4
                }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { 
                icon: <FiUsers className="w-6 h-6" />, 
                title: "Active Users", 
                value: "2.8K", 
                trend: "+14.2%", 
                status: 'positive'
              },
              { 
                icon: <FiBarChart className="w-6 h-6" />, 
                title: "System Load", 
                value: "68%", 
                trend: "-3.1%", 
                status: 'negative'
              },
              { 
                icon: <FiBell className="w-6 h-6" />, 
                title: "Alerts", 
                value: "9 New", 
                trend: "2 Critical", 
                status: 'warning'
              },
              { 
                icon: <FiClock className="w-6 h-6" />, 
                title: "Response Time", 
                value: "142ms", 
                trend: "P99", 
                status: 'neutral'
              },
            ].map((card, index) => (
              <DashboardCard
                key={index}
                icon={card.icon}
                title={card.title}
                value={card.value}
                trend={card.trend}
                status={card.status}
                                index={index}

              />
            ))}
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
  status,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend: string;
  status: 'positive' | 'negative' | 'warning' | 'neutral';
}) {
  const statusConfig = {
    positive: { color: '#00FF87', icon: FiTrendingUp },
    negative: { color: '#FF4D4D', icon: FiTrendingUp },
    warning: { color: '#FFD600', icon: FiTrendingUp },
    neutral: { color: '#FFFFFF', icon: FiTrendingUp }
  };

  const IconComponent = statusConfig[status].icon;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ type: 'spring', stiffness: 80 }}
      whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300 } }}
      className="group relative bg-gradient-to-br from-white/5 to-transparent backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
    >
      <div className="relative z-10 flex flex-col space-y-6">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-white/5 rounded-lg backdrop-blur-sm">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 6 }}
            >
              {icon}
            </motion.div>
          </div>
          <div className={`px-3 py-1 rounded-full ${status !== 'neutral' ? 'bg-white/5' : ''}`}>
            <IconComponent style={{ color: statusConfig[status].color }} />
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-medium text-gray-300 tracking-tight">{title}</h3>
          <p className="text-3xl font-bold tracking-tighter">{value}</p>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium">
          <span style={{ color: statusConfig[status].color }}>{trend}</span>
        </div>
      </div>

      {/* Hover Gradient Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/10 to-[#00FF87]/10" />
        <div className="absolute -inset-2 blur-xl bg-gradient-to-br from-[#00F0FF]/20 to-transparent" />
      </motion.div>
    </motion.div>
  );
}