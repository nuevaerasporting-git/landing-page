import type {
  Activity,
  MembershipBlock,
  NavItem,
} from "@/features/content/types/landing";

export const NAV_ITEMS: NavItem[] = [
  { label: "Actividades", href: "#actividades" },
  { label: "Asociate", href: "#asociate" },
  { label: "Novedades", href: "#novedades" },
  { label: "Patrocinadores", href: "#patrocinadores" },
];

export const ACTIVITIES: Activity[] = [
  { name: "Fútbol" },
  { name: "Hockey" },
  { name: "Fútbol infantil" },
  { name: "Tenis" },
];

export const MEMBERSHIP_BLOCKS: MembershipBlock[] = [
  {
    title: "Cómo asociarte",
    description: "Requisitos y pasos para iniciar la asociación.",
  },
  {
    title: "Cuotas y categorías",
    description: "Alternativas de asociación y valores vigentes.",
  },
  {
    title: "Consultas",
    description: "Canal oficial para resolver dudas antes de asociarte.",
  },
];

export const NEWS_PLACEHOLDERS = [1, 2, 3] as const;

export const SPONSOR_PLACEHOLDERS = [1, 2, 3, 4] as const;
