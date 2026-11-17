"use client";

import { useState } from "react";
import { HistoryDisciplinesModal } from "./HistoryDisciplinesModal";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-nesc-border text-nesc-black hover:bg-nesc-white md:hidden"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {open && (
        <div
          id="mobile-navigation"
          className="absolute left-0 right-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-nesc-border bg-nesc-gray px-4 py-4 shadow-lg md:hidden"
        >
          <div className="space-y-2">
            <a
              href="#sponsors"
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2.5 text-sm font-bold text-nesc-black hover:bg-nesc-white"
            >
              Sponsors
            </a>
            <a
              href="#asociate"
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2.5 text-sm font-bold text-nesc-black hover:bg-nesc-white"
            >
              Asociate
            </a>
            <a
              href="#novedades"
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2.5 text-sm font-bold text-nesc-black hover:bg-nesc-white"
            >
              Novedades
            </a>
            <HistoryDisciplinesModal
              defaultTab="historia"
              triggerLabel="Nuestra Historia"
              triggerClassName="w-full rounded-md px-3 py-2.5 text-left text-sm font-bold text-nesc-red hover:bg-nesc-white"
            />
          </div>
        </div>
      )}
    </>
  );
}