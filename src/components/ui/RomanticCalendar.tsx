"use client";

import { motion } from "framer-motion";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { format } from "date-fns";
import type { Matcher } from "react-day-picker";

interface RomanticCalendarProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  disabled?: Matcher | Matcher[];
}

const floatingHearts = [
  { emoji: "💕", top: "6%", left: "4%", delay: 0, duration: 5 },
  { emoji: "✨", top: "12%", right: "6%", delay: 0.8, duration: 4.5 },
  { emoji: "🌸", bottom: "10%", left: "8%", delay: 1.2, duration: 5.5 },
  { emoji: "💖", bottom: "14%", right: "5%", delay: 0.4, duration: 4.8 },
];

export function RomanticCalendar({ selected, onSelect, disabled }: RomanticCalendarProps) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <div className="romantic-calendar relative w-full">
      <motion.div
        className="calendar-shimmer-border pointer-events-none absolute inset-0 rounded-[1.6rem]"
        animate={{ opacity: [0.45, 0.85, 0.45] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {floatingHearts.map((heart, i) => (
        <motion.span
          key={i}
          className="calendar-float-heart pointer-events-none absolute text-base opacity-40 sm:text-lg"
          style={{
            top: heart.top,
            left: heart.left,
            right: heart.right,
            bottom: heart.bottom,
          }}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 8, -8, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "easeInOut",
          }}
        >
          {heart.emoji}
        </motion.span>
      ))}

      <div className="calendar-inner relative w-full">
        {selected && (
          <motion.div
            key={selected.toISOString()}
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="calendar-selected-banner"
          >
            <motion.span
              className="calendar-selected-day"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {format(selected, "d")}
            </motion.span>
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-rose-300/70">
                Your special day
              </p>
              <p className="font-serif text-sm font-semibold text-rose-50 sm:text-base">
                {format(selected, "EEEE, MMM d")}
              </p>
            </div>
            <motion.span
              className="ml-auto text-xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 12, -12, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              💗
            </motion.span>
          </motion.div>
        )}

        <DayPicker
          mode="single"
          selected={selected}
          onSelect={onSelect}
          disabled={disabled}
          animate
          showOutsideDays={false}
          fixedWeeks
          modifiers={{
            weekend: (date) => date.getDay() === 0 || date.getDay() === 6,
          }}
          modifiersClassNames={{
            weekend: "rdp-weekend",
          }}
          formatters={{
            formatCaption: (date) => format(date, "MMMM yyyy"),
            formatWeekdayName: (date) => format(date, "EEEEE"),
          }}
          classNames={{
            ...defaultClassNames,
            root: "rdp-root romantic-rdp",
            months: "rdp-months",
            month: "rdp-month",
            month_caption: "rdp-month_caption",
            caption_label: "rdp-caption_label",
            nav: "rdp-nav",
            button_previous: "rdp-button_previous",
            button_next: "rdp-button_next",
            month_grid: "rdp-month_grid",
            weekdays: "rdp-weekdays",
            weekday: "rdp-weekday",
            weeks: "rdp-weeks",
            week: "rdp-week",
            day: "rdp-day",
            day_button: "rdp-day_button",
            selected: "rdp-selected",
            today: "rdp-today",
            disabled: "rdp-disabled",
            outside: "rdp-outside",
            chevron: "rdp-chevron",
          }}
        />
      </div>

      <motion.p
        className="mt-4 text-center text-xs text-rose-300/55 sm:text-sm"
        animate={{ opacity: [0.45, 0.9, 0.45] }}
        transition={{ duration: 2.8, repeat: Infinity }}
      >
        Tap your perfect date — I&apos;ll make it magical ✨
      </motion.p>
    </div>
  );
}
