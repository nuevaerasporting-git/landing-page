import { randomUUID } from "node:crypto";
import { mapNewsSection } from "@/features/content/mappers/news";
import {
  getSiteDomain,
  hasExpectedShape,
} from "@/features/content/repositories/site-configuration";
import type {
  NewsItem,
  NewsMutationResult,
  NewsReadResult,
  StoredNewsItem,
} from "@/features/content/types/news";
import type { Sections } from "@/features/content/types/site-configuration";
import {
  parseStoredNewsItems,
  validateNewsDraft,
  validateNewsId,
} from "@/features/content/utils/validate-news";
import { getAdminClient } from "@/shared/supabase/admin";

const SECTIONS_TABLE = "site_configurations";
const MEDIA_BUCKET = "media";
const READ_ERROR = "No se pudo cargar la sección de noticias.";
const WRITE_ERROR = "No se pudo guardar la sección de noticias.";
const NOT_FOUND_ERROR = "No se encontró la configuración del sitio.";
const MISSING_ERROR = "No se encontró la noticia.";

interface SiteConfigurationRow {
  uuid: string;
  sections: unknown;
}

type LoadResult =
  | { ok: true; sections: Sections }
  | { ok: false; error: string };

type WriteResult = { ok: true } | { ok: false; error: string };

export function getNewsImagePublicUrl(imagePath: string): string {
  const { data } = getAdminClient()
    .storage.from(MEDIA_BUCKET)
    .getPublicUrl(imagePath);
  return data.publicUrl;
}

export async function readNewsSection(): Promise<NewsReadResult> {
  const loaded = await loadSections();
  if (!loaded.ok) return loaded;

  const raw = loaded.sections.news;
  const parsed = parseStoredNewsItems(raw.items);
  if (!parsed.ok) return { ok: false, error: parsed.error };

  return {
    ok: true,
    section: mapNewsSection(raw, parsed.value.map(toNewsItem)),
  };
}

export async function createNewsItem(input: unknown): Promise<NewsMutationResult> {
  const parsed = validateNewsDraft(input);
  if (!parsed.ok) return parsed;

  const loaded = await loadSections();
  if (!loaded.ok) return loaded;

  const current = parseStoredNewsItems(loaded.sections.news.items);
  if (!current.ok) return current;

  const stored: StoredNewsItem = { id: randomUUID(), ...parsed.value };
  const items = [...current.value, stored];
  const written = await writeItems(loaded.sections, items);
  if (!written.ok) return written;

  return { ok: true, items: items.map(toNewsItem) };
}

export async function updateNewsItem(
  id: unknown,
  input: unknown,
): Promise<NewsMutationResult> {
  const idResult = validateNewsId(id);
  if (!idResult.ok) return idResult;

  const parsed = validateNewsDraft(input);
  if (!parsed.ok) return parsed;

  const loaded = await loadSections();
  if (!loaded.ok) return loaded;

  const current = parseStoredNewsItems(loaded.sections.news.items);
  if (!current.ok) return current;

  const index = current.value.findIndex((item) => item.id === idResult.value);
  if (index === -1) return { ok: false, error: MISSING_ERROR };

  const stored: StoredNewsItem = { id: idResult.value, ...parsed.value };
  const items = current.value.map((item, itemIndex) =>
    itemIndex === index ? stored : item,
  );
  const written = await writeItems(loaded.sections, items);
  if (!written.ok) return written;

  return { ok: true, items: items.map(toNewsItem) };
}

export async function deleteNewsItem(id: unknown): Promise<NewsMutationResult> {
  const idResult = validateNewsId(id);
  if (!idResult.ok) return idResult;

  const loaded = await loadSections();
  if (!loaded.ok) return loaded;

  const current = parseStoredNewsItems(loaded.sections.news.items);
  if (!current.ok) return current;

  if (!current.value.some((item) => item.id === idResult.value)) {
    return { ok: false, error: MISSING_ERROR };
  }

  const items = current.value.filter((item) => item.id !== idResult.value);
  const written = await writeItems(loaded.sections, items);
  if (!written.ok) return written;

  return { ok: true, items: items.map(toNewsItem) };
}

async function loadSections(): Promise<LoadResult> {
  try {
    const { data, error } = await getAdminClient()
      .from(SECTIONS_TABLE)
      .select("uuid, sections")
      .eq("domain", getSiteDomain())
      .maybeSingle();

    if (error) {
      console.warn(`[news] Could not read site sections: ${error.message}`);
      return { ok: false, error: READ_ERROR };
    }

    const row = data as unknown as SiteConfigurationRow | null;
    if (!row) return { ok: false, error: NOT_FOUND_ERROR };

    if (!hasExpectedShape(row.sections)) {
      console.warn("[news] Unexpected sections payload");
      return { ok: false, error: READ_ERROR };
    }

    return { ok: true, sections: row.sections };
  } catch {
    console.warn("[news] Admin client unavailable");
    return { ok: false, error: READ_ERROR };
  }
}

function toNewsItem(item: StoredNewsItem): NewsItem {
  return {
    ...item,
    imagePublicUrl: getNewsImagePublicUrl(item.imagePath),
  };
}

async function writeItems(
  sections: Sections,
  items: StoredNewsItem[],
): Promise<WriteResult> {
  const nextSections: Sections = {
    ...sections,
    news: { ...sections.news, items },
  };

  try {
    const { data, error } = await getAdminClient()
      .from(SECTIONS_TABLE)
      .update({ sections: nextSections })
      .eq("domain", getSiteDomain())
      .select("uuid");

    if (error) {
      console.warn(`[news] Could not write site sections: ${error.message}`);
      return { ok: false, error: WRITE_ERROR };
    }

    if (!data || data.length === 0) {
      console.warn("[news] No site configuration matched the domain");
      return { ok: false, error: NOT_FOUND_ERROR };
    }

    return { ok: true };
  } catch {
    console.warn("[news] Could not write site sections");
    return { ok: false, error: WRITE_ERROR };
  }
}
