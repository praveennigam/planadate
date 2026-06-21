"use client";

import { MOODS, type Mood } from "@/types/date-plan";
import { SelectionGrid, StepFooter } from "@/components/ui/SelectionGrid";
import { StepHeader, StepShell } from "@/components/ui/StepLayout";

interface StepMoodProps {
  moods: Mood[];
  onMoodToggle: (mood: Mood) => void;
  onNext: () => void;
}

export function StepMood({ moods, onMoodToggle, onNext }: StepMoodProps) {
  return (
    <StepShell wide>
      <StepHeader
        emoji="💭"
        title="What are we feeling?"
        subtitle="Pick one or more — set the vibe for our date ✨"
        accent="pink"
      />
      <SelectionGrid
        items={MOODS}
        selected={moods}
        onSelect={onMoodToggle}
        multi
        columns={3}
      />
      <StepFooter
        show={moods.length > 0}
        onContinue={onNext}
        hint="Vibe locked in! ✨"
      />
    </StepShell>
  );
}
