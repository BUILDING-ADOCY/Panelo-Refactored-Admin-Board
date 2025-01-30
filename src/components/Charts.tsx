// src/components/Charts.tsx
"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

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
    <section className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">📊 Chatbot Activity</h2>

      {/* LINE CHART - Queries Over Time */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">📈 Queries Per Day</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chatbotData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="queries" stroke="#8884d8" strokeWidth={3} dot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* BAR CHART - Active Users Over Time */}
      <div>
        <h3 className="text-lg font-semibold mb-2">👥 Active Users Per Day</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chatbotData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#82ca9d" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
