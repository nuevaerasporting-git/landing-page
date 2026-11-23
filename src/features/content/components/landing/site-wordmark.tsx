import Image from "next/image";
import type { SiteWordmarkContent } from "@/features/content/types/landing";
import { cn } from "@/shared/lib/cn";

type SiteWordmarkTone = "light" | "dark";

interface SiteWordmarkProps {
  content: SiteWordmarkContent;
  tone?: SiteWordmarkTone;
  preload?: boolean;
  className?: string;
}

export function SiteWordmark({
  content,
  tone = "light",
  preload = false,
  className,
}: SiteWordmarkProps) {
  const isDark = tone === "dark";
  const { image, primaryLine, secondaryLine } = content;

  return (
    <span className={cn("flex items-center gap-2.5 sm:gap-3", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        preload={preload}
        className="h-11 w-auto sm:h-12 lg:h-14"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-sm font-extrabold uppercase tracking-tight sm:text-base",
            isDark ? "text-white" : "text-ink",
          )}
        >
          {primaryLine}
        </span>
        <span
          className={cn(
            "mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] sm:text-[11px]",
            isDark ? "text-white/60" : "text-muted",
          )}
        >
          {secondaryLine}
        </span>
      </span>
    </span>
  );
}
