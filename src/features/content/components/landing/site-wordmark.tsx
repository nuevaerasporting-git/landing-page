import Image from "next/image";
import { cn } from "@/shared/lib/cn";

type SiteWordmarkTone = "light" | "dark";

interface SiteWordmarkProps {
  tone?: SiteWordmarkTone;
  preload?: boolean;
  className?: string;
}

export function SiteWordmark({
  tone = "light",
  preload = false,
  className,
}: SiteWordmarkProps) {
  const isDark = tone === "dark";

  return (
    <span className={cn("flex items-center gap-2.5 sm:gap-3", className)}>
      <Image
        src="/nesc-escudo-manual.png"
        alt=""
        width={430}
        height={463}
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
          Nueva Era
        </span>
        <span
          className={cn(
            "mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] sm:text-[11px]",
            isDark ? "text-white/60" : "text-muted",
          )}
        >
          Sporting Club
        </span>
      </span>
    </span>
  );
}
