"use client";

import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { RomanticCalendar } from "@/components/ui/RomanticCalendar";
import { StepFooter } from "@/components/ui/SelectionGrid";
import { StepHeader, StepShell } from "@/components/ui/StepLayout";

interface StepCalendarProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  onNext: () => void;
}

export function StepCalendar({ selected, onSelect, onNext }: StepCalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <StepShell fullWidth>
      <StepHeader
        emoji="📅"
        title="When are you free?"
        subtitle="Pick a date that works for you — I'll make it special ✨"
        accent="purple"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        <RomanticCalendar
          selected={selected}
          onSelect={onSelect}
          disabled={{ before: today }}
        />
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 24, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-8 overflow-hidden text-center"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="relative mb-6 overflow-hidden rounded-2xl border border-rose-500/25 bg-gradient-to-r from-rose-500/15 via-purple-500/10 to-pink-500/15 px-6 py-5"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
              />
              <p className="relative text-sm text-rose-300/70">You picked</p>
              <p className="relative font-serif text-2xl font-bold text-rose-50">
                {format(selected, "EEEE")}
              </p>
              <p className="relative mt-1 text-lg text-rose-200">
                {format(selected, "MMMM d, yyyy")}
              </p>
              <motion.p
                className="relative mt-2 text-sm text-rose-400"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Perfect choice! ✨
              </motion.p>
            </motion.div>
            <StepFooter show onContinue={onNext} hint="Perfect date locked in! ✨" />
          </motion.div>
        )}
      </AnimatePresence>
    </StepShell>
  );
}
