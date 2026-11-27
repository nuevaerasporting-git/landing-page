"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import type { NewsItem } from "@/features/content/types/news";

interface NewsListProps {
  items: NewsItem[];
  isPending: boolean;
  editingId: string | null;
  onEdit: (item: NewsItem) => void;
  onDelete: (formData: FormData) => void;
}

const BUTTON_CLASS =
  "inline-flex min-h-11 items-center justify-center rounded-md border px-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

export function NewsList({
  items,
  isPending,
  editingId,
  onEdit,
  onDelete,
}: NewsListProps) {
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  return (
    <section aria-labelledby="news-list-title" className="space-y-4">
      <div>
        <h3 id="news-list-title" className="text-lg font-extrabold tracking-tight">
          Noticias cargadas
        </h3>
        <p className="mt-1 text-sm text-muted">
          Gestioná las publicaciones existentes.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-lg border border-line bg-white p-5">
          <p className="text-sm text-muted">Todavía no hay noticias cargadas.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="rounded-lg border border-line bg-white p-4 sm:p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-md border border-line bg-surface sm:w-40">
                  <Image
                    src={item.imagePublicUrl}
                    alt={`Imagen de ${item.title}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 160px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                        {item.publishedAt}
                      </p>
                      <h4 className="mt-1 text-base font-bold">{item.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {item.description}
                      </p>
                      <a
                        href={item.instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-brand hover:underline"
                      >
                        Ver en Instagram
                      </a>
                    </div>

                    <div className="flex shrink-0 flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        disabled={isPending || editingId === item.id}
                        className={`${BUTTON_CLASS} border-line text-ink hover:border-brand hover:text-brand`}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmingId(item.id)}
                        disabled={isPending}
                        aria-label={`Eliminar noticia: ${item.title}`}
                        className={`${BUTTON_CLASS} border-brand text-brand hover:bg-brand hover:text-white`}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>

                  {confirmingId === item.id ? (
                    <div
                      role="group"
                      aria-labelledby={`news-delete-title-${item.id}`}
                      aria-describedby={`news-delete-desc-${item.id}`}
                      className="mt-4 rounded-md border border-brand bg-surface p-4"
                    >
                      <p
                        id={`news-delete-title-${item.id}`}
                        className="text-sm font-bold"
                      >
                        ¿Eliminar esta noticia?
                      </p>
                      <p
                        id={`news-delete-desc-${item.id}`}
                        className="mt-1 text-sm text-muted"
                      >
                        La imagen se conserva si otra sección la está usando.
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          autoFocus
                          onClick={() => setConfirmingId(null)}
                          disabled={isPending}
                          className={`${BUTTON_CLASS} border-line bg-white text-ink hover:border-brand hover:text-brand`}
                        >
                          Cancelar
                        </button>
                        <form
                          onSubmit={(event: FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            onDelete(new FormData(event.currentTarget));
                          }}
                        >
                          <input type="hidden" name="id" value={item.id} />
                          <button
                            type="submit"
                            disabled={isPending}
                            aria-busy={isPending}
                            className="inline-flex min-h-11 items-center justify-center rounded-md bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {isPending ? "Eliminando…" : "Confirmar eliminación"}
                          </button>
                        </form>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
