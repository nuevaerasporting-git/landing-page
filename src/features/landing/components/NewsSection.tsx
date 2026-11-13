import { NEWS_ITEMS } from "@/features/landing/data/news";
import { Section } from "@/shared/ui/Section";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { NewsCard } from "./NewsCard";
import { NewsEmptyState } from "./NewsEmptyState";

export function NewsSection() {
  return (
    <Section id="novedades" tone="muted">
      <SectionHeading
        eyebrow="Novedades"
        title="Lo que viene en NESC"
        description="Un espacio preparado para publicar convocatorias, eventos y noticias del club."
        tone="muted"
      />
      {NEWS_ITEMS.length > 0 ? (
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {NEWS_ITEMS.map((item) => (
            <NewsCard key={item.title} item={item} />
          ))}
        </div>
      ) : (
        <NewsEmptyState />
      )}
    </Section>
  );
}
