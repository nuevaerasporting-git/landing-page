import { cache } from "react";
import {
  mapSections,
  type MappedSiteContent,
} from "@/features/content/mappers/site-sections";
import { getSiteSections } from "@/features/content/repositories/site-configuration";

export const getMappedSiteContent = cache(
  async (): Promise<MappedSiteContent | null> => {
    const sections = await getSiteSections();
    if (!sections) return null;

    try {
      return mapSections(sections);
    } catch {
      console.warn("[site-content] Could not map site sections");
      return null;
    }
  },
);
