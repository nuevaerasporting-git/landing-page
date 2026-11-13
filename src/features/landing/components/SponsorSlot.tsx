import type { Sponsor } from "@/features/landing/types";
import { Icon } from "@/shared/ui/icons";

interface SponsorSlotProps {
  sponsor: Sponsor;
}

export function SponsorSlot({ sponsor }: SponsorSlotProps) {
  return (
    <div
      role="img"
      aria-label={sponsor.placeholderLabel}
      className="flex min-h-24 items-center justify-center gap-2 rounded-lg border-2 border-dashed border-line bg-surface-muted p-4 text-center"
    >
      <Icon name="star" className="size-4 shrink-0 text-muted" />
      <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
        {sponsor.placeholderLabel}
      </span>
    </div>
  );
}
