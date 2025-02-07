// src/components/Charts.tsx
"use client";

import React from "react";
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
    <section className="bg-gray-900 shadow-xl rounded-xl p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">📊 Chatbot Activity</h2>

      {/* LINE CHART - Queries Over Time */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">📈 Queries Per Day</h3>
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
            <CartesianGrid stroke="#444" strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fill: "#fff" }} />
            <YAxis tick={{ fill: "#fff" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#333",
                border: "none",
                borderRadius: "8px",
              }}
            />
            <Legend wrapperStyle={{ color: "#fff" }} />
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
      </div>

      {/* BAR CHART - Active Users Over Time */}
      <div>
        <h3 className="text-xl font-semibold mb-4">👥 Active Users Per Day</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chatbotData}
            margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
          >
            <CartesianGrid stroke="#444" strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fill: "#fff" }} />
            <YAxis tick={{ fill: "#fff" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#333",
                border: "none",
                borderRadius: "8px",
              }}
            />
            <Legend wrapperStyle={{ color: "#fff" }} />
            <Bar dataKey="users" fill="#82ca9d" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}