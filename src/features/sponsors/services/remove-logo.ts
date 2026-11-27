import { getAdminClient } from "@/shared/supabase/admin";

const MEDIA_BUCKET = "media";

export async function removeSponsorLogo(path: string): Promise<void> {
  if (!path.startsWith("sponsors/")) return;

  try {
    const { error } = await getAdminClient()
      .storage.from(MEDIA_BUCKET)
      .remove([path]);

    if (error) console.warn(`[sponsors] Logo cleanup failed: ${error.message}`);
  } catch {
    console.warn("[sponsors] Storage unavailable during logo cleanup");
  }
}
