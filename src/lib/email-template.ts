import { format, parseISO } from "date-fns";
import type { DatePlanSubmission } from "@/types/date-plan";
import {
  MOODS,
  TIME_SLOTS,
  getActivityLabelPlain,
  getPlainLabel,
  LOCATIONS,
  OUTFITS,
  MUSIC_VIBES,
} from "@/types/date-plan";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildDatePlanEmail(data: DatePlanSubmission) {
  const formattedDate = data.date
    ? format(parseISO(data.date), "EEEE, MMMM d, yyyy")
    : "TBD";
  const timeLabel =
    TIME_SLOTS.find((t) => t.id === data.timeSlot)?.label ?? data.timeSlot;
  const moodLabels = data.moods
    .map((m) => MOODS.find((mo) => mo.id === m)?.label ?? m)
    .join(", ");
  const activityLabels = (data.activities ?? [])
    .map((a) => getActivityLabelPlain(a))
    .join(", ");
  const locationLabel = getPlainLabel(LOCATIONS, data.location);
  const outfitLabel = getPlainLabel(OUTFITS, data.outfit);
  const musicLabel = getPlainLabel(MUSIC_VIBES, data.musicVibe);

  const rows = [
    ...(data.partnerName?.trim()
      ? [{ label: "Name", value: data.partnerName.trim() }]
      : []),
    ...(data.instagramHandle?.trim()
      ? [
          {
            label: "Instagram",
            value: data.instagramHandle.trim().startsWith("@")
              ? data.instagramHandle.trim()
              : `@${data.instagramHandle.trim()}`,
          },
        ]
      : []),
    { label: "Date", value: formattedDate },
    { label: "Time", value: timeLabel },
    { label: "Plan", value: activityLabels || "Surprise!" },
    { label: "Place", value: locationLabel },
    { label: "Mood", value: moodLabels || "All the vibes" },
    { label: "Look", value: outfitLabel },
    { label: "Music", value: musicLabel },
  ];

  if (data.loveNote) {
    rows.push({ label: "Love Note", value: data.loveNote });
  }

  const loveNoteHtml = data.loveNote
    ? `
            <tr>
              <td colspan="2" style="padding:20px 24px 22px;border-top:1px solid #fce4ec;background:#fff5f8;text-align:center;">
                <p style="margin:0 0 12px;color:#9d174d;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">
                  Love Note
                </p>
                <p style="margin:0 auto;max-width:480px;color:#4a1942;font-size:17px;line-height:1.75;font-style:italic;text-align:center;word-break:break-word;">
                  ${escapeHtml(data.loveNote)}
                </p>
              </td>
            </tr>`
    : "";

  const tableRows = rows
    .filter((row) => row.label !== "Love Note")
    .map(
      (row) => `
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid #fce4ec;color:#9d174d;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;width:110px;vertical-align:top;">
            ${escapeHtml(row.label)}
          </td>
          <td style="padding:12px 16px;border-bottom:1px solid #fce4ec;color:#4a1942;font-size:16px;line-height:1.5;vertical-align:top;word-break:break-word;">
            ${escapeHtml(row.value)}
          </td>
        </tr>`
    )
    .join("");

  const text = [
    "She Said Yes!",
    "",
    "Your date plan has been accepted.",
    "",
    ...rows.map((row) => `${row.label}: ${row.value}`),
    "",
    "A 7-page love letter PDF is attached.",
    "Make it unforgettable.",
  ].join("\n");

  const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>She Said Yes</title>
  </head>
  <body style="margin:0;padding:0;background:#fff5f7;font-family:Georgia,'Times New Roman',serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#fff5f7;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #fbcfe8;box-shadow:0 18px 50px rgba(190,24,93,0.12);">
            <tr>
              <td style="padding:36px 32px 24px;background:linear-gradient(135deg,#ff8fab,#ffc2d1,#e9d5ff);text-align:center;">
                <p style="margin:0 0 8px;color:#831843;font-size:12px;letter-spacing:0.28em;text-transform:uppercase;">Make A Date</p>
                <h1 style="margin:0;color:#ffffff;font-size:34px;line-height:1.2;text-shadow:0 2px 12px rgba(131,24,67,0.18);">She Said Yes!</h1>
                <p style="margin:12px 0 0;color:#fff1f5;font-size:17px;">Your date plan is ready</p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 24px 12px;text-align:center;">
                <p style="margin:0;color:#9d174d;font-size:18px;">A beautiful evening is waiting for you both.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 24px 24px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #fce7f3;border-radius:18px;overflow:hidden;background:#fffafd;">
                  ${tableRows}
                  ${loveNoteHtml}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 28px;text-align:center;">
                <div style="display:inline-block;padding:14px 22px;border-radius:999px;background:linear-gradient(90deg,#ff6b8a,#ffa8c5,#c4a1ff);color:#ffffff;font-size:15px;font-weight:bold;">
                  PDF love letter attached
                </div>
                <p style="margin:18px 0 0;color:#9d174d;font-size:15px;font-style:italic;">Make it unforgettable</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { html, text, subject: "She Said YES! Your date plan is ready" };
}
