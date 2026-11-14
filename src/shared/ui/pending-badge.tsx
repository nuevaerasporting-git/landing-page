import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type PendingBadgeTone = "light" | "dark";

interface PendingBadgeProps {
  children: ReactNode;
  tone?: PendingBadgeTone;
  className?: string;
}

const TONE_CLASSES: Record<PendingBadgeTone, string> = {
  light: "border-line bg-white text-muted",
  dark: "border-white/20 bg-transparent text-white/75",
};

export function PendingBadge({
  children,
  tone = "light",
  className,
}: PendingBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em]",
        TONE_CLASSES[tone],
        className,
      )}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </span>
  );
}
