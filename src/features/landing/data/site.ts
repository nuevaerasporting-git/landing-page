import type { NavItem, SiteInfo, SocialLink } from "@/features/landing/types";

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Disciplinas", href: "#disciplinas" },
  { label: "Historia", href: "#historia" },
  { label: "Asociate", href: "#asociate" },
  { label: "Novedades", href: "#novedades" },
];

export const SITE_INFO: SiteInfo = {
  name: "Nueva Era Sporting Club",
  foundationDate: "19 de enero de 1961",
  whatsappUrl: "#asociate",
  instagramUrl: "https://www.instagram.com/nuevaerasportingclub/",
  facebookUrl: "#",
  polideportivo: {
    name: "Polideportivo y Estadio Cecilio Gilmour Eden",
    address: "Sáenz Peña y Sarmiento",
    detail: "María Teresa (2609), Santa Fe, Argentina",
  },
  sedeSocial: {
    name: "Sede Social y Salón de Fiestas",
    address: "Dorrego y Urquiza",
    detail: "María Teresa, Santa Fe",
  },
};

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    label: "Instagram @nuevaerasportingclub",
    href: SITE_INFO.instagramUrl,
    icon: "instagram",
  },
  {
    label: "Facebook Nueva Era Sporting Club",
    href: SITE_INFO.facebookUrl,
    icon: "facebook",
  },
];
