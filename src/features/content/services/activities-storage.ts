import { isImageReferenced } from "@/features/content/repositories/image-references";
import { getAdminClient } from "@/shared/supabase/admin";

const MEDIA_BUCKET = "media";

export function getImagePublicUrl(path: string): string {
  const { data } = getAdminClient()
    .storage.from(MEDIA_BUCKET)
    .getPublicUrl(path);
  return data.publicUrl;
}

export async function rollbackUpload(path: string): Promise<void> {
  await removeFromStorage(path, "rollback");
}

export async function removeIfUnreferenced(
  path: string,
  publicUrl: string,
): Promise<void> {
  const referenced = await isImageReferenced(path, publicUrl);
  if (!referenced) await removeFromStorage(path, "cleanup");
}

async function removeFromStorage(path: string, reason: string): Promise<void> {
  try {
    const { error } = await getAdminClient()
      .storage.from(MEDIA_BUCKET)
      .remove([path]);
    if (error) {
      console.warn(`[activities] Storage ${reason} failed for ${path}: ${error.message}`);
    }
  } catch {
    console.warn(`[activities] Storage ${reason} failed for ${path}`);
  }
}
