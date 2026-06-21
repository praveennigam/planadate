"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ACTIVITY_CONFIG,
  type ActivityId,
  type TimeSlot,
} from "@/types/date-plan";
import { SelectedChips, StepFooter } from "@/components/ui/SelectionGrid";
import { StepHeader, StepShell } from "@/components/ui/StepLayout";

interface StepActivityMenuProps {
  timeSlot: TimeSlot;
  activities: ActivityId[];
  onToggle: (id: ActivityId) => void;
  onNext: () => void;
}

const FLOATING_EMOJIS: Record<TimeSlot, string[]> = {
  evening: ["🍔", "🍝", "🍕", "🍣", "🌮"],
  night: ["🎬", "🎸", "⭐", "🍸", "💃"],
  "late-night": ["🌙", "📺", "😴", "🍿", "🤗"],
};

export function StepActivityMenu({
  timeSlot,
  activities,
  onToggle,
  onNext,
}: StepActivityMenuProps) {
  const config = ACTIVITY_CONFIG[timeSlot];

  return (
    <StepShell wide>
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]">
        {FLOATING_EMOJIS[timeSlot].map((emoji, i) => (
          <motion.span
            key={emoji}
            className="absolute text-xl opacity-10 sm:text-2xl"
            style={{ left: `${8 + i * 18}%`, top: `${12 + (i % 3) * 22}%` }}
            animate={{ y: [0, -12, 0], opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={timeSlot}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
        >
          <StepHeader
            emoji={config.emoji}
            title={config.title}
            subtitle={config.subtitle}
            accent="amber"
          />

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
            {config.items.map((item, i) => {
              const selected = activities.includes(item.id);
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  initial={{ opacity: 0, y: 16, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.04, y: -3 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => onToggle(item.id)}
                  className={`select-card glass-card relative flex min-h-[84px] flex-col items-center justify-center rounded-2xl p-3 sm:min-h-[92px] ${
                    selected ? "selected" : ""
                  }`}
                >
                  <motion.span
                    className="text-3xl sm:text-4xl"
                    animate={selected ? { scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] } : {}}
                  >
                    {item.emoji}
                  </motion.span>
                  <p className="mt-2 text-center text-xs font-medium text-rose-100 sm:text-sm">
                    {item.label}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <SelectedChips items={config.items} selectedIds={activities} />
      <StepFooter
        show={activities.length > 0}
        onContinue={onNext}
        hint="Looking delicious! 😋"
      />
    </StepShell>
  );
}
