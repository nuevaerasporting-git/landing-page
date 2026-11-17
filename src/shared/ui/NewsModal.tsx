"use client";

import { createPortal } from "react-dom";

type NewsModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  body: string;
  category: string;
  date?: string;
};

export function NewsModal({ open, onClose, title, body, category, date }: NewsModalProps) {
  if (!open) return null;

  const modal = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-nesc-black/75 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl border border-nesc-border bg-nesc-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex h-52 items-center justify-center bg-nesc-gray">
          <span className="text-sm font-medium text-nesc-muted">Imagen de noticia (pendiente)</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-nesc-black/80 font-bold text-white transition-colors hover:bg-nesc-red"
          >
            ✕
          </button>
        </div>
        <div className="p-6">
          <div className="mb-2 flex items-center gap-2.5">
            <span className="rounded bg-nesc-red px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-white">
              {category}
            </span>
            <span className="text-xs font-semibold text-nesc-muted">{date}</span>
          </div>
          <h3 className="mb-3 text-xl font-black leading-snug text-nesc-black">{title}</h3>
          <p className="mb-6 text-sm leading-relaxed text-nesc-muted">{body}</p>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-10 cursor-pointer rounded bg-nesc-black px-5 text-xs font-bold uppercase tracking-wide text-white hover:bg-neutral-800"
            >
              Cerrar Nota
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(modal, document.body);
}