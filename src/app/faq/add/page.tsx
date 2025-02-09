// src/app/faq/add/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddFaqPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer }),
      });
      if (!res.ok) throw new Error(`Error: ${res.statusText}`);
      router.push("/faq");
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-black mb-6">Add FAQ</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="question" className="block text-black font-medium mb-2">
              Question
            </label>
            <input
              id="question"
              type="text"
              className="border border-black rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-black"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="answer" className="block text-black font-medium mb-2">
              Answer
            </label>
            <textarea
              id="answer"
              className="border border-black rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-black text-black"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-3 rounded-md border border-black hover:bg-white hover:text-black transition duration-200"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}