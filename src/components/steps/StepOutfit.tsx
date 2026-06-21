"use client";

import { OUTFITS, type Outfit } from "@/types/date-plan";
import { SelectionGrid, StepFooter } from "@/components/ui/SelectionGrid";
import { StepHeader, StepShell } from "@/components/ui/StepLayout";

interface StepOutfitProps {
  outfit: Outfit | null;
  onSelect: (outfit: Outfit) => void;
  onNext: () => void;
}

export function StepOutfit({ outfit, onSelect, onNext }: StepOutfitProps) {
  return (
    <StepShell wide>
      <StepHeader
        emoji="👗"
        title="What's the dress code?"
        subtitle="How should we dress for the occasion?"
        accent="pink"
      />
      <SelectionGrid items={OUTFITS} selected={outfit} onSelect={onSelect} columns={3} />
      <StepFooter
        show={!!outfit}
        onContinue={onNext}
        hint={outfit ? "Looking good already! 💅" : undefined}
      />
    </StepShell>
  );
}
