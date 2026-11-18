import {
  NEWS_CONTENT,
  NEWS_PLACEHOLDERS,
} from "@/features/content/data/landing";
import { cn } from "@/shared/lib/cn";
import { MediaPlaceholder } from "@/shared/ui/media-placeholder";
import { Section } from "@/shared/ui/section";

export function NewsSection() {
  return (
    <Section
      id="novedades"
      title={NEWS_CONTENT.title}
      description={NEWS_CONTENT.description}
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {NEWS_PLACEHOLDERS.map((slot, index) => (
          <li key={slot} className={cn(index === 2 && "hidden lg:block")}>
            <article className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white transition-colors hover:border-brand/50">
              <MediaPlaceholder
                label={NEWS_CONTENT.mediaLabel}
                framed={false}
                className="aspect-[16/10]"
              />
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <span
                  aria-hidden="true"
                  className="block h-0.5 w-10 bg-brand"
                />
                <h3 className="mt-3 text-lg font-bold tracking-tight text-ink">
                  {NEWS_CONTENT.cardTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {NEWS_CONTENT.cardDescription}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-sm leading-relaxed text-muted">
        {NEWS_CONTENT.note}
      </p>
    </Section>
  );
}
