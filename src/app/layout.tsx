import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext"; // Ensuring Auth Context
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin Panel | Next.js App",
  description: "Optimized Next.js Admin Panel with Firebase Authentication",
  keywords: ["Next.js", "Admin Panel", "Firebase Auth", "Web App"],
  authors: [{ name: "Suraj Mahapatra", url: "https://yourwebsite.com" }],
  openGraph: {
    title: "Admin Panel | Next.js App",
    description: "Optimized Next.js Admin Panel with Firebase Authentication",
    siteName: "Admin Panel",
    url: "https://yourwebsite.com",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <AuthProvider>
          <main className="min-h-screen flex flex-col">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}