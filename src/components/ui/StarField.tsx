"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: (i * 17 + 7) % 100,
  y: (i * 23 + 11) % 100,
  size: 1 + (i % 3),
  delay: (i % 10) * 0.4,
  duration: 2 + (i % 4),
}));

export function StarField() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {STARS.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{ opacity: [0.1, 0.7, 0.1] }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
