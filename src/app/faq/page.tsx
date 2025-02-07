// app/(admin)/faq/page.tsx
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FAQ } from '@prisma/client'; // Assuming you're using Prisma

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [selectedFaq, setSelectedFaq] = useState<FAQ | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await fetch('/api/faq');
      const data = await response.json();
      setFaqs(data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/faq/${id}`, { method: 'DELETE' });
      fetchFAQs();
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">FAQ Management</h1>
      
      <button 
        onClick={() => setShowAddModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add New FAQ
      </button>

      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Question</th>
              <th className="px-4 py-2">Answer</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq) => (
              <tr key={faq.id} className="border-b">
                <td className="px-4 py-2">{faq.question}</td>
                <td className="px-4 py-2">{faq.answer}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => {
                      setSelectedFaq(faq);
                      setShowEditModal(true);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <AddFAQ
          onClose={() => setShowAddModal(false)}
          refreshList={fetchFAQs}
        />
      )}

      {showEditModal && selectedFaq && (
        <EditFAQ
          faq={selectedFaq}
          onClose={() => setShowEditModal(false)}
          refreshList={fetchFAQs}
        />
      )}
    </div>
  );
}