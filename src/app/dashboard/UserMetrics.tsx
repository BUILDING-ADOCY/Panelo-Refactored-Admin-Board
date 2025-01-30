// src/app/dashboard/UserMetrics.tsx
"use client";

import { Card, CardContent } from "@/components/Card";
import Charts from "@/components/Charts";
import { FaQuestionCircle, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

export default function UserMetrics() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Most Asked Question Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="hover:border-blue-400/30 transition-colors">
          <CardContent className="relative group">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <FaQuestionCircle className="text-blue-400 text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
                  Most Asked Question
                  <FiAlertCircle className="text-gray-400 text-sm cursor-help" 
                    title="Based on last 30 days data" />
                </h3>
                <p className="text-gray-300 mt-2 text-lg font-medium">
                  "Where is the exam schedule?"
                </p>
                <div className="mt-4 flex items-center gap-3 text-sm text-blue-300">
                  <span className="bg-blue-500/20 px-3 py-1 rounded-full">
                    142 inquiries
                  </span>
                  <span className="bg-emerald-500/20 px-3 py-1 rounded-full">
                    98% resolved
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(200px_at_50%_150%,rgba(59,130,246,0.1),transparent)]" />
          </CardContent>
        </Card>
      </motion.div>

      {/* Peak Usage Time Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="hover:border-green-400/30 transition-colors">
          <CardContent className="relative group">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-500/10 rounded-xl">
                <FaClock className="text-green-400 text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-100">
                  Peak Usage Patterns
                </h3>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between text-gray-300">
                    <span>Daily Peak</span>
                    <span className="font-medium">7:00 PM - 10:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-300">
                    <span>Weekly Peak</span>
                    <span className="font-medium">Thursday</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-300">
                    <span>Monthly Peak</span>
                    <span className="font-medium">Week 2</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(200px_at_50%_150%,rgba(34,197,94,0.1),transparent)]" />
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts Section */}
      <motion.div 
        className="col-span-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-gradient-to-br from-[#121212] to-[#0a0a0a]">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-100">
                Usage Analytics
              </h3>
              <div className="flex gap-2">
                <button className="text-sm px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  Last 7 days
                </button>
                <button className="text-sm px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  Last 30 days
                </button>
              </div>
            </div>
            <Charts />
            <div className="mt-4 flex gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                User Activity
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                Response Times
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}