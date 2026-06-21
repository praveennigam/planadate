"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import { downloadPdfFromBase64 } from "@/lib/download-pdf";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import { FloatingHearts } from "@/components/ui/FloatingHearts";
import { StarField } from "@/components/ui/StarField";
import { WizardShell } from "@/components/ui/StepLayout";
import { StepProposal } from "@/components/steps/StepProposal";
import { StepCalendar } from "@/components/steps/StepCalendar";
import { StepTime } from "@/components/steps/StepTime";
import { StepActivityMenu } from "@/components/steps/StepActivityMenu";
import { StepLocation } from "@/components/steps/StepLocation";
import { StepMood } from "@/components/steps/StepMood";
import { StepOutfit } from "@/components/steps/StepOutfit";
import { StepMusic } from "@/components/steps/StepMusic";
import { StepLoveNote } from "@/components/steps/StepLoveNote";
import { StepSummary } from "@/components/steps/StepSummary";
import { StepSuccess, StepDeclined } from "@/components/steps/StepSuccess";
import {
  type ActivityId,
  type Location,
  type Mood,
  type MusicVibe,
  type Outfit,
  type TimeSlot,
} from "@/types/date-plan";

type Step =
  | "proposal"
  | "calendar"
  | "time"
  | "activity"
  | "location"
  | "mood"
  | "outfit"
  | "music"
  | "love-note"
  | "summary"
  | "success"
  | "declined";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export function DatePlanWizard() {
  const [step, setStep] = useState<Step>("proposal");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [timeSlot, setTimeSlot] = useState<TimeSlot | null>(null);
  const [activities, setActivities] = useState<ActivityId[]>([]);
  const [location, setLocation] = useState<Location | null>(null);
  const [moods, setMoods] = useState<Mood[]>([]);
  const [outfit, setOutfit] = useState<Outfit | null>(null);
  const [musicVibe, setMusicVibe] = useState<MusicVibe | null>(null);
  const [loveNote, setLoveNote] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadData, setDownloadData] = useState<{
    pdfBase64: string;
    pdfFilename: string;
  } | null>(null);

  const handleTimeSelect = (slot: TimeSlot) => {
    setTimeSlot(slot);
    setActivities([]);
  };

  const toggleActivity = (id: ActivityId) => {
    setActivities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const toggleMood = (mood: Mood) => {
    setMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
    );
  };

  const handleConfirm = async () => {
    if (
      !selectedDate ||
      !timeSlot ||
      !activities.length ||
      !location ||
      !moods.length ||
      !outfit ||
      !musicVibe
    )
      return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/submit-date", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accepted: true,
          date: format(selectedDate, "yyyy-MM-dd"),
          timeSlot,
          activities,
          location,
          moods,
          outfit,
          musicVibe,
          loveNote: loveNote.trim() || undefined,
          partnerName: partnerName.trim() || undefined,
          instagramHandle: instagramHandle.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      if (data.pdfBase64 && data.pdfFilename) {
        setDownloadData({
          pdfBase64: data.pdfBase64,
          pdfFilename: data.pdfFilename,
        });
        downloadPdfFromBase64(data.pdfBase64, data.pdfFilename);
      }

      setStep("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dark-bg flex min-h-[100dvh] items-center justify-center px-2 py-2 sm:px-3 sm:py-3">
      <StarField />
      <AmbientGlow />
      <FloatingHearts />

      <div className="relative z-10 w-full">
        <WizardShell>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              className="w-full"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              {step === "proposal" && (
                <StepProposal
                  name={partnerName}
                  instagramHandle={instagramHandle}
                  onNameChange={setPartnerName}
                  onInstagramChange={setInstagramHandle}
                  onAccept={() => setStep("calendar")}
                  onDecline={() => setStep("declined")}
                />
              )}
              {step === "calendar" && (
                <StepCalendar
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  onNext={() => setStep("time")}
                />
              )}
              {step === "time" && (
                <StepTime
                  timeSlot={timeSlot}
                  onTimeSelect={handleTimeSelect}
                  onNext={() => setStep("activity")}
                />
              )}
              {step === "activity" && timeSlot && (
                <StepActivityMenu
                  timeSlot={timeSlot}
                  activities={activities}
                  onToggle={toggleActivity}
                  onNext={() => setStep("location")}
                />
              )}
              {step === "location" && (
                <StepLocation
                  location={location}
                  onSelect={setLocation}
                  onNext={() => setStep("mood")}
                />
              )}
              {step === "mood" && (
                <StepMood
                  moods={moods}
                  onMoodToggle={toggleMood}
                  onNext={() => setStep("outfit")}
                />
              )}
              {step === "outfit" && (
                <StepOutfit
                  outfit={outfit}
                  onSelect={setOutfit}
                  onNext={() => setStep("music")}
                />
              )}
              {step === "music" && (
                <StepMusic
                  musicVibe={musicVibe}
                  onSelect={setMusicVibe}
                  onNext={() => setStep("love-note")}
                />
              )}
              {step === "love-note" && (
                <StepLoveNote
                  loveNote={loveNote}
                  onChange={setLoveNote}
                  onNext={() => setStep("summary")}
                />
              )}
              {step === "summary" && selectedDate && timeSlot && location && outfit && musicVibe && (
                <StepSummary
                  data={{
                    date: selectedDate,
                    timeSlot,
                    activities,
                    location,
                    moods,
                    outfit,
                    musicVibe,
                    loveNote,
                    partnerName,
                    instagramHandle,
                  }}
                  onConfirm={handleConfirm}
                  loading={loading}
                />
              )}
              {step === "success" && (
                <StepSuccess
                  pdfBase64={downloadData?.pdfBase64}
                  pdfFilename={downloadData?.pdfFilename}
                />
              )}
              {step === "declined" && <StepDeclined />}
            </motion.div>
          </AnimatePresence>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300"
            >
              {error}
            </motion.div>
          )}
        </WizardShell>
      </div>
    </div>
  );
}
