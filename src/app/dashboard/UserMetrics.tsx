"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/Card";
import Charts from "@/components/Charts";
import { FiActivity, FiClock, FiUsers } from "react-icons/fi";
import { useDashboardSocket } from "@/hooks/useDashboardSocket"; // 👈 WebSocket Hook

export default function DashboardPage() {
  const stats = useDashboardSocket();

  const statsData = [
    {
      title: "TOTAL QUERIES",
      value: stats ? stats.totalQueries.toLocaleString() : "Loading...",
      icon: <FiActivity />,
      trend: "+14.2%", // Optional: make dynamic
      metric: "AVG RESPONSE TIME",
      metricValue: stats ? `${stats.avgResponseTime}s` : "Loading...",
    },
    {
      title: "ACTIVE USERS",
      value: stats ? stats.activeUsers.toLocaleString() : "Loading...",
      icon: <FiUsers />,
      trend: "+22.1%",
      metric: "FREQUENT INQUIRY",
      metricValue: stats?.frequentInquiry ?? "Loading...",
    },
    {
      title: "USAGE PATTERNS",
      value: "PEAK TIMES",
      icon: <FiClock />,
      trend: "+9.3%",
      metric: "DAILY PEAK",
      metricValue: stats?.dailyPeak ?? "Loading...",
    },
  ];

  const metricFooter = [
    {
      label: "Avg. Response",
      value: stats ? `${stats.avgResponseTime}s` : "Loading...",
      change: "+0.4s",
    },
    {
      label: "Active Users",
      value: stats ? `${(stats.activeUsers / 1000).toFixed(1)}k` : "Loading...",
      change: "↑12%",
    },
    {
      label: "Resolutions",
      value: stats ? `${stats.resolutions}%` : "Loading...",
      change: "↑4.2%",
    },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsData.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border border-neutral-800 bg-neutral-900">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-500/10 rounded-lg">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="text-emerald-500 text-xl"
                      >
                        {stat.icon}
                      </motion.div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-neutral-400 uppercase">
                        {stat.title}
                      </h3>
                      <p className="text-2xl font-semibold text-white mt-1">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-sm rounded-full">
                    {stat.trend}
                  </span>
                </div>
                <div className="pt-4 border-t border-neutral-800">
                  <p className="text-sm text-neutral-400">{stat.metric}</p>
                  <p className="text-lg font-medium text-white mt-1">
                    {stat.metricValue}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <Card className="border border-neutral-800 bg-neutral-900">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-white">
                  Usage Analytics
                </h3>
                <p className="text-sm text-neutral-400">
                  Interaction metrics over time
                </p>
              </div>
              <div className="flex gap-2">
                {["7D", "30D", "90D"].map((range, idx) => (
                  <button
                    key={range}
                    className={`px-3 py-1.5 rounded-lg text-sm ${
                      idx === 0
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Integrated Charts Component (Already Real-Time) */}
            <Charts />

            <div className="mt-6 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row gap-6">
              {metricFooter.map((metric, idx) => (
                <div key={idx} className="flex-1">
                  <div className="text-sm text-neutral-400">{metric.label}</div>
                  <div className="text-xl font-semibold text-white mt-1">
                    {metric.value}
                  </div>
                  <div className="text-xs mt-1 text-emerald-500">{metric.change}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
