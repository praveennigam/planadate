"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface WizardShellProps {
  children: ReactNode;
}

export function WizardShell({ children }: WizardShellProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="wizard-shell mx-auto w-full"
    >
      <div className="glass-card glow-border relative flex flex-col overflow-hidden rounded-3xl">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

        <header className="wizard-brand shrink-0 border-b border-indigo-400/10 px-5 py-4 text-center sm:px-7 sm:py-5">
          <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.32em] text-indigo-300/50 sm:text-xs">
            A special invitation
          </p>
          <h1 className="flex items-center justify-center gap-2 font-serif text-xl font-bold sm:text-2xl">
            <span className="shimmer-text">Make A Date</span>
            <span className="text-xl sm:text-2xl">💕</span>
          </h1>
        </header>

        <div className="wizard-body relative flex min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-6 py-5 sm:px-8 sm:py-6">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

interface StepHeaderProps {
  emoji: string;
  title: string;
  subtitle: string;
  accent?: "rose" | "purple" | "amber" | "pink";
  compact?: boolean;
}

const accentGlow: Record<string, string> = {
  rose: "drop-shadow(0 0 24px rgba(99, 102, 241, 0.55))",
  purple: "drop-shadow(0 0 24px rgba(139, 92, 246, 0.55))",
  amber: "drop-shadow(0 0 24px rgba(96, 165, 250, 0.45))",
  pink: "drop-shadow(0 0 24px rgba(129, 140, 248, 0.5))",
};

const accentRing: Record<string, string> = {
  rose: "from-blue-500/20 via-indigo-500/12 to-violet-500/18",
  purple: "from-indigo-500/22 via-violet-500/12 to-purple-500/18",
  amber: "from-sky-500/20 via-blue-500/12 to-indigo-500/18",
  pink: "from-indigo-500/20 via-violet-500/12 to-purple-500/18",
};

export function StepHeader({
  emoji,
  title,
  subtitle,
  accent = "purple",
  compact = false,
}: StepHeaderProps) {
  return (
    <div className={`step-header text-center ${compact ? "mb-4" : "mb-5 sm:mb-6"}`}>
      <motion.div
        className={`relative mx-auto flex items-center justify-center ${
          compact ? "mb-3 h-14 w-14 sm:h-16 sm:w-16" : "mb-4 h-20 w-20 sm:h-24 sm:w-24"
        }`}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
      >
        <motion.div
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${accentRing[accent]} blur-sm`}
          animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className={`relative ${compact ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl"}`}
          style={{ filter: accentGlow[accent] }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {emoji}
        </motion.span>
      </motion.div>

      <motion.h2
        className={`shimmer-text mx-auto mb-2 max-w-md font-serif font-bold leading-snug ${
          compact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
        }`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
      >
        {title}
      </motion.h2>

      <motion.p
        className={`mx-auto max-w-sm leading-relaxed text-indigo-200/55 ${
          compact ? "text-xs" : "text-sm"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        {subtitle}
      </motion.p>
    </div>
  );
}

interface StepShellProps {
  children: ReactNode;
  className?: string;
  wide?: boolean;
  fullWidth?: boolean;
}

/** Inner step content wrapper — no extra card (WizardShell is the only card). */
export function StepShell({ children, className = "" }: StepShellProps) {
  return <div className={`step-content w-full ${className}`}>{children}</div>;
}

interface SectionDividerProps {
  label: string;
  emoji: string;
}

export function SectionDivider({ label, emoji }: SectionDividerProps) {
  return (
    <div className="my-6 flex items-center gap-3">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-indigo-400/15" />
      <span className="flex items-center gap-1.5 text-xs font-medium text-indigo-300/45">
        <span>{emoji}</span> {label}
      </span>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-indigo-400/15" />
    </div>
  );
}
