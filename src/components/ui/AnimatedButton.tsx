"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const variants = {
  primary:
    "bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#8b5cf6] text-white border border-blue-300/20 shadow-[0_6px_28px_rgba(99,102,241,0.4)] hover:shadow-[0_10px_36px_rgba(139,92,246,0.5)]",
  secondary:
    "bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white border border-purple-300/20 shadow-[0_4px_20px_rgba(124,58,237,0.35)] hover:shadow-[0_8px_28px_rgba(168,85,247,0.45)]",
  ghost:
    "bg-white/6 text-indigo-100 border border-white/10 hover:bg-white/10 hover:border-indigo-400/35 backdrop-blur-sm",
  outline:
    "border-2 border-indigo-400/40 bg-transparent text-indigo-100 hover:border-violet-400/70 hover:bg-indigo-500/10",
};

const sizes = {
  sm: "min-h-[44px] px-5 py-2.5 text-sm",
  md: "min-h-[48px] px-8 py-3.5 text-base",
  lg: "min-h-[54px] px-10 py-4 text-lg",
};

export function AnimatedButton({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: AnimatedButtonProps) {
  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.03, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      disabled={disabled}
      className={`relative overflow-hidden rounded-2xl font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {(variant === "primary" || variant === "secondary") && !disabled && (
        <>
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.2 }}
          />
          <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
        </>
      )}
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </motion.button>
  );
}
