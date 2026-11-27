import { isSponsorRow, mapSponsor, mapSponsorRows } from "@/features/sponsors/mappers/sponsor";
import {
  findSponsorRow,
  listAdminSponsorRows,
  listPublicSponsorRows,
} from "@/features/sponsors/repositories/sponsors";
import type { Sponsor } from "@/features/sponsors/types/sponsor";

export async function getAdminSponsors(): Promise<Sponsor[]> {
  return mapSponsorRows(await listAdminSponsorRows());
}

export async function getPublicSponsors(): Promise<Sponsor[]> {
  return mapSponsorRows(await listPublicSponsorRows());
}

export async function getAdminSponsor(id: string): Promise<Sponsor | null> {
  const row = await findSponsorRow(id);
  return isSponsorRow(row) ? mapSponsor(row) : null;
}
