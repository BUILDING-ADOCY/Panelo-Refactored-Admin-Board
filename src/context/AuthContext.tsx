"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { 
  User, 
  onAuthStateChanged, 
  signOut, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebaseClient";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signupWithEmail: (email: string, password: string) => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Stop loading when user state is set
    });

    return () => unsubscribe();
  }, []);

  // ✅ Email/Password Signup Function with Error Handling
  const signupWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      router.push("/dashboard"); // Redirect to Dashboard after signup
    } catch (error: any) {
      console.error("Signup Error:", error);
      alert(handleAuthError(error.code));
    } finally {
      setLoading(false);
    }
  };

  // ✅ Email/Password Login Function with Error Handling
  const loginWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      router.push("/dashboard"); // Redirect to Dashboard after login
    } catch (error: any) {
      console.error("Login Error:", error);
      alert(handleAuthError(error.code));
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google Login Function with Error Handling
  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      setUser(userCredential.user);
      router.push("/dashboard"); // Redirect to Dashboard after login
    } catch (error) {
      console.error("Login Error:", error);
      alert("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout Function with Error Handling
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      router.push("/auth/login"); // Redirect to login after logout
    } catch (error) {
      console.error("Logout Error:", error);
      alert("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signupWithEmail, loginWithEmail, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Error Handling Helper Function
const handleAuthError = (code: string): string => {
  const errorMessages: Record<string, string> = {
    "auth/email-already-in-use": "This email is already registered.",
    "auth/invalid-email": "Invalid email format. Please enter a valid email.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/user-not-found": "No user found with this email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/network-request-failed": "Network error. Please check your internet connection.",
  };
  return errorMessages[code] || "An unexpected error occurred. Please try again.";
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};