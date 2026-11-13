import type { HistoryEvent } from "@/features/landing/types";

interface HistoryTimelineProps {
  events: readonly HistoryEvent[];
}

export function HistoryTimeline({ events }: HistoryTimelineProps) {
  return (
    <ol className="relative border-l-2 border-brand/20 pl-5">
      {events.map((event) => (
        <li key={`${event.year}-${event.title}`} className="relative pb-6 last:pb-0">
          <span
            className="absolute -left-[1.65rem] top-1 size-3 rounded-full border-2 border-surface bg-brand"
            aria-hidden="true"
          />
          <p className="text-xs font-extrabold uppercase tracking-wide text-brand">
            {event.year}
          </p>
          <h3 className="mt-1 text-base font-extrabold text-ink">{event.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {event.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
