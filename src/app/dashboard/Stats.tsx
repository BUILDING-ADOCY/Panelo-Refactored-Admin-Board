"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/Card";
import { FiUsers, FiClock, FiActivity } from "react-icons/fi";
import { useDashboardSocket } from "@/hooks/useDashboardSocket";

export default function Stats() {
  const liveStats = useDashboardSocket();

  const statsData = [
    { 
      title: "Total Queries", 
      value: liveStats ? liveStats.totalQueries.toLocaleString() : "Loading...", 
      icon: <FiActivity />,
      trend: "+14.2%", // Optional: make this dynamic later
      status: "positive"
    },
    { 
      title: "Avg. Response Time", 
      value: liveStats ? `${liveStats.avgResponseTime}s` : "Loading...", 
      icon: <FiClock />,
      trend: "-0.3s",
      status: liveStats && liveStats.avgResponseTime > 1.5 ? "negative" : "positive"
    },
    { 
      title: "Active Users", 
      value: liveStats ? liveStats.activeUsers.toLocaleString() : "Loading...", 
      icon: <FiUsers />,
      trend: "+22.1%",
      status: "positive"
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
      {statsData.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
        >
          <Card className="hover:border-neutral-700 transition-colors border border-neutral-800 bg-neutral-900">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-500/10">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-emerald-500 text-xl"
                    >
                      {stat.icon}
                    </motion.div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-sm font-medium ${
                    stat.status === 'positive' 
                      ? 'bg-emerald-500/10 text-emerald-500'
                      : 'bg-rose-500/10 text-rose-500'
                  }`}>
                    {stat.trend}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                    {stat.title}
                  </h3>
                  <p className="text-2xl font-semibold text-white">
                    {stat.value}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    stat.status === 'positive' ? 'bg-emerald-500' : 'bg-rose-500'
                  }`} />
                  <span className="text-sm text-neutral-400">
                    {stat.status === 'positive' ? 'Above average' : 'Below average'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </section>
  );
}
