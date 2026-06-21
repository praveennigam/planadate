import { format, parseISO } from "date-fns";
import type { DatePlanSubmission } from "@/types/date-plan";

export function getPdfFilename(data: DatePlanSubmission): string {
  const datePart = data.date
    ? format(parseISO(data.date), "yyyy-MM-dd")
    : "date-plan";
  return `our-date-plan-${datePart}.pdf`;
}

/** Strip characters that Standard PDF fonts (WinAnsi) cannot encode. */
export function sanitizePdfText(text: string): string {
  return text
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2026/g, "...")
    .replace(/[^\u0020-\u00FF]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}
