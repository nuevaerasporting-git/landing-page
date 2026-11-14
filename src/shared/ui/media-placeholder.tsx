import { cn } from "@/shared/lib/cn";

type MediaPlaceholderTone = "light" | "dark";

interface MediaPlaceholderProps {
  label: string;
  detail?: string;
  tone?: MediaPlaceholderTone;
  framed?: boolean;
  className?: string;
}

export function MediaPlaceholder({
  label,
  detail,
  tone = "light",
  framed = true,
  className,
}: MediaPlaceholderProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden p-3 text-center sm:p-6",
        framed ? "rounded-lg border" : "border-0",
        isDark
          ? "border-white/15 bg-ink text-white"
          : "border-line bg-surface text-ink",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute -right-10 -top-10 h-36 w-36 rounded-full border-[10px]",
          isDark ? "border-brand/40" : "border-brand/15",
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute -bottom-12 -left-8 h-32 w-32 rotate-12 rounded-lg",
          isDark ? "bg-white/5" : "bg-ink/5",
        )}
      />
      <svg
        aria-hidden="true"
        className={cn(
          "relative mb-2 h-5 w-5 sm:mb-3 sm:h-8 sm:w-8",
          isDark ? "text-white/70" : "text-muted",
        )}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="2" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4 17 5-5 4 4 3-3 4 4"
        />
      </svg>
      <p
        className={cn(
          "relative text-xs font-semibold sm:text-sm",
          isDark ? "text-white" : "text-ink",
        )}
      >
        {label}
      </p>
      {detail ? (
        <p
          className={cn(
            "relative mt-1 text-xs",
            isDark ? "text-white/70" : "text-muted",
          )}
        >
          {detail}
        </p>
      ) : null}
    </div>
  );
}
