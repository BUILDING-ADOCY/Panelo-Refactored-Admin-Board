import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

// Dummy FAQ data for demonstration; replace with an API call as needed.
const dummyFaqData: Record<string, { question: string; answer: string }> = {
  "1": {
    question: "How do I reset my password?",
    answer: "To reset your password, click on the 'Forgot password' link on the login page and follow the instructions."
  },
  "2": {
    question: "Where can I find the documentation?",
    answer: "Documentation is available on our website under the 'Docs' section. It covers all features and troubleshooting tips."
  },
  "3": {
    question: "How can I contact support?",
    answer: "You can contact support via the 'Contact Us' page or by emailing support@example.com."
  },
};

const EditFaq: React.FC = () => {
  const searchParams = useSearchParams();
  const faqId = searchParams.get("id") || "";
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // Populate form fields based on the FAQ id.
  useEffect(() => {
    if (faqId && dummyFaqData[faqId]) {
      const faq = dummyFaqData[faqId];
      setQuestion(faq.question);
      setAnswer(faq.answer);
    }
  }, [faqId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Insert API call or state update logic to update the FAQ.
    console.log("FAQ updated", { faqId, question, answer });
  };

  return (
    <div className="container mx-auto p-6" style={{ fontFamily: "Arial, sans-serif" }}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6"
      >
        Edit FAQ
      </motion.h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label htmlFor="question" className="block text-lg font-medium mb-2">
            Question
          </label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter FAQ question"
            required
          />
        </div>
        <div>
          <label htmlFor="answer" className="block text-lg font-medium mb-2">
            Answer
          </label>
          <textarea
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter FAQ answer"
            rows={5}
            required
          ></textarea>
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Save Changes
          </button>
          <Link href="/faq/page" passHref>
            <button
              type="button"
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditFaq;