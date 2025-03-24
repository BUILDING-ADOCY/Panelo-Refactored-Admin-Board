"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Area,
} from "recharts";
import { FiActivity, FiUsers } from "react-icons/fi";
import { useLiveChartData } from "@/hooks/useLiveChartData";

export default function Charts() {
  const chatbotData = useLiveChartData();

  const avgQueries =
    chatbotData.length > 0
      ? (chatbotData.reduce((acc, d) => acc + d.queries, 0) / chatbotData.length).toFixed(1)
      : "Loading...";

  const peakUsers =
    chatbotData.length > 0
      ? Math.max(...chatbotData.map((d) => d.users))
      : "Loading...";

  const engagementRate =
    chatbotData.length > 0
      ? Math.round(
          (chatbotData.reduce((acc, d) => acc + d.users, 0) /
            (chatbotData.length * 120)) * 100
        )
      : "Loading...";

  return (
    <motion.section
      className="bg-neutral-950 rounded-2xl p-6 border border-neutral-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <motion.h2
            className="text-2xl font-semibold text-white mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Chatbot Analytics
          </motion.h2>
          <p className="text-neutral-400">Weekly interaction metrics</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900">
            <FiActivity className="text-emerald-500" />
            <span className="text-sm text-neutral-300">+24% Activity</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900">
            <FiUsers className="text-emerald-500" />
            <span className="text-sm text-neutral-300">+18% Users</span>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Line Chart */}
        <motion.div
          className="bg-neutral-900 rounded-xl p-4 border border-neutral-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-lg font-medium text-white mb-4">Query Volume</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chatbotData} margin={{ left: -20 }}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
              <XAxis
                dataKey="day"
                tick={{ fill: "#A3A3A3" }}
                axisLine={{ stroke: "#404040" }}
              />
              <YAxis
                tick={{ fill: "#A3A3A3" }}
                axisLine={{ stroke: "#404040" }}
              />
              <Tooltip
                contentStyle={{
                  background: "#171717",
                  border: "1px solid #404040",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                }}
                itemStyle={{ color: "#E5E5E5" }}
              />
              <Line
                type="monotone"
                dataKey="queries"
                stroke="#10B981"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 6,
                  fill: "#10B981",
                  stroke: "#059669",
                  strokeWidth: 2,
                }}
              />
              <Area
                type="monotone"
                dataKey="queries"
                fill="url(#lineGradient)"
                stroke="transparent"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          className="bg-neutral-900 rounded-xl p-4 border border-neutral-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-lg font-medium text-white mb-4">User Engagement</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chatbotData} margin={{ left: -20 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
              <XAxis
                dataKey="day"
                tick={{ fill: "#A3A3A3" }}
                axisLine={{ stroke: "#404040" }}
              />
              <YAxis
                tick={{ fill: "#A3A3A3" }}
                axisLine={{ stroke: "#404040" }}
              />
              <Tooltip
                contentStyle={{
                  background: "#171717",
                  border: "1px solid #404040",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                }}
                itemStyle={{ color: "#E5E5E5" }}
              />
              <Bar
                dataKey="users"
                fill="url(#barGradient)"
                radius={[4, 4, 0, 0]}
                barSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Metric Footer */}
      <div className="mt-6 pt-6 border-t border-neutral-800 flex gap-6">
        <div className="flex-1">
          <h4 className="text-sm text-neutral-400 mb-1">Avg. Queries/Day</h4>
          <p className="text-2xl font-semibold text-white">{avgQueries}</p>
        </div>
        <div className="flex-1">
          <h4 className="text-sm text-neutral-400 mb-1">Peak Users</h4>
          <p className="text-2xl font-semibold text-white">{peakUsers}</p>
        </div>
        <div className="flex-1">
          <h4 className="text-sm text-neutral-400 mb-1">Engagement Rate</h4>
          <p className="text-2xl font-semibold text-white">{engagementRate}%</p>
        </div>
      </div>
    </motion.section>
  );
}
