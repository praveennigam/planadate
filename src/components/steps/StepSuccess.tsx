"use client";

import { motion } from "framer-motion";
import { downloadPdfFromBase64 } from "@/lib/download-pdf";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { StepShell } from "@/components/ui/StepLayout";

const SPARKLES = [
  { x: -40, y: -30, delay: 0 },
  { x: 40, y: -20, delay: 0.4 },
  { x: -30, y: 30, delay: 0.8 },
  { x: 50, y: 10, delay: 1.2 },
  { x: 0, y: -50, delay: 0.6 },
  { x: -50, y: 0, delay: 1.0 },
];

const RINGS = [0, 1, 2];

interface StepSuccessProps {
  pdfBase64?: string;
  pdfFilename?: string;
}

export function StepSuccess({ pdfBase64, pdfFilename }: StepSuccessProps) {
  const handleDownload = () => {
    if (pdfBase64 && pdfFilename) {
      downloadPdfFromBase64(pdfBase64, pdfFilename);
    }
  };

  return (
    <StepShell>
      <div className="relative flex flex-col items-center py-4 text-center">
        {RINGS.map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-[#ffa8c5]/25"
            initial={{ width: 80, height: 80, opacity: 0.6 }}
            animate={{ width: 200 + i * 60, height: 200 + i * 60, opacity: 0 }}
            transition={{ duration: 2.5, delay: i * 0.6, repeat: Infinity }}
          />
        ))}

        <motion.div
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative mb-6 text-8xl"
          style={{ filter: "drop-shadow(0 0 40px rgba(255, 107, 138, 0.7))" }}
        >
          💕
          {SPARKLES.map((s, i) => (
            <motion.span
              key={i}
              className="absolute text-lg"
              style={{ left: "50%", top: "50%" }}
              animate={{
                x: [0, s.x],
                y: [0, s.y],
                opacity: [0, 1, 0],
                scale: [0, 1.2, 0],
              }}
              transition={{ duration: 2, delay: s.delay, repeat: Infinity }}
            >
              ✨
            </motion.span>
          ))}
        </motion.div>

        <motion.h2
          className="shimmer-text mb-3 font-serif text-4xl font-bold md:text-5xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          It&apos;s a date!
        </motion.h2>
        <motion.p
          className="max-w-sm text-rose-100/65"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          I can&apos;t wait to see you — this is going to be magical ✨
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 w-full rounded-2xl border border-[#ffa8c5]/25 bg-gradient-to-r from-[#ff6b8a]/12 to-[#c4a1ff]/12 px-6 py-5"
        >
          <motion.p
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-sm text-rose-100/80"
          >
            💌 Love letter emailed & PDF saved to your device
          </motion.p>
        </motion.div>

        {pdfBase64 && pdfFilename && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-5 w-full"
          >
            <AnimatedButton fullWidth variant="secondary" onClick={handleDownload}>
              Download PDF Again
            </AnimatedButton>
            <p className="mt-2 text-xs text-rose-300/45">{pdfFilename}</p>
          </motion.div>
        )}

        {[0, 1, 2, 3, 4].map((i) => (
          <motion.span
            key={i}
            className="absolute text-[#ffa8c5]/30"
            style={{ left: `${15 + i * 18}%`, bottom: `${10 + (i % 3) * 8}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
          >
            ♥
          </motion.span>
        ))}
      </div>
    </StepShell>
  );
}

export function StepDeclined() {
  return (
    <StepShell>
      <div className="py-6 text-center">
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, -5, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mb-6 text-7xl"
          style={{ filter: "drop-shadow(0 0 20px rgba(196, 161, 255, 0.4))" }}
        >
          🥺
        </motion.div>

        <h2 className="mb-3 font-serif text-3xl font-bold text-rose-50">
          That&apos;s okay...
        </h2>
        <p className="mb-8 text-rose-200/55">
          Maybe next time?
          <br />
          <span className="text-rose-100/70">I&apos;ll always be here for you</span> 💕
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border border-white/5 bg-white/3 px-6 py-4"
        >
          <p className="text-sm text-rose-300/50">
            No worries — the door is always open 🌸
          </p>
        </motion.div>
      </div>
    </StepShell>
  );
}
