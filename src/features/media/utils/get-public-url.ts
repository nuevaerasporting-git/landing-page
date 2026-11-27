import { getPublicClient } from "@/shared/supabase/public";

const MEDIA_BUCKET = "media";

export function getMediaPublicUrl(path: string): string {
  return getPublicClient().storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
}
