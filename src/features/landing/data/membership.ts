import type { MembershipCategory } from "@/features/landing/types";

export const MEMBERSHIP_BENEFITS: readonly string[] = [
  "Acceso al polideportivo",
  "Disciplinas formativas",
  "Temporada de pileta",
  "Vida social y actividades del club",
];

export const MEMBERSHIP_CATEGORIES: readonly MembershipCategory[] = [
  {
    name: "Socio Activo",
    description:
      "Para quienes participan de la vida del club y de sus instalaciones.",
    priceLabel: "[Consultar arancel vigente en Secretaría]",
  },
  {
    name: "Grupo Familiar",
    description: "Una categoría pensada para compartir el club en familia.",
    priceLabel: "[Consultar arancel vigente en Secretaría]",
  },
  {
    name: "Deportivo Infantil",
    description:
      "Para las y los chicos que se inician en las disciplinas formativas.",
    priceLabel: "[Consultar arancel vigente en Secretaría]",
  },
];
