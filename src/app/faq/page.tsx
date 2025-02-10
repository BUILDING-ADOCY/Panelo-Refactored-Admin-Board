"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

const textContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const textVariant = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
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
      const res = await fetch(`/api/faq/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Error: ${res.statusText}`);
      setFaqs((prev) => prev.filter((faq) => faq.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-white mb-4 sm:mb-0"
            style={{ fontFamily: "'Arial Black', Gadget, sans-serif" }}
          >
            Frequently Asked Questions
          </motion.h1>
          <Link href="/faq/add">
            <button className="flex items-center gap-2 bg-white text-black py-2 px-6 rounded-full font-bold transition-colors duration-200 hover:bg-[#25D366] hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add New
            </button>
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-600 text-white px-4 py-3 rounded mb-6"
          >
            {error}
          </motion.div>
        )}

        {/* FAQ List */}
        <ul className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.li
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-md transition-colors duration-200 hover:bg-white/10"
            >
              <motion.div
                variants={textContainerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.h3
                  variants={textVariant}
                  className="text-2xl font-semibold text-gray-200"
                >
                  {faq.question}
                </motion.h3>
                <motion.p
                  variants={textVariant}
                  className="text-gray-400 leading-relaxed"
                >
                  {faq.answer}
                </motion.p>
              </motion.div>
              <div className="flex items-center gap-4 mt-4">
                <Link href={`/faq/edit?id=${faq.id}`}>
                  <button className="flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg font-medium shadow-sm transition-colors duration-200 hover:bg-green-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(faq.id)}
                  className="flex items-center gap-2 bg-red-600 text-white py-2 px-4 rounded-lg font-medium shadow-sm transition-colors duration-200 hover:bg-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}