import type { Sections } from "@/features/content/types/site-configuration";
import { getPublicClient } from "@/shared/supabase/public";

export const DEFAULT_DOMAIN = "localhost:3000";

export function getSiteDomain(): string {
  return process.env.SITE_DOMAIN ?? DEFAULT_DOMAIN;
}

const FOOTER_KEYS = [
  "locationPrimary",
  "locationSecondary",
  "navLabel",
  "sectionsLabel",
  "contactLabel",
  "contactDescription",
  "locationLabel",
  "locationDescription",
  "copyright",
];

export async function getSiteSections(
  domain: string = getSiteDomain(),
): Promise<Sections | null> {
  try {
    const { data, error } = await getPublicClient()
      .from("site_configurations")
      .select("sections")
      .eq("domain", domain)
      .maybeSingle();

    if (error) {
      console.warn(`[site-configuration] Could not read site sections: ${error.message}`);
      return null;
    }

    const sections: unknown = data?.sections;
    if (!hasExpectedShape(sections)) {
      console.warn("[site-configuration] Unexpected sections payload");
      return null;
    }

    return sections;
  } catch {
    console.warn("[site-configuration] Public client unavailable");
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasStrings(value: unknown, keys: string[]): boolean {
  return isRecord(value) && keys.every((key) => typeof value[key] === "string");
}

function hasNumbers(value: unknown, keys: string[]): boolean {
  return isRecord(value) && keys.every((key) => typeof value[key] === "number");
}

function hasStringObjects(value: unknown, keys: string[]): boolean {
  return Array.isArray(value) && value.every((item) => hasStrings(item, keys));
}

function isNumberArray(value: unknown): value is number[] {
  return Array.isArray(value) && value.every((item) => typeof item === "number");
}

export function hasExpectedShape(value: unknown): value is Sections {
  if (!isRecord(value)) return false;

  const { hero, activities, membership, news, sponsors, site } = value;

  if (!isRecord(hero)) return false;
  if (
    !hasStrings(hero, [
      "eyebrow",
      "titleLead",
      "titleEmphasis",
      "subtitle",
      "note",
    ]) ||
    !hasStrings(hero.primaryCta, ["href", "label"]) ||
    !hasStrings(hero.secondaryCta, ["href", "label"]) ||
    !isRecord(hero.media) ||
    typeof hero.media.label !== "string" ||
    (hero.media.detail !== undefined && typeof hero.media.detail !== "string")
  ) {
    return false;
  }

  if (!isRecord(activities)) return false;
  if (
    !hasStrings(activities, [
      "title",
      "description",
      "pendingBadge",
      "mediaLabel",
      "note",
    ]) ||
    !hasStrings(activities.cardCta, ["href", "label"]) ||
    !hasStringObjects(activities.items, ["name", "consultationAriaLabel"])
  ) {
    return false;
  }

  if (!isRecord(membership)) return false;
  if (
    !hasStrings(membership, ["title", "description", "note"]) ||
    !hasStrings(membership.cta, ["href", "label"]) ||
    !hasStringObjects(membership.blocks, ["title", "description"])
  ) {
    return false;
  }

  if (!isRecord(news)) return false;
  if (
    !hasStrings(news, [
      "title",
      "description",
      "mediaLabel",
      "cardTitle",
      "cardDescription",
      "note",
    ]) ||
    !isNumberArray(news.placeholders)
  ) {
    return false;
  }

  if (!isRecord(sponsors)) return false;
  if (
    !hasStrings(sponsors, [
      "title",
      "description",
      "carouselHelp",
      "regionLabel",
      "slotLabel",
      "note",
    ]) ||
    !isNumberArray(sponsors.placeholders)
  ) {
    return false;
  }

  if (!isRecord(site)) return false;
  if (
    !hasStrings(site.metadata, ["title", "description"]) ||
    !hasStringObjects(site.navigation, ["label", "href"]) ||
    !isRecord(site.wordmark) ||
    !isRecord(site.wordmark.image) ||
    !hasStrings(site.wordmark.image, ["src", "alt"]) ||
    !hasNumbers(site.wordmark.image, ["width", "height"]) ||
    !hasStrings(site.wordmark, ["primaryLine", "secondaryLine"])
  ) {
    return false;
  }

  if (!isRecord(site.header)) return false;
  if (
    !hasStrings(site.header, [
      "homeHref",
      "homeAriaLabel",
      "primaryNavLabel",
    ]) ||
    !hasStrings(site.header.cta, ["href", "label"])
  ) {
    return false;
  }

  if (!isRecord(site.mobileNav)) return false;
  if (
    !hasStrings(site.mobileNav, [
      "openMenuLabel",
      "closeMenuLabel",
      "navLabel",
    ]) ||
    !hasStrings(site.mobileNav.cta, ["href", "label"])
  ) {
    return false;
  }

  return (
    hasStrings(site.footer, FOOTER_KEYS) &&
    hasStrings(site.accessibility, ["skipLinkLabel"])
  );
}
