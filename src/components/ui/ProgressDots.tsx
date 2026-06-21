"use client";

import { motion } from "framer-motion";

const STEP_LABELS = [
  "Ask",
  "Date",
  "Time",
  "Menu",
  "Place",
  "Vibe",
  "Look",
  "Music",
  "Note",
  "Confirm",
];

interface ProgressDotsProps {
  total: number;
  current: number;
}

export function ProgressDots({ total, current }: ProgressDotsProps) {
  const progress = ((current + 1) / total) * 100;
  const label = STEP_LABELS[current] ?? `Step ${current + 1}`;

  return (
    <div className="wizard-progress w-full">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-200/75 sm:text-xs">
          {label}
        </p>
        <p className="whitespace-nowrap text-[11px] tabular-nums text-indigo-300/45 sm:text-xs">
          Step {current + 1} of {total}
        </p>
      </div>

      <div className="relative h-2 w-full overflow-hidden rounded-full bg-indigo-950/50">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#8b5cf6]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          style={{ boxShadow: "0 0 14px rgba(99, 102, 241, 0.55)" }}
        />
      </div>

      <div className="mt-3 hidden items-center justify-center gap-1.5 sm:flex">
        {Array.from({ length: total }, (_, i) => (
          <motion.div
            key={i}
            animate={{
              width: i === current ? 22 : 7,
              height: 7,
              backgroundColor: i <= current ? "#6366f1" : "rgba(255,255,255,0.1)",
              boxShadow: i === current ? "0 0 12px rgba(99, 102, 241, 0.65)" : "none",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="rounded-full"
          />
        ))}
      </div>
    </div>
  );
}
