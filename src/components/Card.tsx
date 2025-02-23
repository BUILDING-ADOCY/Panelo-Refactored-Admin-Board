"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { FiArrowUpRight } from "react-icons/fi";

interface CardProps {
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  onClick?: () => void;
  className?: string;
  hoverEffect?: boolean;
}

export function Card({
  title,
  subtitle,
  icon,
  children,
  footer,
  onClick,
  className,
  hoverEffect = true,
}: CardProps) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 transition-all ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
      whileHover={hoverEffect ? { y: -4 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={onClick}
    >
      {/* Subtle hover gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(400px_at_50%_120%,rgba(16,185,129,0.03),transparent)] opacity-0 transition-opacity duration-300 hover:opacity-100" />

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        {title && (
          <div className="p-6 pb-4">
            <div className="flex items-start gap-4">
              {icon && (
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 backdrop-blur-sm">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-emerald-500 text-xl"
                  >
                    {icon}
                  </motion.div>
                </div>
              )}
              <div className="flex-1 space-y-1">
                <h3 className="text-xl font-semibold text-white tracking-tight">
                  {title}
                </h3>
                {subtitle && (
                  <p className="text-sm text-neutral-400 font-medium tracking-wide">
                    {subtitle}
                  </p>
                )}
              </div>
              {onClick && (
                <FiArrowUpRight className="text-neutral-500 mt-1.5 shrink-0" />
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 pt-0 flex-1">
          <div className="text-neutral-300 font-normal tracking-wide leading-relaxed">
            {children}
          </div>
        </div>

        {/* Footer */}
        {footer && (
          <div className="border-t border-neutral-800 bg-neutral-950/30 px-6 py-4 backdrop-blur-lg">
            {footer}
          </div>
        )}
      </div>
    </motion.div>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function CardContent({ children, className, noPadding }: CardContentProps) {
  return (
    <div className={`${noPadding ? "" : "px-6 py-4"} ${className}`}>
      <div className="text-neutral-300 font-normal tracking-wide leading-relaxed">
        {children}
      </div>
    </div>
  );
}