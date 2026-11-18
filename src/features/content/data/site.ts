import type { SiteContent } from "@/features/content/types/landing";

export const SITE_CONTENT: SiteContent = {
  metadata: {
    title: "Nueva Era Sporting Club | María Teresa, Santa Fe",
    description:
      "Deporte, comunidad y momentos compartidos en Nueva Era Sporting Club. Conocé las actividades y cómo asociarte.",
  },
  navigation: [
    { label: "Actividades", href: "#actividades" },
    { label: "Asociate", href: "#asociate" },
    { label: "Novedades", href: "#novedades" },
    { label: "Patrocinadores", href: "#patrocinadores" },
  ],
  wordmark: {
    image: {
      src: "/nesc-escudo-manual.png",
      alt: "",
      width: 430,
      height: 463,
    },
    primaryLine: "Nueva Era",
    secondaryLine: "Sporting Club",
  },
  header: {
    homeHref: "#inicio",
    homeAriaLabel: "Nueva Era Sporting Club — ir al inicio",
    primaryNavLabel: "Navegación principal",
    cta: { href: "#asociate", label: "Quiero asociarme" },
  },
  mobileNav: {
    openMenuLabel: "Abrir menú",
    closeMenuLabel: "Cerrar menú",
    navLabel: "Navegación móvil",
    cta: { href: "#asociate", label: "Quiero asociarme" },
  },
  footer: {
    locationPrimary: "María Teresa, Santa Fe",
    locationSecondary: "Argentina",
    navLabel: "Enlaces del pie de página",
    sectionsLabel: "Secciones",
    contactLabel: "Contacto",
    contactDescription:
      "Próximamente publicaremos los canales oficiales de contacto y redes sociales.",
    locationLabel: "Ubicación",
    locationDescription:
      "Polideportivo: Sáenz Peña y Sarmiento, María Teresa, Santa Fe.",
    copyright: "Nueva Era Sporting Club. Todos los derechos reservados.",
  },
  accessibility: {
    skipLinkLabel: "Saltar al contenido",
  },
};

export const NAV_ITEMS = SITE_CONTENT.navigation;
