import type { SectionKey } from "@/features/content/types/site-configuration";

const SECTION_KEY_FLAGS: Record<SectionKey, true> = {
  hero: true,
  activities: true,
  membership: true,
  news: true,
  sponsors: true,
  site: true,
};

export const SECTION_KEYS = Object.keys(SECTION_KEY_FLAGS) as SectionKey[];

export function isSectionKey(value: string): value is SectionKey {
  return (SECTION_KEYS as readonly string[]).includes(value);
}
