import {
  createNewsItem,
  deleteNewsItem,
  getNewsImagePublicUrl,
  readNewsSection,
  updateNewsItem,
} from "@/features/content/repositories/news";
import { readPublicNewsSection } from "@/features/content/repositories/public-news";
import type {
  NewsMutationResult,
  NewsReadResult,
} from "@/features/content/types/news";
import { verifyNewsUploadToken } from "@/features/content/utils/news-upload-token";
import {
  isNewsImagePath,
  validateNewsDraft,
  validateNewsId,
} from "@/features/content/utils/validate-news";
import {
  removeIfUnreferenced,
  rollbackUpload,
} from "@/features/media/services/image-cleanup";

const MISSING_ERROR = "No se encontró la noticia.";
const INVALID_UPLOAD_ERROR = "La imagen subida no es válida. Volvé a subirla.";
const MISMATCH_ERROR =
  "La imagen subida no coincide con la imagen de la noticia. Volvé a subirla.";

interface UploadHint {
  verifiedPath: string | null;
  error?: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readTextHint(input: unknown, key: string): string | null {
  if (!isRecord(input)) return null;
  const value = input[key];
  return typeof value === "string" ? value : null;
}

function resolveUploadHint(input: unknown): UploadHint {
  const uploaded = readTextHint(input, "uploadedImagePath");
  const imagePath = readTextHint(input, "imagePath");
  const token = readTextHint(input, "uploadToken");

  if (uploaded === null && token === null) return { verifiedPath: null };
  if (uploaded === null || token === null) {
    return { verifiedPath: null, error: INVALID_UPLOAD_ERROR };
  }
  if (!isNewsImagePath(uploaded) || !verifyNewsUploadToken(uploaded, token)) {
    return { verifiedPath: null, error: INVALID_UPLOAD_ERROR };
  }
  if (uploaded !== imagePath) {
    return { verifiedPath: uploaded, error: MISMATCH_ERROR };
  }

  return { verifiedPath: uploaded };
}

async function publicUrlFor(path: string): Promise<string> {
  try {
    return getNewsImagePublicUrl(path);
  } catch {
    console.warn(`[news] Could not derive the public URL for ${path}`);
    return "";
  }
}

async function rollbackUploadIfNeeded(path: string | null): Promise<void> {
  if (!path) return;
  await rollbackUpload(path, await publicUrlFor(path));
}

async function cleanupImage(path: string): Promise<void> {
  if (!isNewsImagePath(path)) return;
  await removeIfUnreferenced(path, await publicUrlFor(path));
}

async function rejectMutation(
  result: NewsMutationResult,
  verifiedPath: string | null,
): Promise<NewsMutationResult> {
  await rollbackUploadIfNeeded(verifiedPath);
  return result;
}

export async function getPublicNewsSection(): Promise<NewsReadResult> {
  return readPublicNewsSection();
}

export async function getAdminNewsSection(): Promise<NewsReadResult> {
  return readNewsSection();
}

export async function createNews(input: unknown): Promise<NewsMutationResult> {
  const upload = resolveUploadHint(input);
  if (upload.error) {
    return rejectMutation({ ok: false, error: upload.error }, upload.verifiedPath);
  }

  const parsed = validateNewsDraft(input);
  if (!parsed.ok) {
    return rejectMutation(parsed, upload.verifiedPath);
  }

  const result = await createNewsItem(parsed.value);
  if (!result.ok) {
    return rejectMutation(result, upload.verifiedPath);
  }

  return result;
}

export async function updateNews(
  id: unknown,
  input: unknown,
): Promise<NewsMutationResult> {
  const upload = resolveUploadHint(input);
  if (upload.error) {
    return rejectMutation({ ok: false, error: upload.error }, upload.verifiedPath);
  }

  const parsed = validateNewsDraft(input);
  if (!parsed.ok) {
    return rejectMutation(parsed, upload.verifiedPath);
  }

  const idResult = validateNewsId(id);
  if (!idResult.ok) {
    return rejectMutation(idResult, upload.verifiedPath);
  }

  const current = await getAdminNewsSection();
  if (!current.ok) {
    return rejectMutation(current, upload.verifiedPath);
  }

  const previous = current.section.items.find(
    (item) => item.id === idResult.value,
  );
  if (!previous) {
    return rejectMutation(
      { ok: false, error: MISSING_ERROR },
      upload.verifiedPath,
    );
  }

  const result = await updateNewsItem(idResult.value, parsed.value);
  if (!result.ok) {
    return rejectMutation(result, upload.verifiedPath);
  }

  if (previous.imagePath !== parsed.value.imagePath) {
    await cleanupImage(previous.imagePath);
  }

  return result;
}

export async function deleteNews(id: unknown): Promise<NewsMutationResult> {
  const idResult = validateNewsId(id);
  if (!idResult.ok) return idResult;

  const current = await getAdminNewsSection();
  if (!current.ok) return current;

  const item = current.section.items.find(
    (candidate) => candidate.id === idResult.value,
  );
  if (!item) return { ok: false, error: MISSING_ERROR };

  const result = await deleteNewsItem(idResult.value);
  if (!result.ok) return result;

  await cleanupImage(item.imagePath);
  return result;
}
