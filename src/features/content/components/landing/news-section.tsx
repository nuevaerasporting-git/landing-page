import Image from "next/image";
import type { NewsContent } from "@/features/content/types/landing";
import type { NewsItem } from "@/features/content/types/news";
import { cn } from "@/shared/lib/cn";
import { MediaPlaceholder } from "@/shared/ui/media-placeholder";
import { Section } from "@/shared/ui/section";

interface NewsSectionProps {
  content: NewsContent;
  slots: number[];
  items?: NewsItem[];
}

function formatPublishedAt(value: string): string {
  const date = new Date(`${value}T00:00:00Z`);
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function NewsSection({
  content,
  slots,
  items = [],
}: NewsSectionProps) {
  return (
    <Section
      id="novedades"
      title={content.title}
      description={content.description}
    >
      {items.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.id}>
              <article className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white transition-colors hover:border-brand/50">
                <a
                  href={item.instagramUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Ver la publicación "${item.title}" en Instagram`}
                  className="flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
                    <Image
                      src={item.imagePublicUrl}
                      alt={`Imagen de la novedad: ${item.title}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <span
                      aria-hidden="true"
                      className="block h-0.5 w-10 bg-brand"
                    />
                    <time
                      dateTime={item.publishedAt}
                      className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-muted"
                    >
                      {formatPublishedAt(item.publishedAt)}
                    </time>
                    <h3 className="mt-2 text-lg font-bold tracking-tight text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                    <span className="mt-auto pt-4 text-sm font-semibold text-brand">
                      Ver en Instagram
                    </span>
                  </div>
                </a>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {slots.map((slot, index) => (
            <li key={slot} className={cn(index === 2 && "hidden lg:block")}>
              <article className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white transition-colors hover:border-brand/50">
                <MediaPlaceholder
                  label={content.mediaLabel}
                  framed={false}
                  className="aspect-[16/10]"
                />
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <span
                    aria-hidden="true"
                    className="block h-0.5 w-10 bg-brand"
                  />
                  <h3 className="mt-3 text-lg font-bold tracking-tight text-ink">
                    {content.cardTitle}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {content.cardDescription}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}

      {items.length === 0 ? (
        <p className="mt-5 text-sm leading-relaxed text-muted">
          {content.note}
        </p>
      ) : null}
    </Section>
  );
}
