import { mapNewsSection } from "@/features/content/mappers/news";
import { getSiteSections } from "@/features/content/repositories/site-configuration";
import type {
  NewsItem,
  NewsReadResult,
  StoredNewsItem,
} from "@/features/content/types/news";
import { parseStoredNewsItems } from "@/features/content/utils/validate-news";
import { getPublicClient } from "@/shared/supabase/public";

const MEDIA_BUCKET = "media";
const READ_ERROR = "No se pudo cargar la sección de noticias.";

function getPublicNewsImageUrl(imagePath: string): string {
  const { data } = getPublicClient()
    .storage.from(MEDIA_BUCKET)
    .getPublicUrl(imagePath);
  return data.publicUrl;
}

function sortByPublishedAtDesc(items: StoredNewsItem[]): StoredNewsItem[] {
  return [...items].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function readPublicNewsSection(): Promise<NewsReadResult> {
  try {
    const sections = await getSiteSections();
    if (!sections) {
      console.warn(
        "[news] Public sections unavailable; check read access on site_configurations",
      );
      return { ok: false, error: READ_ERROR };
    }

    const parsed = parseStoredNewsItems(sections.news.items);
    if (!parsed.ok) return { ok: false, error: parsed.error };

    const items: NewsItem[] = sortByPublishedAtDesc(parsed.value).map((item) => ({
      ...item,
      imagePublicUrl: getPublicNewsImageUrl(item.imagePath),
    }));

    return { ok: true, section: mapNewsSection(sections.news, items) };
  } catch {
    console.warn("[news] Public client unavailable");
    return { ok: false, error: READ_ERROR };
  }
}
