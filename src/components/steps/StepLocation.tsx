"use client";

import { LOCATIONS, type Location } from "@/types/date-plan";
import { SelectionGrid, StepFooter } from "@/components/ui/SelectionGrid";
import { StepHeader, StepShell } from "@/components/ui/StepLayout";

interface StepLocationProps {
  location: Location | null;
  onSelect: (loc: Location) => void;
  onNext: () => void;
}

export function StepLocation({ location, onSelect, onNext }: StepLocationProps) {
  return (
    <StepShell wide>
      <StepHeader
        emoji="📍"
        title="Where should we meet?"
        subtitle="Pick the perfect spot for our date"
        accent="amber"
      />
      <SelectionGrid
        items={LOCATIONS}
        selected={location}
        onSelect={onSelect}
        columns={3}
      />
      <StepFooter
        show={!!location}
        onContinue={onNext}
        hint={location ? "Great spot picked! ✨" : undefined}
      />
    </StepShell>
  );
}
