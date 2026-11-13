import type { IconName } from "@/features/landing/types";
import { Icon } from "./icons";

type PlaceholderAspect = "video" | "square" | "portrait" | "wide";

interface PlaceholderProps {
  label: string;
  icon?: IconName;
  aspect?: PlaceholderAspect;
  className?: string;
}

const ASPECT_CLASSES: Record<PlaceholderAspect, string> = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  wide: "aspect-[16/7]",
};

export function Placeholder({
  label,
  icon = "star",
  aspect = "video",
  className = "",
}: PlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex flex-col items-center justify-center gap-3 overflow-hidden rounded-lg border-2 border-dashed border-line bg-surface-muted p-6 text-center ${ASPECT_CLASSES[aspect]} ${className}`}
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-surface text-brand">
        <Icon name={icon} className="size-6" />
      </span>
      <span className="max-w-xs text-xs font-semibold uppercase tracking-wide text-ink-soft">
        {label}
      </span>
    </div>
  );
}
