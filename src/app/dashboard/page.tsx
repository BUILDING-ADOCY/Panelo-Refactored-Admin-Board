"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { FiActivity, FiMessageSquare, FiSettings, FiDatabase } from "react-icons/fi";
import { TbRobot } from "react-icons/tb";

import Stats from "./Stats";
import UserMetrics from "./UserMetrics";
import { Card, CardContent } from "@/components/Card";

export default function DashboardPage() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user ? console.log("User is logged in: ", user.email) : console.log("User is logged out");
    });
    return () => unsubscribe();
  }, []);

  return (
    <motion.main
      className="min-h-screen bg-neutral-950 p-6 sm:p-8 lg:p-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header Section */}
      <header className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-white lg:text-4xl">Dashboard</h1>
          <p className="text-sm text-neutral-400">Platform Analytics & Management</p>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-neutral-900 px-4 py-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-sm text-neutral-300">Operational Status: Normal</span>
        </div>
      </header>

      {/* Stats Section */}
      <Stats />

      {/* User Metrics Section */}
      <UserMetrics />

      {/* AI Management Section */}
      <section className="mt-12">
        <h2 className="mb-8 text-2xl font-semibold text-white">AI Management</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Conversation Monitor",
              description: "Real-time chat monitoring and intervention",
              icon: <FiMessageSquare className="text-xl" />,
              action: "Access Live Console",
            },
            {
              title: "Model Training",
              description: "Knowledge base updates and version control",
              icon: <FiDatabase className="text-xl" />,
              action: "Configure Training",
            },
            {
              title: "Performance Analytics",
              description: "Model accuracy and response metrics",
              icon: <FiActivity className="text-xl" />,
              action: "View Reports",
            },
            {
              title: "System Settings",
              description: "Platform configuration and integrations",
              icon: <FiSettings className="text-xl" />,
              action: "Manage Settings",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
            >
              <Card className="group relative overflow-hidden border border-neutral-800 bg-neutral-900">
                <CardContent className="p-6">
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ repeat: Infinity, duration: 3 }}
                          className="text-emerald-500"
                        >
                          {item.icon}
                        </motion.div>
                      </div>
                      <TbRobot className="text-xl text-neutral-700" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-white">{item.title}</h3>
                      <p className="text-sm text-neutral-400">{item.description}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full rounded-lg bg-neutral-800 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-700"
                    >
                      {item.action}
                    </motion.button>
                  </div>
                  <div className="absolute inset-0 bg-[radial-gradient(300px_at_50%_120%,rgba(16,185,129,0.1),transparent)] opacity-0 transition-opacity group-hover:opacity-100" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.main>
  );
}