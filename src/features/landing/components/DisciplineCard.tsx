import type { Discipline } from "@/features/landing/types";
import { Icon } from "@/shared/ui/icons";

interface DisciplineCardProps {
  discipline: Discipline;
}

export function DisciplineCard({ discipline }: DisciplineCardProps) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-line bg-surface p-5 shadow-card">
      <span className="flex size-11 items-center justify-center rounded-md bg-brand/10 text-brand">
        <Icon name={discipline.icon} className="size-5" />
      </span>
      <h3 className="mt-4 text-lg font-extrabold text-ink">{discipline.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {discipline.description}
      </p>
      {discipline.details.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label={`Detalles de ${discipline.name}`}>
          {discipline.details.map((detail) => (
            <li
              key={detail}
              className="rounded-full bg-surface-muted px-2.5 py-1 text-xs font-semibold text-ink-soft"
            >
              {detail}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
