import { getMediaPublicUrl } from "@/features/media/utils/get-public-url";
import type { Sponsor, SponsorRow } from "@/features/sponsors/types/sponsor";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isSponsorRow(value: unknown): value is SponsorRow {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.logo_path === "string" &&
    typeof value.logo_alt === "string" &&
    (value.website_url === null || typeof value.website_url === "string") &&
    typeof value.sort_order === "number" &&
    typeof value.is_active === "boolean"
  );
}

export function mapSponsor(row: SponsorRow): Sponsor {
  return {
    id: row.id,
    name: row.name,
    logoPath: row.logo_path,
    logoUrl: getMediaPublicUrl(row.logo_path),
    logoAlt: row.logo_alt,
    websiteUrl: row.website_url,
    sortOrder: row.sort_order,
    isActive: row.is_active,
  };
}

export function mapSponsorRows(rows: unknown[]): Sponsor[] {
  return rows.flatMap((row) => {
    if (!isSponsorRow(row)) {
      console.warn("[sponsors] Unexpected row shape");
      return [];
    }
    return [mapSponsor(row)];
  });
}
