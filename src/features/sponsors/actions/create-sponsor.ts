"use server";

import { insertSponsorRow } from "@/features/sponsors/repositories/sponsors";
import { revalidateSponsorPaths } from "@/features/sponsors/services/revalidate";
import { removeSponsorLogo } from "@/features/sponsors/services/remove-logo";
import { validateSponsorForm } from "@/features/sponsors/services/validate-sponsor";
import type { SponsorActionResult } from "@/features/sponsors/types/sponsor";

const SAVE_ERROR = "No se pudo guardar el patrocinador. Intentá de nuevo.";

export async function createSponsor(
  formData: FormData,
): Promise<SponsorActionResult> {
  const validation = validateSponsorForm(formData);
  if (!validation.ok) return validation;

  const result = await insertSponsorRow(validation.value);
  if (!result.ok) {
    await removeSponsorLogo(validation.value.logoPath);
    return { ok: false, error: SAVE_ERROR };
  }

  revalidateSponsorPaths();
  return { ok: true, sponsorId: result.id };
}
