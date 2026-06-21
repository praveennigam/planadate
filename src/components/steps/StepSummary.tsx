"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  getActivityLabel,
  getLabel,
  LOCATIONS,
  MOODS,
  MUSIC_VIBES,
  OUTFITS,
  TIME_SLOTS,
  type ActivityId,
  type Location,
  type Mood,
  type MusicVibe,
  type Outfit,
  type TimeSlot,
} from "@/types/date-plan";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { StepHeader, StepShell } from "@/components/ui/StepLayout";

interface StepSummaryProps {
  data: {
    date: Date;
    timeSlot: TimeSlot;
    activities: ActivityId[];
    location: Location;
    moods: Mood[];
    outfit: Outfit;
    musicVibe: MusicVibe;
    loveNote: string;
    partnerName: string;
    instagramHandle: string;
  };
  onConfirm: () => void;
  loading: boolean;
}

export function StepSummary({ data, onConfirm, loading }: StepSummaryProps) {
  const timeLabel = TIME_SLOTS.find((t) => t.id === data.timeSlot)?.label;
  const moodLabels = data.moods
    .map((m) => MOODS.find((mo) => mo.id === m)?.label)
    .join(" · ");
  const activityLabels = data.activities.map(getActivityLabel).join(" · ");
  const insta = data.instagramHandle.trim()
    ? data.instagramHandle.trim().startsWith("@")
      ? data.instagramHandle.trim()
      : `@${data.instagramHandle.trim()}`
    : "";

  const rows = [
    ...(data.partnerName.trim()
      ? [{ icon: "💫", label: "Name", value: data.partnerName.trim() }]
      : []),
    ...(insta ? [{ icon: "📸", label: "Instagram", value: insta }] : []),
    { icon: "📅", label: "Date", value: format(data.date, "EEE, MMM d, yyyy") },
    { icon: "🌙", label: "Time", value: timeLabel ?? "" },
    {
      icon: data.timeSlot === "evening" ? "🍽️" : "🌃",
      label: "Plan",
      value: activityLabels,
    },
    { icon: "📍", label: "Place", value: getLabel(LOCATIONS, data.location) },
    { icon: "💭", label: "Vibe", value: moodLabels },
    { icon: "👗", label: "Look", value: getLabel(OUTFITS, data.outfit) },
    { icon: "🎵", label: "Music", value: getLabel(MUSIC_VIBES, data.musicVibe) },
  ];

  if (data.loveNote.trim()) {
    rows.push({
      icon: "💌",
      label: "Note",
      value: data.loveNote.trim(),
    });
  }

  return (
    <StepShell>
      <StepHeader
        emoji="💝"
        title="Our Date Plan"
        subtitle="Everything looks perfect — one tap to confirm"
        accent="pink"
        compact
      />

      <div className="ticket-card mb-4 grid grid-cols-1 gap-2 rounded-2xl p-2 sm:grid-cols-2 sm:gap-2.5 sm:p-3">
        {rows.map((row, i) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, type: "spring", stiffness: 220 }}
            className="flex items-center gap-2.5 rounded-xl border border-white/6 bg-white/4 px-3 py-2.5 sm:gap-3 sm:px-3.5 sm:py-3"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-lg sm:h-10 sm:w-10 sm:text-xl">
              {row.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-indigo-300/50 sm:text-[10px]">
                {row.label}
              </p>
              <p className="truncate font-serif text-sm font-semibold leading-snug text-indigo-50 sm:text-[15px]">
                {row.value}
              </p>
            </div>
            <span className="shrink-0 text-sm text-indigo-400/50">✓</span>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <AnimatedButton
          onClick={onConfirm}
          disabled={loading}
          size="lg"
          fullWidth
          className="pulse-ring"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                💌
              </motion.span>
              Sending love letter...
            </span>
          ) : (
            "Confirm & Send 💕"
          )}
        </AnimatedButton>
        <p className="mt-2 text-[10px] text-indigo-300/45 sm:text-xs">
          Email + auto PDF download ✨
        </p>
      </div>
    </StepShell>
  );
}
