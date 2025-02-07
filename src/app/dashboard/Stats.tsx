// src/app/dashboard/Stats.tsx
"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/Card";
import { FaUsers, FaClock, FaChartLine, FaArrowUp } from "react-icons/fa";

const statsData = [
  { 
    title: "Total Queries", 
    value: "12,345", 
    icon: <FaChartLine />,
    trend: "14.2%"
  },
  { 
    title: "Avg. Response Time", 
    value: "1.2s", 
    icon: <FaClock />,
    trend: "↓ 0.3s"
  },
  { 
    title: "Active Users", 
    value: "5,678", 
    icon: <FaUsers />,
    trend: "↑ 22.1%"
  },
];

export default function Stats() {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 bg-black p-6"
      style={{ fontFamily: "Arial Black" }}
    >
      {statsData.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative group"
        >
          <Card className="hover:border-white/20 transition-all border border-transparent">
            <CardContent className="p-6 bg-black rounded-xl shadow-lg relative">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <div className="mb-4 p-3 rounded-xl bg-white/10 w-fit">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 4 }}
                      className="text-white text-2xl"
                    >
                      {stat.icon}
                    </motion.div>
                  </div>
                  <h3 className="text-gray-300 text-sm font-medium mb-1">
                    {stat.title}
                  </h3>
                  <p className="text-3xl font-bold text-gray-100">
                    {stat.value}
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                  <FaArrowUp className="text-white text-sm" />
                  <span className="text-white text-sm font-medium">
                    {stat.trend}
                  </span>
                </div>
              </div>
              {/* Subtle white radial gradient overlay on hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(200px_at_50%_150%,rgba(255,255,255,0.1),transparent)]" />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </section>
  );
}