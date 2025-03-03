"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiPlus, FiEdit, FiTrash, FiChevronRight } from "react-icons/fi";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2
    }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

export default function FAQListPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchFAQs() {
      try {
        const res = await fetch("/api/faq");
        if (!res.ok) throw new Error(`Error: ${res.statusText}`);
        const data = await res.json();
        setFaqs(data);
      } catch (err: any) {
        setError(err.message);
      }
    }
    fetchFAQs();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      const res = await fetch(`/api/faq/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Error: ${res.statusText}`);
      setFaqs((prev) => prev.filter((faq) => faq.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pb-6 border-b border-neutral-800"
        >
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold text-white">FAQ Management</h1>
            <p className="text-neutral-400">Manage frequently asked questions</p>
          </div>
          <Link href="/faq/add" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto flex items-center gap-2 bg-emerald-600/20 text-emerald-500 px-6 py-3 rounded-lg border border-emerald-500/30 hover:border-emerald-500/50 transition-colors"
            >
              <FiPlus className="text-lg" />
              <span className="font-medium">New Question</span>
            </motion.button>
          </Link>
        </motion.header>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-red-500/10 text-red-500 rounded-lg border border-red-500/20"
          >
            {error}
          </motion.div>
        )}

        {/* FAQ List */}
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {faqs.map((faq) => (
            <motion.li
              key={faq.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors"
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <h3 className="text-lg font-medium text-white">
                      {faq.question}
                    </h3>
                    <p className="text-neutral-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                  <FiChevronRight className="text-neutral-500 mt-1.5 shrink-0 group-hover:text-neutral-300 transition-colors" />
                </div>

                {/* Action Buttons */}
                <div className="mt-4 pt-4 border-t border-neutral-800 flex items-center gap-3">
                  {/* Updated edit link to pass the id as a dynamic route segment */}
                  <Link href={`/faq/edit/${faq.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 px-4 py-2 text-neutral-300 hover:text-white rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
                    >
                      <FiEdit className="text-sm" />
                      <span className="text-sm font-medium">Edit</span>
                    </motion.button>
                  </Link>
                  <motion.button
                    onClick={() => handleDelete(faq.id)}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 text-red-500 hover:text-red-400 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors"
                  >
                    <FiTrash className="text-sm" />
                    <span className="text-sm font-medium">Delete</span>
                  </motion.button>
                </div>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-[radial-gradient(200px_at_50%_120%,rgba(16,185,129,0.05),transparent] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}