import { randomUUID } from "node:crypto";
import {
  readAdminSections,
  writeSections,
} from "@/features/content/repositories/activities";
import {
  getImagePublicUrl,
  removeIfUnreferenced,
  rollbackUpload,
} from "@/features/content/services/activities-storage";
import type {
  ActivitiesHeader,
  ActivitiesSection,
  ActivityActionResult,
  ActivityCard,
  ActivityCardDraft,
  StoredActivityCard,
} from "@/features/content/types/activities";
import type { CtaLink } from "@/features/content/types/landing";
import type { Sections } from "@/features/content/types/site-configuration";
import {
  validateActivitiesHeader,
  validateActivityCard,
  validateCardId,
} from "@/features/content/utils/validate-activities";

interface LoadedActivities {
  section: ActivitiesSection;
  sections: Sections;
}

type LoadResult =
  | { ok: true; value: LoadedActivities }
  | { ok: false; error: string };

const PREPARE_ERROR = "No se pudo preparar la imagen de la actividad.";

export async function getActivitiesSection(): Promise<ActivitiesSection | null> {
  const loaded = await loadActivities();
  return loaded.ok ? loaded.value.section : null;
}

export async function saveHeader(input: unknown): Promise<ActivityActionResult> {
  const parsed = validateActivitiesHeader(input);
  if (!parsed.ok) return parsed;

  const loaded = await loadActivities();
  if (!loaded.ok) return loaded;

  const section: ActivitiesSection = { ...loaded.value.section, ...parsed.value };
  return persist(loaded.value.sections, section, null);
}

export async function createCard(input: unknown): Promise<ActivityActionResult> {
  const loaded = await loadActivities();
  if (!loaded.ok) return loaded;

  const parsed = validateActivityCard(input, loaded.value.section.cardCta);
  if (!parsed.ok) return parsed;

  let card: ActivityCard;
  try {
    card = buildCard(parsed.value, null);
  } catch {
    if (parsed.value.imagePath) await rollbackUpload(parsed.value.imagePath);
    return { ok: false, error: PREPARE_ERROR };
  }

  const section: ActivitiesSection = {
    ...loaded.value.section,
    items: [...loaded.value.section.items, card],
  };
  return persist(loaded.value.sections, section, parsed.value.imagePath);
}

export async function updateCard(input: unknown): Promise<ActivityActionResult> {
  if (!isRecord(input)) {
    return { ok: false, error: "No se recibieron los datos de la actividad." };
  }

  const idResult = validateCardId(input.id);
  if (!idResult.ok) return idResult;

  const loaded = await loadActivities();
  if (!loaded.ok) return loaded;

  const existing = loaded.value.section.items.find(
    (item) => item.id === idResult.value,
  );
  if (!existing) {
    return { ok: false, error: "No se encontró la actividad." };
  }

  const parsed = validateActivityCard(input, loaded.value.section.cardCta);
  if (!parsed.ok) return parsed;

  let card: ActivityCard;
  try {
    card = buildCard(parsed.value, existing);
  } catch {
    if (parsed.value.imagePath) await rollbackUpload(parsed.value.imagePath);
    return { ok: false, error: PREPARE_ERROR };
  }

  const section: ActivitiesSection = {
    ...loaded.value.section,
    items: loaded.value.section.items.map((item) =>
      item.id === existing.id ? card : item,
    ),
  };

  const result = await persist(
    loaded.value.sections,
    section,
    parsed.value.imagePath,
  );
  if (!result.ok) return result;

  const imageWillChange =
    parsed.value.imagePath !== null || parsed.value.removeImage;
  if (existing.image && imageWillChange) {
    await removeIfUnreferenced(existing.image.path, existing.image.publicUrl);
  }

  return result;
}

export async function deleteCard(input: unknown): Promise<ActivityActionResult> {
  const idResult = validateCardId(input);
  if (!idResult.ok) return idResult;

  const loaded = await loadActivities();
  if (!loaded.ok) return loaded;

  const existing = loaded.value.section.items.find(
    (item) => item.id === idResult.value,
  );
  if (!existing) {
    return { ok: false, error: "No se encontró la actividad." };
  }

  const section: ActivitiesSection = {
    ...loaded.value.section,
    items: loaded.value.section.items.filter((item) => item.id !== existing.id),
  };

  const result = await persist(loaded.value.sections, section, null);
  if (!result.ok) return result;

  if (existing.image) {
    await removeIfUnreferenced(existing.image.path, existing.image.publicUrl);
  }

  return result;
}

async function loadActivities(): Promise<LoadResult> {
  const sections = await readAdminSections();
  if (!sections) {
    return { ok: false, error: "No se pudo cargar la sección Actividades." };
  }

  const raw = sections.activities;
  const header: ActivitiesHeader = {
    title: raw.title,
    description: raw.description,
    pendingBadge: raw.pendingBadge,
    cardCta: raw.cardCta,
    mediaLabel: raw.mediaLabel,
    note: raw.note,
  };
  const items = raw.items.map((item, index) =>
    normalizeCard(item, index, header.cardCta),
  );

  return { ok: true, value: { section: { ...header, items }, sections } };
}

async function persist(
  sections: Sections,
  section: ActivitiesSection,
  uploadedPath: string | null,
): Promise<ActivityActionResult> {
  const result = await writeSections({ ...sections, activities: section });
  if (!result.ok) {
    if (uploadedPath) await rollbackUpload(uploadedPath);
    return result;
  }
  return { ok: true, section };
}

function normalizeCard(
  item: StoredActivityCard,
  index: number,
  fallbackCta: CtaLink,
): ActivityCard {
  return {
    id: item.id ?? `legacy-${index}`,
    name: item.name,
    consultationAriaLabel:
      item.consultationAriaLabel || `Consultar sobre ${item.name}`,
    schedule: item.schedule ?? "",
    image: item.image ?? null,
    cta: item.cta ?? fallbackCta,
  };
}

function buildCard(
  draft: ActivityCardDraft,
  existing: ActivityCard | null,
): ActivityCard {
  let image = existing?.image ?? null;
  if (draft.removeImage) image = null;
  if (draft.imagePath) {
    image = {
      path: draft.imagePath,
      publicUrl: getImagePublicUrl(draft.imagePath),
      alt: draft.imageAlt || draft.name,
    };
  }

  return {
    id: existing?.id ?? draft.id ?? randomUUID(),
    name: draft.name,
    consultationAriaLabel: draft.consultationAriaLabel,
    schedule: draft.schedule,
    image,
    cta: draft.cta,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
