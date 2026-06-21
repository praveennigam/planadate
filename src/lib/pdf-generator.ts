import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { format, parseISO } from "date-fns";
import type { DatePlanSubmission } from "@/types/date-plan";
import { MOODS, TIME_SLOTS, getActivityLabelPlain, getPlainLabel, LOCATIONS, OUTFITS, MUSIC_VIBES } from "@/types/date-plan";
import { sanitizePdfText } from "./pdf-utils";

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;

const COLORS = {
  rose: rgb(0.91, 0.33, 0.5),
  deepRose: rgb(0.72, 0.15, 0.35),
  blush: rgb(1, 0.89, 0.93),
  lavender: rgb(0.85, 0.75, 0.95),
  gold: rgb(0.95, 0.75, 0.35),
  white: rgb(1, 1, 1),
  dark: rgb(0.25, 0.12, 0.18),
  purple: rgb(0.45, 0.25, 0.55),
  coral: rgb(1, 0.55, 0.45),
};

function drawGradientBg(
  page: ReturnType<PDFDocument["addPage"]>,
  top: [number, number, number],
  bottom: [number, number, number]
) {
  const steps = 40;
  for (let i = 0; i < steps; i++) {
    const t = i / steps;
    const r = top[0] * (1 - t) + bottom[0] * t;
    const g = top[1] * (1 - t) + bottom[1] * t;
    const b = top[2] * (1 - t) + bottom[2] * t;
    page.drawRectangle({
      x: 0,
      y: PAGE_HEIGHT - (i + 1) * (PAGE_HEIGHT / steps),
      width: PAGE_WIDTH,
      height: PAGE_HEIGHT / steps + 1,
      color: rgb(r, g, b),
    });
  }
}

function drawGradientRect(
  page: ReturnType<PDFDocument["addPage"]>,
  x: number,
  y: number,
  width: number,
  height: number,
  top: [number, number, number],
  bottom: [number, number, number]
) {
  const steps = 24;
  const stepHeight = height / steps;
  for (let i = 0; i < steps; i++) {
    const t = i / steps;
    const r = top[0] * (1 - t) + bottom[0] * t;
    const g = top[1] * (1 - t) + bottom[1] * t;
    const b = top[2] * (1 - t) + bottom[2] * t;
    page.drawRectangle({
      x,
      y: y + i * stepHeight,
      width,
      height: stepHeight + 1,
      color: rgb(r, g, b),
      opacity: 0.92,
    });
  }
}

function formatInstaHandle(handle?: string): string {
  if (!handle?.trim()) return "";
  const clean = sanitizePdfText(handle.trim().replace(/^@+/, ""));
  return clean ? `@${clean}` : "";
}

function drawDecorativeCircles(
  page: ReturnType<PDFDocument["addPage"]>,
  color = COLORS.rose
) {
  const positions = [
    { x: 50, y: 700, size: 10 },
    { x: 500, y: 650, size: 8 },
    { x: 80, y: 200, size: 7 },
    { x: 480, y: 150, size: 9 },
    { x: 300, y: 750, size: 6 },
  ];
  for (const pos of positions) {
    page.drawCircle({
      x: pos.x,
      y: pos.y,
      size: pos.size,
      color,
      opacity: 0.35,
    });
  }
}

function drawDecorativeBorder(page: ReturnType<PDFDocument["addPage"]>) {
  page.drawRectangle({
    x: 30,
    y: 30,
    width: PAGE_WIDTH - 60,
    height: PAGE_HEIGHT - 60,
    borderColor: COLORS.gold,
    borderWidth: 2,
    color: rgb(0, 0, 0),
    opacity: 0,
  });
  page.drawRectangle({
    x: 40,
    y: 40,
    width: PAGE_WIDTH - 80,
    height: PAGE_HEIGHT - 80,
    borderColor: COLORS.rose,
    borderWidth: 1,
    color: rgb(0, 0, 0),
    opacity: 0,
  });
}

function centerText(
  page: ReturnType<PDFDocument["addPage"]>,
  text: string,
  y: number,
  size: number,
  font: Awaited<ReturnType<PDFDocument["embedFont"]>>,
  color = COLORS.dark
) {
  const safeText = sanitizePdfText(text);
  if (!safeText) return;
  const width = font.widthOfTextAtSize(safeText, size);
  page.drawText(safeText, {
    x: (PAGE_WIDTH - width) / 2,
    y,
    size,
    font,
    color,
  });
}

function drawCenteredParagraph(
  page: ReturnType<PDFDocument["addPage"]>,
  text: string,
  startY: number,
  size: number,
  font: Awaited<ReturnType<PDFDocument["embedFont"]>>,
  lineHeight: number,
  maxWidth: number,
  color = COLORS.dark
): number {
  const lines = wrapText(text, font, size, maxWidth);
  let y = startY;
  for (const line of lines) {
    centerText(page, line, y, size, font, color);
    y -= lineHeight;
  }
  return y;
}

function wrapText(
  text: string,
  font: Awaited<ReturnType<PDFDocument["embedFont"]>>,
  size: number,
  maxWidth: number
): string[] {
  const words = sanitizePdfText(text).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const safeWord = sanitizePdfText(word);
    if (!safeWord) continue;

    const test = current ? `${current} ${safeWord}` : safeWord;
    if (font.widthOfTextAtSize(test, size) > maxWidth && current) {
      lines.push(current);
      current = safeWord;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export async function generateLoveLetterPdf(
  data: DatePlanSubmission
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const timesItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

  const timeLabel =
    TIME_SLOTS.find((t) => t.id === data.timeSlot)?.label ?? data.timeSlot;
  const moodLabels = data.moods
    .map((m) => MOODS.find((mo) => mo.id === m)?.label ?? m)
    .join(", ");
  const activityLabels = sanitizePdfText(
    (data.activities ?? []).map((a) => getActivityLabelPlain(a)).join(", ")
  );
  const locationLabel = sanitizePdfText(getPlainLabel(LOCATIONS, data.location));
  const outfitLabel = sanitizePdfText(getPlainLabel(OUTFITS, data.outfit));
  const musicLabel = sanitizePdfText(getPlainLabel(MUSIC_VIBES, data.musicVibe));
  const loveNote = data.loveNote ? sanitizePdfText(data.loveNote) : "";
  const partnerName = data.partnerName ? sanitizePdfText(data.partnerName) : "";
  const instagram = formatInstaHandle(data.instagramHandle);
  const formattedDate = data.date
    ? format(parseISO(data.date), "EEEE, MMMM d, yyyy")
    : "A beautiful day";

  // Page 1 — The Proposal
  {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    drawGradientBg(page, [1, 0.85, 0.9], [0.95, 0.7, 0.8]);
    drawDecorativeBorder(page);
    drawDecorativeCircles(page);

    centerText(page, "* * *", 720, 28, helvetica, COLORS.rose);
    centerText(page, "Will You Go", 620, 42, helveticaBold, COLORS.deepRose);
    centerText(page, "On A Date With Me?", 565, 42, helveticaBold, COLORS.deepRose);

    const answer = data.accepted ? "YES!" : "Maybe next time...";
    const answerColor = data.accepted ? COLORS.rose : COLORS.purple;
    centerText(page, answer, 480, 36, helveticaBold, answerColor);

    const bannerX = 70;
    const bannerY = 250;
    const bannerW = PAGE_WIDTH - 140;
    const bannerH = partnerName || instagram ? 200 : 130;

    drawGradientRect(
      page,
      bannerX,
      bannerY,
      bannerW,
      bannerH,
      [0.38, 0.45, 0.95],
      [0.55, 0.35, 0.85]
    );

    page.drawRectangle({
      x: bannerX,
      y: bannerY,
      width: bannerW,
      height: bannerH,
      borderColor: COLORS.white,
      borderWidth: 1.5,
      color: rgb(0, 0, 0),
      opacity: 0,
    });

    centerText(page, "A special invitation", bannerY + bannerH - 42, 18, timesItalic, COLORS.white);
    centerText(page, "just for you", bannerY + bannerH - 68, 16, timesItalic, COLORS.blush);

    if (partnerName) {
      centerText(page, partnerName, bannerY + bannerH - 108, 30, helveticaBold, COLORS.white);
    }

    if (instagram) {
      centerText(
        page,
        instagram,
        bannerY + (partnerName ? 28 : 48),
        14,
        helvetica,
        COLORS.blush
      );
    }

    centerText(page, "Page 1 of 7", 60, 10, helvetica, COLORS.deepRose);
  }

  // Page 2 — The Date
  {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    drawGradientBg(page, [0.9, 0.85, 1], [0.85, 0.75, 0.95]);
    drawDecorativeBorder(page);
    drawDecorativeCircles(page, COLORS.purple);

    centerText(page, "When Are We Meeting?", 680, 28, helveticaBold, COLORS.purple);
    centerText(page, formattedDate, 520, 32, helveticaBold, COLORS.deepRose);

    centerText(page, "Mark your calendar,", 400, 18, timesItalic, COLORS.dark);
    centerText(page, "save the date,", 375, 18, timesItalic, COLORS.dark);
    centerText(page, "and get ready for something magical", 350, 18, timesItalic, COLORS.dark);

    page.drawCircle({ x: 297, y: 290, size: 40, color: COLORS.rose, opacity: 0.15 });
    centerText(page, "Page 2 of 7", 60, 10, helvetica, COLORS.purple);
  }

  // Page 3 — Time & Mood
  {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    drawGradientBg(page, [1, 0.92, 0.85], [0.95, 0.8, 0.7]);
    drawDecorativeBorder(page);

    centerText(page, "What Time?", 700, 28, helveticaBold, COLORS.coral);
    centerText(page, timeLabel, 620, 36, helveticaBold, COLORS.deepRose);
    centerText(page, "(After 6 PM — perfect for us)", 580, 14, timesItalic, COLORS.dark);

    centerText(page, "What Are We Feeling?", 420, 28, helveticaBold, COLORS.coral);
    centerText(page, moodLabels || "All the good vibes", 360, 22, helveticaBold, COLORS.rose);

    centerText(page, "Our Plan", 280, 24, helveticaBold, COLORS.coral);
    const planLines = wrapText(activityLabels || "Something wonderful", helvetica, 16, PAGE_WIDTH - 120);
    let planY = 240;
    for (const line of planLines) {
      centerText(page, line, planY, 16, helvetica, COLORS.dark);
      planY -= 24;
    }

    centerText(page, "Every moment with you", 160, 16, timesItalic, COLORS.dark);
    centerText(page, "feels like the right time", 135, 16, timesItalic, COLORS.dark);
    centerText(page, "Page 3 of 7", 60, 10, helvetica, COLORS.coral);
  }

  // Page 4 — Love Letter Part 1
  {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    drawGradientBg(page, [1, 0.88, 0.92], [0.98, 0.75, 0.85]);
    drawDecorativeBorder(page);
    drawDecorativeCircles(page);

    centerText(page, "My Dearest,", 720, 32, timesItalic, COLORS.deepRose);

    const letter1 =
      "From the moment I met you, my world became brighter. Every laugh we share, every glance we exchange — it all adds up to something I never want to lose. You are the reason I smile on ordinary days and the spark that turns them into extraordinary ones.";
    drawCenteredParagraph(page, letter1, 640, 16, timesItalic, 26, PAGE_WIDTH - 120);

    centerText(page, "With all my heart,", 200, 18, timesItalic, COLORS.rose);
    centerText(page, "Page 4 of 7", 60, 10, helvetica, COLORS.deepRose);
  }

  // Page 5 — Love Letter Part 2
  {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    drawGradientBg(page, [0.92, 0.88, 1], [0.85, 0.78, 0.95]);
    drawDecorativeBorder(page);

    centerText(page, "Why This Date Matters", 720, 28, helveticaBold, COLORS.purple);

    const letter2 =
      "This isn't just another date on the calendar. It's my way of saying you matter — more than words can capture. I want to create memories with you: the kind where time slows down, where the rest of the world fades away, and it's just us, lost in the moment, completely happy.";
    drawCenteredParagraph(page, letter2, 640, 16, timesItalic, 26, PAGE_WIDTH - 120);

    centerText(page, "I can't wait to see you", 200, 20, helveticaBold, COLORS.rose);
    centerText(page, "Page 5 of 7", 60, 10, helvetica, COLORS.purple);
  }

  // Page 6 — Love Letter Part 3
  {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    drawGradientBg(page, [1, 0.9, 0.88], [0.95, 0.75, 0.72]);
    drawDecorativeBorder(page);
    drawDecorativeCircles(page, COLORS.coral);

    centerText(page, "Our Perfect Plan", 720, 28, helveticaBold, COLORS.coral);

    const planText = `Date: ${formattedDate}\nTime: ${timeLabel}\nPlan: ${activityLabels || "TBD"}\nPlace: ${locationLabel}\nVibe: ${moodLabels || "Pure magic"}\nLook: ${outfitLabel}\nMusic: ${musicLabel}`;
    const planLines = planText.split("\n");
    let y = 600;
    for (const line of planLines) {
      const wrapped = wrapText(line, helveticaBold, 20, PAGE_WIDTH - 120);
      for (const wline of wrapped) {
        centerText(page, wline, y, 20, helveticaBold, COLORS.deepRose);
        y -= 36;
      }
    }

    if (loveNote) {
      const noteLines = wrapText(`Note: ${loveNote}`, helveticaBold, 18, PAGE_WIDTH - 120);
      for (const wline of noteLines) {
        centerText(page, wline, y, 18, helveticaBold, COLORS.deepRose);
        y -= 32;
      }
    }

    const letter3 =
      "Whatever we end up doing - a walk under the stars, dinner by candlelight, or simply being together - I know it will be perfect because you'll be there.";
    drawCenteredParagraph(page, letter3, y - 20, 16, timesItalic, 26, PAGE_WIDTH - 140, COLORS.dark);

    centerText(page, "Page 6 of 7", 60, 10, helvetica, COLORS.coral);
  }

  // Page 7 — Final Page
  {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    drawGradientBg(page, [0.95, 0.7, 0.8], [0.72, 0.15, 0.35]);
    drawDecorativeBorder(page);

    centerText(page, "* * *", 700, 36, helvetica, COLORS.white);
    centerText(page, "See You Soon,", 580, 40, helveticaBold, COLORS.white);
    centerText(page, "My Love", 530, 40, helveticaBold, COLORS.white);

    centerText(page, "Thank you for saying yes.", 400, 20, timesItalic, COLORS.blush);
    centerText(page, "This is going to be unforgettable.", 370, 20, timesItalic, COLORS.blush);

    centerText(page, "Forever yours,", 250, 22, timesItalic, COLORS.white);
    centerText(page, "With endless love", 220, 22, helveticaBold, COLORS.gold);

    centerText(page, "Page 7 of 7", 60, 10, helvetica, COLORS.blush);
  }

  return pdfDoc.save();
}
