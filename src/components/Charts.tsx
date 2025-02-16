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
  Legend,
} from "recharts";

// Sample data for chatbot interactions
const chatbotData = [
  { day: "Mon", queries: 120, users: 50 },
  { day: "Tue", queries: 98, users: 45 },
  { day: "Wed", queries: 150, users: 70 },
  { day: "Thu", queries: 130, users: 60 },
  { day: "Fri", queries: 170, users: 80 },
  { day: "Sat", queries: 200, users: 100 },
  { day: "Sun", queries: 220, users: 110 },
];

export default function Charts() {
  return (
    <motion.section 
      className="bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl rounded-xl p-6 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h2 
        className="text-3xl font-extrabold mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Chatbot Activity
      </motion.h2>

      {/* LINE CHART - Queries Over Time */}
      <motion.div 
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.h3 
          className="text-2xl font-semibold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Queries Per Day
        </motion.h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chatbotData}
            margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
          >
            <defs>
              <linearGradient id="lineColor" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8884d8" />
                <stop offset="100%" stopColor="#82ca9d" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#555" strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fill: "#ddd" }} />
            <YAxis tick={{ fill: "#ddd" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#222",
                border: "none",
                borderRadius: "8px",
              }}
            />
            <Legend wrapperStyle={{ color: "#ddd" }} />
            <Line
              type="monotone"
              dataKey="queries"
              stroke="url(#lineColor)"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: "#8884d8" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* BAR CHART - Active Users Over Time */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <motion.h3 
          className="text-2xl font-semibold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Active Users Per Day
        </motion.h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chatbotData}
            margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
          >
            <CartesianGrid stroke="#555" strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fill: "#ddd" }} />
            <YAxis tick={{ fill: "#ddd" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#222",
                border: "none",
                borderRadius: "8px",
              }}
            />
            <Legend wrapperStyle={{ color: "#ddd" }} />
            <Bar dataKey="users" fill="#82ca9d" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.section>
  );
}