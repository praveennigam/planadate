import { NextRequest, NextResponse } from "next/server";
import { createDatePlanPdf, sendDateAcceptedEmail } from "@/lib/email";
import type { DatePlanSubmission } from "@/types/date-plan";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as DatePlanSubmission;

    if (!body.accepted) {
      return NextResponse.json({ ok: true, message: "No email sent — declined" });
    }

    if (
      !body.date ||
      !body.timeSlot ||
      !body.moods?.length ||
      !body.activities?.length ||
      !body.location ||
      !body.outfit ||
      !body.musicVibe
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { pdfBytes, pdfBase64, pdfFilename } = await createDatePlanPdf(body);
    await sendDateAcceptedEmail(body, pdfBytes);

    return NextResponse.json({
      ok: true,
      message: "Email sent with love letter PDF!",
      pdfBase64,
      pdfFilename,
    });
  } catch (error) {
    console.error("Submit date error:", error);
    const message = error instanceof Error ? error.message : "Failed to send email";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
