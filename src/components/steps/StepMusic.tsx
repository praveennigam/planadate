"use client";

import { MUSIC_VIBES, type MusicVibe } from "@/types/date-plan";
import { SelectionGrid, StepFooter } from "@/components/ui/SelectionGrid";
import { StepHeader, StepShell } from "@/components/ui/StepLayout";

interface StepMusicProps {
  musicVibe: MusicVibe | null;
  onSelect: (vibe: MusicVibe) => void;
  onNext: () => void;
}

export function StepMusic({ musicVibe, onSelect, onNext }: StepMusicProps) {
  return (
    <StepShell wide>
      <StepHeader
        emoji="🎵"
        title="Playlist vibe?"
        subtitle="What should the soundtrack of our date be?"
        accent="purple"
      />
      <SelectionGrid
        items={MUSIC_VIBES}
        selected={musicVibe}
        onSelect={onSelect}
        columns={3}
      />
      <StepFooter
        show={!!musicVibe}
        onContinue={onNext}
        hint={musicVibe ? "Perfect soundtrack locked in 🎶" : undefined}
      />
    </StepShell>
  );
}
