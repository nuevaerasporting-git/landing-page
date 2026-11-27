import {
  ACTIVITIES,
  ACTIVITIES_CONTENT,
  HERO_CONTENT,
  MEMBERSHIP_BLOCKS,
  MEMBERSHIP_CONTENT,
  NEWS_CONTENT,
  NEWS_PLACEHOLDERS,
  SPONSORS_CONTENT,
  SPONSOR_PLACEHOLDERS,
} from "@/features/content/data/landing";
import { SITE_CONTENT } from "@/features/content/data/site";
import type { SectionKey } from "@/features/content/types/site-configuration";
import { SECTION_KEYS } from "@/features/content/utils/section-keys";

export { isSectionKey } from "@/features/content/utils/section-keys";

export interface AdminSection {
  key: SectionKey;
  label: string;
  route: string;
  summary: string;
  description: string;
}

const ADMIN_SECTION_METADATA: Record<SectionKey, Omit<AdminSection, "key">> = {
  hero: {
    label: "Hero",
    route: "/admin/contenido/hero",
    summary: HERO_CONTENT.titleLead,
    description: "Título, bajada y botones de la portada.",
  },
  activities: {
    label: "Actividades",
    route: "/admin/contenido/activities",
    summary: ACTIVITIES_CONTENT.title,
    description: "Disciplinas y texto de la sección.",
  },
  membership: {
    label: "Asociarse",
    route: "/admin/contenido/membership",
    summary: MEMBERSHIP_CONTENT.title,
    description: "Texto y botón de contacto para asociarse.",
  },
  news: {
    label: "Novedades",
    route: "/admin/contenido/news",
    summary: NEWS_CONTENT.title,
    description: "Espacios reservados para publicaciones.",
  },
  sponsors: {
    label: "Patrocinadores",
    route: "/admin/patrocinadores",
    summary: SPONSORS_CONTENT.title,
    description: "Alta, edición y orden de las marcas que acompañan al club.",
  },
  site: {
    label: "Configuración del sitio",
    route: "/admin/contenido/site",
    summary: SITE_CONTENT.metadata.title,
    description: "Navegación, pie de página y metadatos.",
  },
};

export const ADMIN_SECTIONS: AdminSection[] = SECTION_KEYS.map((key) => ({
  key,
  ...ADMIN_SECTION_METADATA[key],
}));

export interface SectionField {
  label: string;
  value: string;
}

function toFields(entries: Array<[string, string | undefined]>): SectionField[] {
  return entries.flatMap(([label, value]) =>
    value === undefined ? [] : [{ label, value }],
  );
}

export function getSectionFields(key: SectionKey): SectionField[] {
  switch (key) {
    case "hero":
      return toFields([
        ["Bajada", HERO_CONTENT.eyebrow],
        ["Título principal", HERO_CONTENT.titleLead],
        ["Énfasis del título", HERO_CONTENT.titleEmphasis],
        ["Subtítulo", HERO_CONTENT.subtitle],
        ["Botón principal · texto", HERO_CONTENT.primaryCta.label],
        ["Botón principal · destino", HERO_CONTENT.primaryCta.href],
        ["Botón secundario · texto", HERO_CONTENT.secondaryCta.label],
        ["Botón secundario · destino", HERO_CONTENT.secondaryCta.href],
        ["Nota", HERO_CONTENT.note],
        ["Imagen · texto", HERO_CONTENT.media.label],
        ["Imagen · detalle", HERO_CONTENT.media.detail],
      ]);
    case "activities":
      return toFields([
        ["Título", ACTIVITIES_CONTENT.title],
        ["Descripción", ACTIVITIES_CONTENT.description],
        ["Etiqueta pendiente", ACTIVITIES_CONTENT.pendingBadge],
        ["Disciplinas", ACTIVITIES.map((item) => item.name).join(", ")],
        ["Botón · texto", ACTIVITIES_CONTENT.cardCta.label],
        ["Botón · destino", ACTIVITIES_CONTENT.cardCta.href],
        ["Imagen · texto", ACTIVITIES_CONTENT.mediaLabel],
        ["Nota", ACTIVITIES_CONTENT.note],
      ]);
    case "membership":
      return toFields([
        ["Título", MEMBERSHIP_CONTENT.title],
        ["Descripción", MEMBERSHIP_CONTENT.description],
        ["Nota", MEMBERSHIP_CONTENT.note],
        ["Botón · texto", MEMBERSHIP_CONTENT.cta.label],
        ["Botón · destino", MEMBERSHIP_CONTENT.cta.href],
        [
          "Bloques",
          MEMBERSHIP_BLOCKS.map((block) => block.title).join(", "),
        ],
      ]);
    case "news":
      return toFields([
        ["Título", NEWS_CONTENT.title],
        ["Descripción", NEWS_CONTENT.description],
        ["Imagen · texto", NEWS_CONTENT.mediaLabel],
        ["Tarjeta · título", NEWS_CONTENT.cardTitle],
        ["Tarjeta · descripción", NEWS_CONTENT.cardDescription],
        ["Nota", NEWS_CONTENT.note],
        ["Espacios", String(NEWS_PLACEHOLDERS.length)],
      ]);
    case "sponsors":
      return toFields([
        ["Título", SPONSORS_CONTENT.title],
        ["Descripción", SPONSORS_CONTENT.description],
        ["Ayuda del carrusel", SPONSORS_CONTENT.carouselHelp],
        ["Etiqueta de la región", SPONSORS_CONTENT.regionLabel],
        ["Etiqueta del espacio", SPONSORS_CONTENT.slotLabel],
        ["Nota", SPONSORS_CONTENT.note],
        ["Espacios", String(SPONSOR_PLACEHOLDERS.length)],
      ]);
    case "site":
      return toFields([
        ["Título del sitio", SITE_CONTENT.metadata.title],
        ["Descripción del sitio", SITE_CONTENT.metadata.description],
        [
          "Navegación",
          SITE_CONTENT.navigation.map((item) => item.label).join(", "),
        ],
        ["Ubicación", SITE_CONTENT.footer.locationPrimary],
        ["Contacto", SITE_CONTENT.footer.contactDescription],
        ["Pie de página", SITE_CONTENT.footer.copyright],
      ]);
  }
}
