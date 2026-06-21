import nodemailer from "nodemailer";
import type { DatePlanSubmission } from "@/types/date-plan";
import { generateLoveLetterPdf } from "./pdf-generator";
import { getPdfFilename } from "./pdf-utils";
import { buildDatePlanEmail } from "./email-template";

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "Email not configured. Run `npm run setup:email` or set SMTP_HOST, SMTP_USER, SMTP_PASS in .env.local"
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendDateAcceptedEmail(
  data: DatePlanSubmission,
  pdfBytes?: Uint8Array
) {
  const toEmail = process.env.NOTIFY_EMAIL || process.env.SMTP_USER;
  if (!toEmail) {
    throw new Error("NOTIFY_EMAIL or SMTP_USER must be set in .env.local");
  }

  const pdf = pdfBytes ?? (await generateLoveLetterPdf(data));
  const filename = getPdfFilename(data);
  const { html, text, subject } = buildDatePlanEmail(data);
  const transporter = getTransporter();

  const info = await transporter.sendMail({
    from: `"Make A Date" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject,
    text,
    html,
    attachments: [
      {
        filename,
        content: Buffer.from(pdf),
        contentType: "application/pdf",
        contentDisposition: "attachment",
      },
    ],
  });

  return info;
}

export async function createDatePlanPdf(data: DatePlanSubmission) {
  const pdfBytes = await generateLoveLetterPdf(data);
  return {
    pdfBytes,
    pdfBase64: Buffer.from(pdfBytes).toString("base64"),
    pdfFilename: getPdfFilename(data),
  };
}
