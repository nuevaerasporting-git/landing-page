"use server";

import { deleteSponsorRow } from "@/features/sponsors/repositories/sponsors";
import { getAdminSponsor } from "@/features/sponsors/services/get-sponsors";
import { revalidateSponsorPaths } from "@/features/sponsors/services/revalidate";
import { removeSponsorLogo } from "@/features/sponsors/services/remove-logo";
import { UUID_PATTERN } from "@/features/sponsors/services/validate-sponsor";
import type { SponsorActionResult } from "@/features/sponsors/types/sponsor";

const DELETE_ERROR = "No se pudo eliminar el patrocinador. Intentá de nuevo.";
const INVALID_ERROR = "El patrocinador no es válido.";

export async function deleteSponsor(
  formData: FormData,
): Promise<SponsorActionResult> {
  const id = formData.get("id");
  if (typeof id !== "string" || !UUID_PATTERN.test(id)) {
    return { ok: false, error: INVALID_ERROR };
  }

  const sponsor = await getAdminSponsor(id);
  if (!sponsor) return { ok: false, error: "El patrocinador ya no existe." };

  const result = await deleteSponsorRow(id);
  if (!result.ok) return { ok: false, error: DELETE_ERROR };

  await removeSponsorLogo(sponsor.logoPath);
  revalidateSponsorPaths();
  return { ok: true, sponsorId: id };
}
