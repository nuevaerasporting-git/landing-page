import type { Discipline, Facility } from "@/features/landing/types";

export const DISCIPLINES: readonly Discipline[] = [
  {
    name: "Fútbol",
    description: "Competencia y formación en todas las categorías del club.",
    details: ["Primera", "Reserva", "Infantil: 4ta, 5ta y 6ta división"],
    icon: "soccer",
  },
  {
    name: "Hockey sobre césped",
    description:
      "Veinte años de historia, desde la escuelita hasta la primera división.",
    details: ["Escuelita", "Categorías formativas", "Primera"],
    icon: "hockey",
  },
  {
    name: "Tenis",
    description: "Práctica en dos canchas de polvo de ladrillo.",
    details: ["2 canchas de polvo de ladrillo"],
    icon: "tennis",
  },
  {
    name: "Pádel",
    description: "Una disciplina más para jugar y compartir en NESC.",
    details: [],
    icon: "padel",
  },
  {
    name: "Folklore",
    description: "Danza y tradición para compartir en comunidad.",
    details: [],
    icon: "folklore",
  },
  {
    name: "Natatorio",
    description: "Pileta de verano para disfrutar la temporada en el club.",
    details: ["Pileta de verano"],
    icon: "pool",
  },
];

export const FACILITIES: readonly Facility[] = [
  {
    name: "Sede Social y Salón de Fiestas",
    address: "Dorrego y Urquiza",
    description: "Espacio de encuentro social y celebraciones del club.",
  },
  {
    name: "Polideportivo y Estadio Cecilio Gilmour Eden",
    address: "Sáenz Peña y Sarmiento",
    description:
      "Predio deportivo con estadio de fútbol y sector sur para fútbol infantil.",
  },
];
