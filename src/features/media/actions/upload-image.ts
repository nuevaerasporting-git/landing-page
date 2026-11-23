"use server";

import { randomUUID } from "node:crypto";
import { isSectionKey } from "@/features/content/utils/section-keys";
import type { UploadImageResult } from "@/features/media/types/media";
import { validateImage } from "@/features/media/utils/validate-image";
import { getAdminClient } from "@/shared/supabase/admin";

const MEDIA_BUCKET = "media";
const UPLOAD_ERROR = "No se pudo subir la imagen. Intentá de nuevo.";

export async function uploadImage(
  formData: FormData,
): Promise<UploadImageResult> {
  const rawSection = formData.get("section");
  if (typeof rawSection !== "string" || !isSectionKey(rawSection)) {
    return { ok: false, error: "Seleccioná una sección válida." };
  }

  const file = formData.get("image") ?? formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Seleccioná una imagen para subir." };
  }

  const validation = await validateImage(file);
  if (!validation.ok) return { ok: false, error: validation.error };

  const path = `${rawSection}/${randomUUID()}.${validation.extension}`;

  try {
    const storage = getAdminClient().storage.from(MEDIA_BUCKET);
    const bytes = await file.arrayBuffer();
    const { error } = await storage.upload(path, bytes, {
      contentType: validation.mimeType,
      upsert: false,
    });

    if (error) {
      console.warn("Supabase media upload failed", error.message);
      return { ok: false, error: UPLOAD_ERROR };
    }

    const { data } = storage.getPublicUrl(path);
    return { ok: true, path, publicUrl: data.publicUrl };
  } catch {
    console.warn("Supabase media upload failed unexpectedly");
    return { ok: false, error: UPLOAD_ERROR };
  }
}
