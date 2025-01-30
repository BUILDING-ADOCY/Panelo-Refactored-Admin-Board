// src/app/dashboard/page.tsx
"use client";

import { motion } from "framer-motion";
import Stats from "./Stats";
import UserMetrics from "./UserMetrics";
import { Card, CardContent } from "@/components/Card";
import { FaComment, FaCog, FaRobot } from "react-icons/fa";

export default function DashboardPage() {
  return (
    <motion.main 
      className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#121212]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header Section */}
      <motion.header
        className="mb-8 lg:mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="flex items-center gap-4">
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-4xl"
          >
        
          </motion.div>
          <h1 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full" />
          <span className="text-sm text-gray-300">All Systems Operational</span>
        </div>
      </motion.header>

      {/* Stats Section */}
      <Stats />

      {/* User Metrics Section */}
      <UserMetrics />

      {/* Chatbot Management Section */}
      <motion.section 
        className="mt-8 lg:mt-12"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2 className="text-xl lg:text-2xl font-semibold mb-6 text-gray-100">
          Chatbot Controls
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {[
            { 
              title: "Live Chat Monitor",
              description: "Monitor and manage real-time conversations",
              icon: <FaComment className="text-2xl" />,
              button: "View Live Chats",
              color: "blue"
            },
            { 
              title: "AI Training",
              description: "Update knowledge base and model configurations",
              icon: <FaCog className="text-2xl" />,
              button: "Manage Training",
              color: "green"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
            >
              <Card className="hover:border-white/20 transition-colors group">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className={`mb-4 p-3 rounded-xl bg-${item.color}-500/10 w-fit`}>
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className={`text-${item.color}-400`}
                      >
                        {item.icon}
                      </motion.div>
                    </div>
                    <h3 className="text-lg lg:text-xl font-semibold text-gray-100 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 mb-6 flex-1">
                      {item.description}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full bg-${item.color}-500/20 hover:bg-${item.color}-500/30 text-${item.color}-400 px-6 py-3 rounded-lg transition-all flex items-center justify-between`}
                    >
                      <span>{item.button}</span>
                      <FaRobot className="text-lg" />
                    </motion.button>
                  </div>
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(200px_at_50%_150%,rgba(99,102,241,0.1),transparent)]" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.main>
  );
}