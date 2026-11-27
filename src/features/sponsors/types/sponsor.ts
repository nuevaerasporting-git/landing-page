export interface SponsorRow {
  id: string;
  name: string;
  logo_path: string;
  logo_alt: string;
  website_url: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface Sponsor {
  id: string;
  name: string;
  logoPath: string;
  logoUrl: string;
  logoAlt: string;
  websiteUrl: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface SponsorInput {
  name: string;
  logoPath: string;
  logoAlt: string;
  websiteUrl: string | null;
  sortOrder: number;
  isActive: boolean;
}

export type SponsorValidationResult =
  | { ok: true; value: SponsorInput }
  | { ok: false; error: string };

export type SponsorWriteResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

export type SponsorActionResult =
  | { ok: true; sponsorId: string }
  | { ok: false; error: string };
