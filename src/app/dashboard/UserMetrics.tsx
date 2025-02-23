"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/Card";
import Charts from "@/components/Charts";
import { FiActivity, FiClock, FiUsers, FiAlertCircle } from "react-icons/fi";

const statsData = [
  {
    title: "TOTAL QUERIES",
    value: "12,345",
    icon: <FiActivity />,
    trend: "+14.2%",
    metric: "AVG RESPONSE TIME",
    metricValue: "1.2s"
  },
  {
    title: "ACTIVE USERS",
    value: "5,678",
    icon: <FiUsers />,
    trend: "+22.1%",
    metric: "FREQUENT INQUIRY",
    metricValue: '"Exam Schedule Availability"'
  },
  {
    title: "USAGE PATTERNS",
    value: "PEAK TIMES",
    icon: <FiClock />,
    trend: "+9.3%",
    metric: "DAILY PEAK",
    metricValue: "7:00 - 10:00 PM"
  }
];

export default function DashboardPage() {
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
                {['7D', '30D', '90D'].map((range, idx) => (
                  <button
                    key={range}
                    className={`px-3 py-1.5 rounded-lg text-sm ${
                      idx === 0
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Integrated Charts Component */}
            <Charts />
            
            <div className="mt-6 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row gap-6">
              {[
                { label: 'Avg. Response', value: '1.2s', change: '+0.4s' },
                { label: 'Active Users', value: '5.6k', change: '↑12%' },
                { label: 'Resolutions', value: '89%', change: '↑4.2%' },
              ].map((metric, idx) => (
                <div key={metric.label} className="flex-1">
                  <div className="text-sm text-neutral-400">{metric.label}</div>
                  <div className="text-xl font-semibold text-white mt-1">
                    {metric.value}
                  </div>
                  <div className="text-xs mt-1 text-emerald-500">
                    {metric.change}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}