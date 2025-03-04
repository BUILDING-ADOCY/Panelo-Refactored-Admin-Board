"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { FiEdit2, FiArrowLeft, FiSave } from "react-icons/fi";

export default function EditFaqPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [formData, setFormData] = useState({
    question: "",
    answer: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const res = await fetch(`/api/faq/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch FAQ: ${res.statusText}`);
        }
        const data = await res.json();
        setFormData({
          question: data.question,
          answer: data.answer
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load FAQ");
        setTimeout(() => setError(""), 5000);
      }
    };

    if (id) fetchFAQ();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await fetch(`/api/faq/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update FAQ");
      }

      router.push("/faq");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
      setTimeout(() => setError(""), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl bg-neutral-900 rounded-xl border border-neutral-800 p-8 shadow-xl"
      >
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-white"
          >
            <FiArrowLeft className="text-xl" />
          </motion.button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/10 rounded-xl">
              <FiEdit2 className="text-emerald-500 text-xl" />
            </div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-semibold text-white"
            >
              Edit FAQ
            </motion.h1>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-red-500/10 text-red-500 rounded-lg border border-red-500/20"
          >
            {error}
          </motion.div>
        )}

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              Question
            </label>
            <input
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="w-full bg-neutral-800/50 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="Enter your question"
              required
            />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              Answer
            </label>
            <textarea
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              className="w-full bg-neutral-800/50 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all h-32 resize-none"
              placeholder="Provide detailed answer"
              required
            />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600/20 text-emerald-500 px-6 py-3 rounded-lg border border-emerald-500/30 hover:border-emerald-500/50 hover:bg-emerald-600/30 transition-colors font-medium disabled:opacity-50"
            >
              {isLoading ? (
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Saving...
                </motion.span>
              ) : (
                <>
                  <FiSave className="text-lg" />
                  <span>Update FAQ</span>
                </>
              )}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}