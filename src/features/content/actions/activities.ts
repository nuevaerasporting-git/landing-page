"use server";

import { revalidatePath } from "next/cache";
import {
  createCard,
  deleteCard,
  saveHeader,
  updateCard,
} from "@/features/content/services/activities";
import type {
  ActivityActionResult,
  UploadActivityImageResult,
} from "@/features/content/types/activities";
import { uploadImage } from "@/features/media/actions/upload-image";

function finish(result: ActivityActionResult): ActivityActionResult {
  if (result.ok) {
    revalidatePath("/");
    revalidatePath("/admin/contenido/activities");
  }
  return result;
}

function readCardPayload(formData: FormData): Record<string, unknown> {
  const ctaHref = formData.get("ctaHref");
  const ctaLabel = formData.get("ctaLabel");
  const hasCustomCta =
    typeof ctaHref === "string" && ctaHref.trim().length > 0;

  return {
    id: formData.get("id"),
    name: formData.get("name"),
    schedule: formData.get("schedule"),
    imagePath: formData.get("imagePath"),
    imageAlt: formData.get("imageAlt"),
    consultationAriaLabel: formData.get("consultationAriaLabel"),
    removeImage: formData.get("removeImage") === "true",
    cta: hasCustomCta ? { href: ctaHref, label: ctaLabel } : undefined,
  };
}

// TODO(auth): validar requireRole(["admin", "editor"])
export async function saveActivitiesHeaderAction(
  formData: FormData,
): Promise<ActivityActionResult> {
  return finish(
    await saveHeader({
      title: formData.get("title"),
      description: formData.get("description"),
      pendingBadge: formData.get("pendingBadge"),
      cardCta: {
        href: formData.get("cardCtaHref"),
        label: formData.get("cardCtaLabel"),
      },
      mediaLabel: formData.get("mediaLabel"),
      note: formData.get("note"),
    }),
  );
}

// TODO(auth): validar requireRole(["admin", "editor"])
export async function createActivityCardAction(
  formData: FormData,
): Promise<ActivityActionResult> {
  return finish(await createCard(readCardPayload(formData)));
}

// TODO(auth): validar requireRole(["admin", "editor"])
export async function updateActivityCardAction(
  formData: FormData,
): Promise<ActivityActionResult> {
  return finish(await updateCard(readCardPayload(formData)));
}

// TODO(auth): validar requireRole(["admin", "editor"])
export async function deleteActivityCardAction(
  formData: FormData,
): Promise<ActivityActionResult> {
  return finish(await deleteCard(formData.get("id")));
}

// TODO(auth): validar requireRole(["admin", "editor"])
export async function uploadActivityImageAction(
  formData: FormData,
): Promise<UploadActivityImageResult> {
  const payload = new FormData();
  payload.set("section", "activities");

  const file = formData.get("image") ?? formData.get("file");
  if (file instanceof File) payload.set("image", file);

  return uploadImage(payload);
}
