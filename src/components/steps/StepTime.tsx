"use client";

import { AnimatePresence, motion } from "framer-motion";
import { TIME_SLOTS, type TimeSlot } from "@/types/date-plan";
import { StepFooter } from "@/components/ui/SelectionGrid";
import { StepHeader, StepShell } from "@/components/ui/StepLayout";

interface StepTimeProps {
  timeSlot: TimeSlot | null;
  onTimeSelect: (slot: TimeSlot) => void;
  onNext: () => void;
}

export function StepTime({ timeSlot, onTimeSelect, onNext }: StepTimeProps) {
  return (
    <StepShell wide>
      <StepHeader
        emoji="🌙"
        title="What time works?"
        subtitle="Evening onwards — after 6 PM, the magic begins"
        accent="purple"
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {TIME_SLOTS.map((slot, idx) => {
          const selected = timeSlot === slot.id;
          return (
            <motion.button
              key={slot.id}
              type="button"
              initial={{ opacity: 0, y: 24, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTimeSelect(slot.id)}
              className={`select-card relative min-h-[100px] overflow-hidden rounded-xl border border-indigo-400/10 bg-indigo-500/6 p-4 text-center sm:min-h-[110px] sm:p-5 ${
                selected ? "selected" : ""
              }`}
            >
              <motion.span
                className="relative block text-4xl sm:text-5xl"
                animate={
                  selected
                    ? { scale: [1, 1.25, 1], rotate: [0, -8, 8, 0] }
                    : { y: [0, -4, 0] }
                }
                transition={
                  selected
                    ? { duration: 0.5 }
                    : { duration: 2.5, repeat: Infinity, delay: idx * 0.3 }
                }
              >
                {slot.emoji}
              </motion.span>
              <p className="relative mt-2 font-serif text-sm font-semibold text-indigo-50 sm:text-base">
                {slot.label}
              </p>
              <p className="relative mt-0.5 text-xs text-indigo-300/50">{slot.hours}</p>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        <StepFooter
          show={!!timeSlot}
          onContinue={onNext}
          hint={
            timeSlot
              ? `${TIME_SLOTS.find((t) => t.id === timeSlot)?.emoji} ${TIME_SLOTS.find((t) => t.id === timeSlot)?.label} — let's plan it!`
              : undefined
          }
        />
      </AnimatePresence>
    </StepShell>
  );
}
