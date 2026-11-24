import type {
  ActivitiesContent,
  Activity,
  HeroContent,
  MembershipBlock,
  MembershipContent,
  NewsContent,
  SponsorsContent,
} from "@/features/content/types/landing";

export const HERO_CONTENT: HeroContent = {
  eyebrow: "María Teresa · Santa Fe",
  titleLead: "Mucho más que un club.",
  titleEmphasis: "Un lugar para encontrarnos.",
  subtitle:
    "Deporte, comunidad y momentos compartidos en Nueva Era Sporting Club.",
  primaryCta: { href: "#asociate", label: "Quiero asociarme" },
  secondaryCta: { href: "#actividades", label: "Conocé las actividades" },
  note: "Desde 1961, parte de la comunidad de María Teresa.",
  media: {
    label: "Imagen del club pendiente",
    detail: "Foto de deporte y comunidad",
  },
};

export const ACTIVITIES_CONTENT: ActivitiesContent = {
  title: "Encontrá tu lugar en Nueva Era",
  description: "Un club con espacio para jugar, aprender y compartir.",
  pendingBadge: "Disciplinas a confirmar",
  cardCta: { href: "#asociate", label: "Consultar actividad" },
  mediaLabel: "Imagen del club pendiente",
  note: "La oferta actual de disciplinas, categorías y horarios está pendiente de confirmación con el club.",
};

export const ACTIVITIES: Activity[] = [
  {
    id: "legacy-0",
    name: "Fútbol",
    consultationAriaLabel: "Consultar sobre Fútbol",
    schedule: "",
    image: null,
    cta: ACTIVITIES_CONTENT.cardCta,
  },
  {
    id: "legacy-1",
    name: "Hockey",
    consultationAriaLabel: "Consultar sobre Hockey",
    schedule: "",
    image: null,
    cta: ACTIVITIES_CONTENT.cardCta,
  },
  {
    id: "legacy-2",
    name: "Fútbol infantil",
    consultationAriaLabel: "Consultar sobre Fútbol infantil",
    schedule: "",
    image: null,
    cta: ACTIVITIES_CONTENT.cardCta,
  },
  {
    id: "legacy-3",
    name: "Tenis",
    consultationAriaLabel: "Consultar sobre Tenis",
    schedule: "",
    image: null,
    cta: ACTIVITIES_CONTENT.cardCta,
  },
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

export const MEMBERSHIP_CONTENT: MembershipContent = {
  title: "Sé parte de Nueva Era",
  description:
    "Sumate a nuestro club y compartí la pasión por el deporte, la familia y la comunidad",
  note: "Consultanos por requisitos, categorías y cuotas vigentes",
  cta: { href: "#contacto", label: "Consultar por WhatsApp" },
};

export const NEWS_PLACEHOLDERS = [1, 2, 3] as const;

export const NEWS_CONTENT: NewsContent = {
  title: "Lo que pasa en el club",
  description: "Novedades, encuentros y actividades del día a día.",
  mediaLabel: "Imagen del club pendiente",
  cardTitle: "Espacio reservado para una novedad",
  cardDescription:
    "Cuando el club confirme una publicación, se va a mostrar en este lugar.",
  note: "No publicamos novedades hasta contar con información confirmada por el club.",
};

export const SPONSOR_PLACEHOLDERS = [1, 2, 3, 4] as const;

export const SPONSORS_CONTENT: SponsorsContent = {
  title: "Quienes nos acompañan",
  description:
    "Este espacio está reservado para las marcas que acompañan al club.",
  carouselHelp:
    "Carrusel automático de patrocinadores. Se pausa al pasar el cursor, al enfocar o al interactuar.",
  regionLabel: "Patrocinadores pendientes",
  slotLabel: "Logo pendiente",
  note: "Los logotipos se publican únicamente con autorización de cada marca.",
};
