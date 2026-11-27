import { isImageReferenced } from "@/features/content/repositories/image-references";
import { isNewsImagePath } from "@/features/content/utils/validate-news";
import { getAdminClient } from "@/shared/supabase/admin";

const MEDIA_BUCKET = "media";

export async function rollbackUpload(
  path: string,
  publicUrl: string,
): Promise<void> {
  await removeIfUnreferenced(path, publicUrl);
}

export async function removeIfUnreferenced(
  path: string,
  publicUrl: string,
): Promise<void> {
  if (!isNewsImagePath(path)) {
    console.warn("[news] Refusing to remove an invalid image path");
    return;
  }

  const referenced = await isImageReferenced(path, publicUrl);
  if (referenced) return;

  try {
    const { error } = await getAdminClient()
      .storage.from(MEDIA_BUCKET)
      .remove([path]);

    if (error) {
      console.warn(`[news] Could not remove image ${path}: ${error.message}`);
    }
  } catch {
    console.warn(`[news] Could not remove image ${path}`);
  }
}
