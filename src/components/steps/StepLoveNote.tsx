"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { LOVE_NOTE_PRESETS } from "@/types/date-plan";
import { StepFooter } from "@/components/ui/SelectionGrid";
import { StepHeader, StepShell } from "@/components/ui/StepLayout";

interface StepLoveNoteProps {
  loveNote: string;
  onChange: (note: string) => void;
  onNext: () => void;
}

export function StepLoveNote({ loveNote, onChange, onNext }: StepLoveNoteProps) {
  const [focused, setFocused] = useState(false);

  return (
    <StepShell>
      <StepHeader
        emoji="💌"
        title="Leave a sweet note"
        subtitle="Optional — say something from the heart (or pick a preset)"
        accent="rose"
      />

      <motion.div
        animate={{
          boxShadow: focused
            ? "0 0 32px rgba(99, 102, 241, 0.25)"
            : "0 0 0 rgba(99, 102, 241, 0)",
        }}
        className="mb-4 overflow-hidden rounded-xl border border-indigo-400/15 bg-indigo-950/30 transition-colors focus-within:border-violet-400/35"
      >
        <textarea
          value={loveNote}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Write something sweet... 💕"
          rows={4}
          maxLength={200}
          className="w-full resize-none bg-transparent px-4 py-4 text-base text-indigo-50 placeholder:text-indigo-300/35 focus:outline-none sm:text-lg"
        />
        <div className="border-t border-indigo-400/10 px-4 py-2 text-right text-xs text-indigo-300/40">
          {loveNote.length}/200
        </div>
      </motion.div>

      <p className="mb-3 text-center text-xs text-indigo-300/45">Quick picks ✨</p>
      <div className="mb-2 flex flex-wrap justify-center gap-2">
        {LOVE_NOTE_PRESETS.map((preset, i) => (
          <motion.button
            key={preset}
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onChange(preset)}
            className={`rounded-full border px-3 py-2 text-xs transition-all sm:text-sm ${
              loveNote === preset
                ? "border-indigo-400/50 bg-indigo-500/20 text-indigo-50"
                : "border-indigo-400/15 bg-indigo-950/30 text-indigo-200/70 hover:border-violet-400/35"
            }`}
          >
            {preset}
          </motion.button>
        ))}
      </div>

      <StepFooter
        show
        onContinue={onNext}
        label={loveNote.trim() ? "Continue →" : "Skip & Continue →"}
        secondaryLabel={loveNote.trim() ? undefined : undefined}
        hint={loveNote.trim() ? "Beautiful words! 💕" : "You can skip this step if you'd like"}
      />
    </StepShell>
  );
}
