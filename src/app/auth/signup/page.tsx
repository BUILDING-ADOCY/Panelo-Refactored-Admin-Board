"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const { signupWithEmail, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signupWithEmail(email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSignup} className="flex flex-col space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Sign Up
          </button>
        </form>

        <button onClick={loginWithGoogle} className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full">
          Sign Up with Google
        </button>

        <p className="mt-3 text-sm text-center">
          Already have an account? <a href="/auth/login" className="text-blue-600">Login</a>
        </p>
      </div>
    </div>
  );
}