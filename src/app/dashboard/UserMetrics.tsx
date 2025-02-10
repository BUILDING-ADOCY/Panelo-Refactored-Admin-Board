// src/app/dashboard/UserMetrics.tsx
"use client";

import { Card, CardContent } from "@/components/Card";
import Charts from "@/components/Charts";
import { FaQuestionCircle, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

export default function UserMetrics() {
  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-black p-6"
      // Enforce "Arial Black" for all text in this section.
      style={{ fontFamily: "Arial Black" }}
    >
      {/* Most Asked Question Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
      >
        <Card className="hover:border-white/30 transition-colors border border-transparent">
          <CardContent className="relative group bg-black p-4 rounded-xl shadow-lg">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 rounded-xl">
                <FaQuestionCircle className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  Most Asked Question
                  <FiAlertCircle
                    className="text-white text-sm cursor-help"
                    title="Based on last 30 days data"
                  />
                </h3>
                <p className="text-white mt-2 text-lg font-medium opacity-80">
                  "Where is the exam schedule?"
                </p>
                <div className="mt-4 flex items-center gap-3 text-sm">
                  <span className="bg-white/10 px-3 py-1 rounded-full border border-white/20">
                    142 inquiries
                  </span>
                  <span className="bg-white/10 px-3 py-1 rounded-full border border-white/20">
                    98% resolved
                  </span>
                </div>
              </div>
            </div>
            {/* A subtle white radial gradient on hover */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(200px_at_50%_150%,rgba(255,255,255,0.1),transparent)]" />
          </CardContent>
        </Card>
      </motion.div>

      {/* Peak Usage Patterns Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, type: "spring", stiffness: 100 }}
      >
        <Card className="hover:border-white/30 transition-colors border border-transparent">
          <CardContent className="relative group bg-black p-4 rounded-xl shadow-lg">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 rounded-xl">
                <FaClock className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Peak Usage Patterns
                </h3>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between text-white opacity-80">
                    <span>Daily Peak</span>
                    <span className="font-medium">7:00 PM - 10:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between text-white opacity-80">
                    <span>Weekly Peak</span>
                    <span className="font-medium">Thursday</span>
                  </div>
                  <div className="flex items-center justify-between text-white opacity-80">
                    <span>Monthly Peak</span>
                    <span className="font-medium">Week 2</span>
                  </div>
                </div>
              </div>
            </div>
            {/* White radial gradient overlay on hover */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(200px_at_50%_150%,rgba(255,255,255,0.1),transparent)]" />
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts Section */}
      <motion.div
        className="col-span-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        <Card className="bg-black border border-white/10 shadow-lg">
          <CardContent className="pt-6 bg-black">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">
                Usage Analytics
              </h3>
              <div className="flex gap-2">
                <button className="text-sm px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/20">
                  Last 7 days
                </button>
                <button className="text-sm px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/20">
                  Last 30 days
                </button>
              </div>
            </div>
            <Charts />
            <div className="mt-4 flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-white rounded-full" />
                <span className="text-white opacity-80">User Activity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-500 rounded-full" />
                <span className="text-white opacity-80">Response Times</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}