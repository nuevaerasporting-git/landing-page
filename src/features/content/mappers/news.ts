import type { NewsItem, NewsSection } from "@/features/content/types/news";
import type { NewsSectionData } from "@/features/content/types/site-configuration";

export function mapNewsSection(
  section: NewsSectionData,
  items: NewsItem[],
): NewsSection {
  return {
    title: section.title,
    description: section.description,
    mediaLabel: section.mediaLabel,
    cardTitle: section.cardTitle,
    cardDescription: section.cardDescription,
    note: section.note,
    placeholders: section.placeholders,
    items,
  };
}
