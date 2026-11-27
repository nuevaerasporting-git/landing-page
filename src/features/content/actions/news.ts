"use server";

import { revalidatePath } from "next/cache";
import {
  createNews,
  deleteNews,
  updateNews,
} from "@/features/content/services/news";
import type {
  NewsImageUploadResult,
  NewsMutationResult,
} from "@/features/content/types/news";
import { createNewsUploadToken } from "@/features/content/utils/news-upload-token";
import { uploadImage } from "@/features/media/actions/upload-image";

const PUBLIC_PATH = "/";
const NEWS_ADMIN_PATH = "/admin/contenido/news";

function finish(result: NewsMutationResult): NewsMutationResult {
  if (result.ok) {
    revalidatePath(PUBLIC_PATH);
    revalidatePath(NEWS_ADMIN_PATH);
  }
  return result;
}

function readNewsPayload(formData: FormData): Record<string, unknown> {
  return {
    id: formData.get("id"),
    title: formData.get("title"),
    publishedAt: formData.get("publishedAt"),
    description: formData.get("description"),
    instagramUrl: formData.get("instagramUrl"),
    imagePath: formData.get("imagePath"),
    uploadedImagePath: formData.get("uploadedImagePath"),
    uploadToken: formData.get("uploadToken"),
  };
}

export async function createNewsAction(
  formData: FormData,
): Promise<NewsMutationResult> {
  return finish(await createNews(readNewsPayload(formData)));
}

export async function updateNewsAction(
  formData: FormData,
): Promise<NewsMutationResult> {
  const payload = readNewsPayload(formData);
  return finish(await updateNews(payload.id, payload));
}

export async function deleteNewsAction(
  formData: FormData,
): Promise<NewsMutationResult> {
  return finish(await deleteNews(formData.get("id")));
}

export async function uploadNewsImageAction(
  formData: FormData,
): Promise<NewsImageUploadResult> {
  const image = formData.get("image") ?? formData.get("file");
  if (!(image instanceof File)) {
    return { ok: false, error: "Seleccioná una imagen para subir." };
  }

  const uploadFormData = new FormData();
  uploadFormData.set("section", "news");
  uploadFormData.set("image", image);

  const result = await uploadImage(uploadFormData);
  if (!result.ok) return result;

  return { ...result, uploadToken: createNewsUploadToken(result.path) };
}
