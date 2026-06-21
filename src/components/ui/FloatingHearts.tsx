"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const HEART_CONFIG = [
  { x: 8, delay: 0, duration: 6, size: 14 },
  { x: 22, delay: 1.2, duration: 7, size: 20 },
  { x: 38, delay: 0.5, duration: 5.5, size: 16 },
  { x: 55, delay: 2, duration: 8, size: 22 },
  { x: 72, delay: 0.8, duration: 6.5, size: 18 },
  { x: 88, delay: 1.5, duration: 7.5, size: 15 },
  { x: 15, delay: 3, duration: 6, size: 12 },
  { x: 45, delay: 2.5, duration: 7, size: 24 },
  { x: 65, delay: 1, duration: 5, size: 17 },
  { x: 92, delay: 3.5, duration: 8, size: 13 },
  { x: 30, delay: 4, duration: 6.5, size: 19 },
  { x: 78, delay: 0.3, duration: 7, size: 21 },
];

export function FloatingHearts() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {HEART_CONFIG.map((heart) => (
        <motion.span
          key={heart.x + heart.delay}
          className="absolute text-rose-400/25"
          style={{
            left: `${heart.x}%`,
            fontSize: heart.size,
            filter: "drop-shadow(0 0 6px rgba(244, 63, 138, 0.3))",
          }}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.5, 0.5, 0],
            rotate: [0, 20, -20, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
}
