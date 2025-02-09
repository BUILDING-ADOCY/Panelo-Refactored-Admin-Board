// src/app/faq/edit/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EditFaqPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id"); // e.g. /faq/edit?id=3

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch existing FAQ to populate the form
    async function fetchFAQ() {
      if (!id) return;
      try {
        const res = await fetch(`/api/faq/${id}`);
        if (!res.ok) throw new Error(`Failed to fetch FAQ #${id}`);
        const data = await res.json();
        setQuestion(data.question);
        setAnswer(data.answer);
      } catch (err: any) {
        setError(err.message);
      }
    }
    fetchFAQ();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;
    try {
      const res = await fetch(`/api/faq/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer }),
      });
      if (!res.ok)
        throw new Error(`Error updating FAQ #${id}: ${res.statusText}`);
      router.push("/faq");
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-black mb-6">Edit FAQ</h1>
        {error && (
          <p className="border border-black text-black px-4 py-2 rounded mb-4">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="question" className="block text-black font-medium mb-2">
              Question
            </label>
            <input
              id="question"
              type="text"
              className="border border-black rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-black text-black"
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