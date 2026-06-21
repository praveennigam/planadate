"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { AnimatedButton } from "./AnimatedButton";

interface StepFooterProps {
  show: boolean;
  onContinue: () => void;
  label?: string;
  hint?: string;
  secondaryLabel?: string;
  onSecondary?: () => void;
}

export function StepFooter({
  show,
  onContinue,
  label = "Continue →",
  hint,
  secondaryLabel,
  onSecondary,
}: StepFooterProps) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mt-6 flex flex-col items-center gap-3 sm:mt-7"
    >
      {hint && (
        <motion.p
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="w-full rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-2.5 text-center text-sm text-violet-200/90"
        >
          {hint}
        </motion.p>
      )}
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
        {secondaryLabel && onSecondary && (
          <AnimatedButton variant="ghost" fullWidth onClick={onSecondary} className="sm:w-auto">
            {secondaryLabel}
          </AnimatedButton>
        )}
        <AnimatedButton fullWidth onClick={onContinue} className="sm:w-auto">
          {label}
        </AnimatedButton>
      </div>
    </motion.div>
  );
}

interface SelectionGridProps<T extends string> {
  items: { id: T; label: string; emoji: string; desc?: string }[];
  selected: T | T[] | null;
  onSelect: (id: T) => void;
  multi?: boolean;
  columns?: 2 | 3 | 4;
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export function SelectionGrid<T extends string>({
  items,
  selected,
  onSelect,
  multi = false,
  columns = 2,
}: SelectionGridProps<T>) {
  const isSelected = (id: T) =>
    multi ? Array.isArray(selected) && selected.includes(id) : selected === id;

  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-4",
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={`grid gap-2.5 sm:gap-3 ${gridCols[columns]}`}
    >
      {items.map((item) => {
        const active = isSelected(item.id);
        return (
          <motion.button
            key={item.id}
            type="button"
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(item.id)}
            className={`select-card relative flex min-h-[80px] flex-col items-center justify-center rounded-xl border border-indigo-400/10 bg-indigo-500/6 p-3 sm:min-h-[88px] sm:p-3.5 ${
              active ? "selected" : ""
            }`}
          >
            <motion.span
              className="text-3xl sm:text-4xl"
              animate={active ? { scale: [1, 1.25, 1], rotate: [0, -8, 8, 0] } : {}}
              transition={{ duration: 0.45 }}
            >
              {item.emoji}
            </motion.span>
            <p className="mt-1.5 text-center text-xs font-semibold leading-tight text-indigo-50 sm:text-sm">
              {item.label}
            </p>
            {item.desc && (
              <p className="mt-0.5 text-center text-[10px] text-indigo-300/45 sm:text-xs">
                {item.desc}
              </p>
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}

interface SelectedChipsProps {
  items: { id: string; label: string; emoji: string }[];
  selectedIds: string[];
}

export function SelectedChips({ items, selectedIds }: SelectedChipsProps) {
  if (!selectedIds.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-4 flex flex-wrap justify-center gap-2"
    >
      {selectedIds.map((id) => {
        const item = items.find((i) => i.id === id);
        if (!item) return null;
        return (
          <motion.span
            key={id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="rounded-full border border-indigo-400/30 bg-indigo-500/15 px-3 py-1 text-xs text-indigo-100 sm:text-sm"
          >
            {item.emoji} {item.label}
          </motion.span>
        );
      })}
    </motion.div>
  );
}

interface StepFooterWrapperProps {
  children: ReactNode;
}

export function StepFooterWrapper({ children }: StepFooterWrapperProps) {
  return <div className="pb-safe">{children}</div>;
}
