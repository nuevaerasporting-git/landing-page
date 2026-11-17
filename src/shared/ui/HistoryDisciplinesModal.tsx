"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

type Tab = "historia" | "disciplinas";

type HistoryDisciplinesModalProps = {
  defaultTab?: Tab;
  triggerLabel: string;
  triggerClassName?: string;
};

const historia = [
  {
    year: "1964 • Sede Social",
    text: "Inauguración de la sede social y salón de fiestas en Dorrego y Urquiza.",
  },
  {
    year: "1966 - 1970 • Polideportivo",
    text: "Adquisición del predio de calle Sáenz Peña a Cecilio Eden e inauguración oficial con almuerzo comunitario.",
  },
  {
    year: "1971 • El Natatorio",
    text: "Comienzo e inauguración de la pileta, sumando un espacio clave para las familias.",
  },
  {
    year: "1990 • Predio Fútbol Infantil",
    text: "Inauguración de las canchas de fútbol infantil en el sector sur del polideportivo.",
  },
  {
    year: "2005 • Estadio Cecilio Gilmour Eden",
    text: "Bautismo oficial del estadio principal de fútbol en homenaje a Cecilio Gilmour Eden.",
  },
];

const disciplinas = [
  {
    title: "Fútbol Mayor e Infantil",
    text: "Primera, Reserva, Divisiones Inferiores y Escuelita en el Estadio Cecilio Gilmour Eden y Predio Infantil.",
  },
  {
    title: "Hockey sobre Césped",
    text: "Actividad ininterrumpida desde 1989. Categorías desde escuelita hasta primera división.",
  },
  {
    title: "Tenis y Pádel",
    text: "Canchas de polvo de ladrillo y cancha de pádel en el Polideportivo con clases y turnos para socios.",
  },
  {
    title: "Natatorio y Cultura",
    text: "Temporada de pileta en verano y talleres comunitarios de Tango y Folklore en la Sede Social.",
  },
];

export function HistoryDisciplinesModal({
  defaultTab = "historia",
  triggerLabel,
  triggerClassName,
}: HistoryDisciplinesModalProps) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>(defaultTab);

  const isHistoria = tab === "historia";

  const modal = open ? (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-nesc-black/75 p-4"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-nesc-border bg-nesc-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b-2 border-nesc-red bg-nesc-black px-6 py-4 text-white">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-nesc-red">
              Identidad Institucional
            </span>
            <h3 className="text-lg font-black uppercase">Nueva Era Sporting Club</h3>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Cerrar"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 font-bold text-white transition-colors hover:bg-nesc-red"
          >
            ✕
          </button>
        </div>

        <div className="flex gap-4 border-b border-nesc-border bg-nesc-gray px-6 pt-3">
          <button
            type="button"
            onClick={() => setTab("historia")}
            className={`cursor-pointer pb-2.5 text-xs font-extrabold uppercase sm:text-sm ${
              isHistoria
                ? "border-b-2 border-nesc-red text-nesc-red"
                : "border-b-2 border-transparent text-nesc-muted hover:text-nesc-black"
            }`}
          >
            Nuestra Historia (1961)
          </button>
          <button
            type="button"
            onClick={() => setTab("disciplinas")}
            className={`cursor-pointer pb-2.5 text-xs font-extrabold uppercase sm:text-sm ${
              !isHistoria
                ? "border-b-2 border-nesc-red text-nesc-red"
                : "border-b-2 border-transparent text-nesc-muted hover:text-nesc-black"
            }`}
          >
            Disciplinas e Instalaciones
          </button>
        </div>

        <div className="space-y-5 overflow-y-auto p-6 text-sm text-nesc-black">
          {isHistoria ? (
            <div className="space-y-4">
              <p className="font-medium leading-relaxed text-nesc-muted">
                El <strong className="text-nesc-black">19 de enero de 1961</strong> nació
                oficialmente Nueva Era Sporting Club, fruto de la unión histórica entre el{" "}
                <strong className="text-nesc-black">Club Sportivo Juventud Unida</strong>{" "}
                (fundado en 1933) y el{" "}
                <strong className="text-nesc-black">Aspirante Football Club</strong> (surgido en
                1945/46). Bajo la primera presidencia del Dr. Guillermo Araujo, ambas
                instituciones sumaron sus bienes y socios para construir un club más fuerte en
                María Teresa.
              </p>
              <div className="space-y-3 border-l-2 border-nesc-red pl-4">
                {historia.map((item) => (
                  <div key={item.year}>
                    <span className="text-xs font-black text-nesc-red">{item.year}</span>
                    <p className="text-xs text-nesc-muted">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {disciplinas.map((d) => (
                <div
                  key={d.title}
                  className="rounded-lg border border-nesc-border bg-nesc-gray/50 p-4"
                >
                  <h4 className="text-xs font-extrabold uppercase text-nesc-red">{d.title}</h4>
                  <p className="mt-1 text-xs text-nesc-muted">{d.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={triggerClassName}
      >
        {triggerLabel}
      </button>

      {typeof document !== "undefined" && createPortal(modal, document.body)}
    </>
  );
}