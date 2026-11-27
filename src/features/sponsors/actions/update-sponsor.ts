"use server";

import { updateSponsorRow } from "@/features/sponsors/repositories/sponsors";
import { revalidateSponsorPaths } from "@/features/sponsors/services/revalidate";
import { removeSponsorLogo } from "@/features/sponsors/services/remove-logo";
import {
  UUID_PATTERN,
  validateSponsorForm,
} from "@/features/sponsors/services/validate-sponsor";
import type { SponsorActionResult } from "@/features/sponsors/types/sponsor";

const SAVE_ERROR = "No se pudo guardar el patrocinador. Intentá de nuevo.";
const INVALID_ERROR = "El patrocinador no es válido.";

export async function updateSponsor(
  formData: FormData,
): Promise<SponsorActionResult> {
  const id = formData.get("id");
  if (typeof id !== "string" || !UUID_PATTERN.test(id)) {
    return { ok: false, error: INVALID_ERROR };
  }

  const validation = validateSponsorForm(formData);
  if (!validation.ok) return validation;

  const existingLogoPath =
    typeof formData.get("existingLogoPath") === "string"
      ? String(formData.get("existingLogoPath"))
      : "";
  const logoChanged = validation.value.logoPath !== existingLogoPath;

  const result = await updateSponsorRow(id, validation.value);
  if (!result.ok) {
    if (logoChanged) await removeSponsorLogo(validation.value.logoPath);
    return { ok: false, error: SAVE_ERROR };
  }

  if (logoChanged) await removeSponsorLogo(existingLogoPath);
  revalidateSponsorPaths();
  return { ok: true, sponsorId: id };
}
