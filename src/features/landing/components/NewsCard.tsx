import type { NewsItem } from "@/features/landing/types";
import { Icon } from "@/shared/ui/icons";
import { Placeholder } from "@/shared/ui/Placeholder";

interface NewsCardProps {
  item: NewsItem;
}

export function NewsCard({ item }: NewsCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-card">
      <Placeholder
        label={item.imageLabel}
        icon="calendar"
        aspect="video"
        className="rounded-none border-0 border-b"
      />
      <div className="flex flex-1 flex-col p-5">
        <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-brand">
          <Icon name="calendar" className="size-3.5" />
          {item.category}
        </p>
        <h3 className="mt-2 text-lg font-extrabold leading-snug text-ink">
          {item.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {item.summary}
        </p>
        <p className="mt-4 text-xs font-semibold text-muted">
          Contenido pendiente de publicación.
        </p>
      </div>
    </article>
  );
}
