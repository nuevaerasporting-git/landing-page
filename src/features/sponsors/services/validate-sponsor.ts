import type { SponsorInput, SponsorValidationResult } from "@/features/sponsors/types/sponsor";

export const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const LOGO_PATH_PATTERN =
  /^sponsors\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|png|webp|avif)$/i;

function readText(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function parseWebsiteUrl(value: string):
  | { ok: true; value: string | null }
  | { ok: false; error: string } {
  if (!value) return { ok: true, value: null };
  if (value.length > 500) {
    return { ok: false, error: "La dirección web es demasiado larga." };
  }

  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return {
        ok: false,
        error: "La dirección web debe empezar con https:// o http://.",
      };
    }
    return { ok: true, value: url.toString() };
  } catch {
    return {
      ok: false,
      error: "La dirección web debe empezar con https:// o http://.",
    };
  }
}

export function validateSponsorForm(formData: FormData): SponsorValidationResult {
  const name = readText(formData, "name");
  if (name.length < 1 || name.length > 80) {
    return { ok: false, error: "El nombre debe tener entre 1 y 80 caracteres." };
  }

  const logoPath = readText(formData, "logoPath");
  if (!LOGO_PATH_PATTERN.test(logoPath)) {
    return {
      ok: false,
      error: "Subí un logo válido antes de guardar el patrocinador.",
    };
  }

  const logoAlt = readText(formData, "logoAlt");
  if (logoAlt.length < 1 || logoAlt.length > 120) {
    return {
      ok: false,
      error: "El texto alternativo del logo debe tener entre 1 y 120 caracteres.",
    };
  }

  const website = parseWebsiteUrl(readText(formData, "websiteUrl"));
  if (!website.ok) return website;

  const sortOrder = Number(readText(formData, "sortOrder"));
  if (!Number.isInteger(sortOrder) || sortOrder < 0 || sortOrder > 9999) {
    return { ok: false, error: "El orden debe ser un número entre 0 y 9999." };
  }

  const input: SponsorInput = {
    name,
    logoPath,
    logoAlt,
    websiteUrl: website.value,
    sortOrder,
    isActive: formData.get("isActive") === "on",
  };

  return { ok: true, value: input };
}
