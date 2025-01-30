"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function Card({ title, subtitle, icon, children, footer, onClick, className }: CardProps) {
  return (
    <motion.div
      className={`relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-indigo-400/30 transition-all ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
    >
      {/* Hover effect overlay */}
      <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity bg-[radial-gradient(200px_at_50%_150%,rgba(99,102,241,0.1),transparent)]" />

      {/* Header */}
      {title && (
        <div className="flex items-start gap-4 mb-6">
          {icon && (
            <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                {icon}
              </motion.div>
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
            {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="text-gray-300 relative z-10">{children}</div>

      {/* Footer */}
      {footer && (
        <div className="mt-6 pt-4 border-t border-white/5 backdrop-blur-sm">
          {footer}
        </div>
      )}
    </motion.div>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={`p-4 transition-all ${className}`}>
      {children}
    </div>
  );
}