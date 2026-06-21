"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { StepHeader, StepShell } from "@/components/ui/StepLayout";

interface StepProposalProps {
  name: string;
  instagramHandle: string;
  onNameChange: (value: string) => void;
  onInstagramChange: (value: string) => void;
  onAccept: () => void;
  onDecline: () => void;
}

const CONFETTI = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  emoji: ["💕", "✨", "💖", "🌹", "💗", "⭐", "🦋", "🌸"][i % 8],
  angle: (i / 60) * 360,
  distance: 120 + (i % 6) * 55,
}));

const BTN_W = 130;
const BTN_H = 44;
const MARGIN = 12;

const inputClass =
  "w-full rounded-xl border border-indigo-400/15 bg-indigo-500/8 px-4 py-3 text-sm text-indigo-50 placeholder:text-indigo-300/35 outline-none transition-all focus:border-violet-400/40 focus:bg-indigo-500/12 focus:ring-2 focus:ring-violet-500/15 sm:text-base";

function randomPagePosition() {
  const maxX = Math.max(MARGIN, window.innerWidth - BTN_W - MARGIN);
  const maxY = Math.max(MARGIN, window.innerHeight - BTN_H - MARGIN);
  return {
    x: MARGIN + Math.random() * (maxX - MARGIN),
    y: MARGIN + Math.random() * (maxY - MARGIN),
  };
}

export function StepProposal({
  name,
  instagramHandle,
  onNameChange,
  onInstagramChange,
  onAccept,
  onDecline,
}: StepProposalProps) {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noReady, setNoReady] = useState(false);
  const [noAttempts, setNoAttempts] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const canAccept = name.trim().length > 0;

  useEffect(() => {
    const place = () => {
      setNoPos(randomPagePosition());
      setNoReady(true);
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, []);

  const moveNoButton = useCallback(() => {
    setNoAttempts((n) => n + 1);
    setNoPos(randomPagePosition());
  }, []);

  const handleNoHover = (e: React.MouseEvent | React.PointerEvent) => {
    e.preventDefault();
    moveNoButton();
  };

  const handleNoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (noAttempts >= 8) {
      onDecline();
      return;
    }
    moveNoButton();
  };

  const handleYes = () => {
    if (!canAccept) return;
    setShowConfetti(true);
    setTimeout(onAccept, 1500);
  };

  return (
    <>
      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 z-50">
          {CONFETTI.map((item) => {
            const rad = (item.angle * Math.PI) / 180;
            return (
              <motion.span
                key={item.id}
                className="absolute text-2xl"
                style={{ left: "50%", top: "45%" }}
                initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
                animate={{
                  x: Math.cos(rad) * item.distance,
                  y: Math.sin(rad) * item.distance,
                  scale: [0, 2, 0],
                  opacity: [1, 1, 0],
                  rotate: item.angle,
                }}
                transition={{ duration: 1.5, delay: item.id * 0.012, ease: "easeOut" }}
              >
                {item.emoji}
              </motion.span>
            );
          })}
        </div>
      )}

      {noReady && (
        <motion.button
          type="button"
          onPointerEnter={handleNoHover}
          onMouseEnter={handleNoHover}
          onClick={handleNoClick}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1, left: noPos.x, top: noPos.y }}
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
          className="fixed z-40 min-h-[44px] whitespace-nowrap rounded-2xl border border-indigo-400/30 bg-indigo-950/85 px-6 py-2.5 text-sm text-indigo-100 shadow-[0_8px_28px_rgba(0,0,0,0.35)] backdrop-blur-md"
        >
          {noAttempts > 2 ? "Are you sure? 🥺" : "No 😢"}
        </motion.button>
      )}

      <StepShell>
        <StepHeader
          emoji="💌"
          title="Will you go on a date with me?"
          subtitle="I've been thinking about this for a while... and I really hope you say yes 💕"
          accent="purple"
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.2em] text-indigo-300/50">
            A little about you
          </p>
          <div className="grid w-full gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-indigo-200/70">Your name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="e.g. Priya"
                className={inputClass}
                autoComplete="name"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-indigo-200/70">
                Instagram handle
              </span>
              <input
                type="text"
                value={instagramHandle}
                onChange={(e) => onInstagramChange(e.target.value)}
                placeholder="@yourusername"
                className={inputClass}
                autoComplete="off"
              />
            </label>
          </div>
        </motion.div>

        <AnimatedButton
          onClick={handleYes}
          size="lg"
          fullWidth
          className="pulse-ring"
          disabled={!canAccept}
        >
          Yes! 💕
        </AnimatedButton>

        <motion.p
          className="mt-6 text-center text-xs text-indigo-300/40"
          animate={{ opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Made with love, just for you ✨
        </motion.p>
      </StepShell>
    </>
  );
}
