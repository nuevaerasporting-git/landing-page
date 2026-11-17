"use client";

import { useState } from "react";

type Plan = {
  badge: string;
  title: string;
  subtitle: string;
  price: string;
  benefits: string[];
  whatsappText: string;
};

const PLANS: Record<string, Plan> = {
  activo: {
    badge: "Individual +18",
    title: "Socio Activo",
    subtitle: "Ideal para deportistas y simpatizantes individuales",
    price: "$8.500",
    benefits: [
      "Acceso libre al Polideportivo (Sáenz Peña y Sarmiento).",
      "Habilitación para practicar disciplinas federadas y recreativas.",
      "Descuentos en entradas de local y eventos sociales en Sede.",
    ],
    whatsappText: "Hola Secretaría NESC! Quiero asociarme como Socio Activo.",
  },
  familiar: {
    badge: "Más Elegido",
    title: "Grupo Familiar",
    subtitle: "Titular + cónyuge e hijos menores de 18 años",
    price: "$16.000",
    benefits: [
      "Carnet social para todo el grupo familiar directo.",
      "Tarifa preferencial en temporada de Natatorio y Colonia.",
      "Acceso a parrilleros, salón y todas las disciplinas del club.",
    ],
    whatsappText: "Hola Secretaría NESC! Quiero información para asociar a mi Grupo Familiar.",
  },
  infantil: {
    badge: "Menores de 18",
    title: "Infantil / Cadete",
    subtitle: "Formación deportiva y recreativa todo el año",
    price: "$5.500",
    benefits: [
      "Acceso al Predio de Fútbol Infantil y Escuelita de Hockey.",
      "Habilitación para clases de Tenis, Pádel y Folklore/Tango.",
      "Acompañamiento formativo y seguro deportivo institucional.",
    ],
    whatsappText: "Hola Secretaría NESC! Quiero asociar a un menor como Socio Infantil/Cadete.",
  },
};

const PLAN_ORDER = ["activo", "familiar", "infantil"] as const;

export function MembershipCardSelector() {
  const [selected, setSelected] = useState("familiar");
  const plan = PLANS[selected];

  return (
    <div className="rounded-2xl border-2 border-nesc-black bg-nesc-white p-5 shadow-xl sm:p-7">
      <div className="mb-5 flex items-center justify-between gap-2">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-nesc-muted">
          Elegí tu categoría:
        </span>
        <span className="text-[11px] font-extrabold uppercase text-nesc-red">Cuota Vigente 2026</span>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-2 rounded-xl bg-nesc-gray p-1.5" role="tablist">
        {PLAN_ORDER.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setSelected(key)}
            className={`cursor-pointer rounded-lg px-2 py-2.5 text-xs font-extrabold uppercase transition-all ${
              selected === key
                ? "bg-nesc-red text-white shadow"
                : "text-nesc-muted hover:text-nesc-black"
            }`}
          >
            {key === "activo" ? "Activo" : key === "familiar" ? "Familiar" : "Infantil"}
          </button>
        ))}
      </div>

      <div className="relative mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-nesc-red to-nesc-red-dark p-5 text-white shadow-md sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <span className="mb-1.5 inline-block rounded-full bg-white px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-nesc-red">
              {plan.badge}
            </span>
            <h3 className="text-xl font-black uppercase tracking-tight sm:text-2xl">{plan.title}</h3>
            <p className="text-xs font-medium text-white/95">{plan.subtitle}</p>
          </div>
          <div className="shrink-0 text-right">
            <span className="block text-3xl font-black tracking-tight sm:text-4xl">{plan.price}</span>
            <span className="text-[11px] font-bold uppercase text-white/90">por mes</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/20 pt-4 text-[11px] font-bold uppercase tracking-wider text-white">
          <span>Credencial Oficial NESC</span>
          <span>María Teresa • Santa Fe</span>
        </div>
      </div>

      <ul className="mb-6 space-y-2.5 text-xs font-semibold text-nesc-black sm:text-sm">
        {plan.benefits.map((b, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="font-black text-nesc-red">✓</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <a
        href={`https://wa.me/5493462000000?text=${encodeURIComponent(plan.whatsappText)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-nesc-black text-sm font-extrabold uppercase tracking-wide text-white shadow transition-colors hover:bg-neutral-800"
      >
        <span>Solicitar Alta</span>
        <span>→</span>
      </a>
    </div>
  );
}