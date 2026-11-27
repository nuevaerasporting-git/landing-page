import type {
  NewsDraft,
  NewsValidationResult,
  StoredNewsItem,
} from "@/features/content/types/news";

const LIMITS = {
  title: 120,
  description: 240,
  instagramUrl: 300,
  imagePath: 200,
} as const;

const ID_PATTERN = /^[0-9a-f-]{36}$/i;
const IMAGE_PATH_PATTERN = /^news\/[0-9a-f-]{36}\.(jpg|png|webp|avif)$/;
const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const INSTAGRAM_HOSTS = new Set(["instagram.com", "www.instagram.com"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readText(
  value: unknown,
  label: string,
  maxLength: number,
): NewsValidationResult<string> {
  if (typeof value !== "string") {
    return { ok: false, error: `${label}: ingresá un texto válido.` };
  }

  const text = value.trim();
  if (text.length > maxLength) {
    return {
      ok: false,
      error: `${label}: no puede superar ${maxLength} caracteres.`,
    };
  }

  return { ok: true, value: text };
}

function readRequiredText(
  value: unknown,
  label: string,
  maxLength: number,
): NewsValidationResult<string> {
  const result = readText(value, label, maxLength);
  if (!result.ok) return result;
  if (result.value.length === 0) {
    return { ok: false, error: `${label} es obligatorio.` };
  }
  return result;
}

function validatePublishedAt(value: unknown): NewsValidationResult<string> {
  const result = readRequiredText(value, "Fecha de publicación", 10);
  if (!result.ok) return result;

  const match = DATE_PATTERN.exec(result.value);
  if (!match) {
    return {
      ok: false,
      error: "Fecha de publicación: usá el formato AAAA-MM-DD.",
    };
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return { ok: false, error: "Fecha de publicación: la fecha no es válida." };
  }

  return { ok: true, value: result.value };
}

function validateInstagramUrl(value: unknown): NewsValidationResult<string> {
  const result = readRequiredText(
    value,
    "Enlace de Instagram",
    LIMITS.instagramUrl,
  );
  if (!result.ok) return result;

  try {
    const url = new URL(result.value);
    const host = url.hostname.toLowerCase();

    if (
      url.protocol !== "https:" ||
      url.username.length > 0 ||
      url.password.length > 0 ||
      !INSTAGRAM_HOSTS.has(host)
    ) {
      return {
        ok: false,
        error: "Enlace de Instagram: usá una URL pública de Instagram.",
      };
    }

    return { ok: true, value: result.value };
  } catch {
    return {
      ok: false,
      error: "Enlace de Instagram: ingresá una URL válida.",
    };
  }
}

export function isNewsImagePath(value: string): boolean {
  return IMAGE_PATH_PATTERN.test(value);
}

function validateImagePath(value: unknown): NewsValidationResult<string> {
  const result = readRequiredText(value, "Imagen", LIMITS.imagePath);
  if (!result.ok) return result;

  if (!isNewsImagePath(result.value)) {
    return {
      ok: false,
      error: "La imagen seleccionada no es válida. Volvé a subirla.",
    };
  }

  return { ok: true, value: result.value };
}

export function validateNewsDraft(value: unknown): NewsValidationResult<NewsDraft> {
  if (!isRecord(value)) {
    return { ok: false, error: "No se recibieron los datos de la noticia." };
  }

  const title = readRequiredText(value.title, "Título", LIMITS.title);
  if (!title.ok) return title;

  const publishedAt = validatePublishedAt(value.publishedAt);
  if (!publishedAt.ok) return publishedAt;

  const description = readRequiredText(
    value.description,
    "Descripción",
    LIMITS.description,
  );
  if (!description.ok) return description;

  const instagramUrl = validateInstagramUrl(value.instagramUrl);
  if (!instagramUrl.ok) return instagramUrl;

  const imagePath = validateImagePath(value.imagePath);
  if (!imagePath.ok) return imagePath;

  return {
    ok: true,
    value: {
      title: title.value,
      publishedAt: publishedAt.value,
      description: description.value,
      instagramUrl: instagramUrl.value,
      imagePath: imagePath.value,
    },
  };
}

export function validateNewsId(value: unknown): NewsValidationResult<string> {
  const result = readRequiredText(value, "Identificador", LIMITS.imagePath);
  if (!result.ok) return result;

  if (!ID_PATTERN.test(result.value)) {
    return { ok: false, error: "La noticia seleccionada no es válida." };
  }

  return { ok: true, value: result.value };
}

export function parseStoredNewsItem(value: unknown): StoredNewsItem | null {
  const draft = validateNewsDraft(value);
  if (!draft.ok || !isRecord(value)) return null;

  const id = validateNewsId(value.id);
  if (!id.ok) return null;

  return { id: id.value, ...draft.value };
}

export function parseStoredNewsItems(
  value: unknown,
): NewsValidationResult<StoredNewsItem[]> {
  if (value === undefined) return { ok: true, value: [] };
  if (!Array.isArray(value)) {
    return {
      ok: false,
      error: "El campo news.items no tiene un formato válido.",
    };
  }

  const items: StoredNewsItem[] = [];
  for (const [index, entry] of value.entries()) {
    const item = parseStoredNewsItem(entry);
    if (!item) {
      return {
        ok: false,
        error: `La noticia guardada ${index + 1} tiene un formato incompatible.`,
      };
    }
    items.push(item);
  }

  return { ok: true, value: items };
}
