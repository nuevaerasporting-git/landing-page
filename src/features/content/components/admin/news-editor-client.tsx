"use client";

import { useState, useTransition } from "react";
import {
  createNewsAction,
  deleteNewsAction,
  updateNewsAction,
} from "@/features/content/actions/news";
import { NewsForm } from "@/features/content/components/admin/news-form";
import { NewsList } from "@/features/content/components/admin/news-list";
import type {
  NewsItem,
  NewsMutationResult,
} from "@/features/content/types/news";

type Notice = { tone: "success" | "error"; text: string };
type FormMode = { kind: "create" } | { kind: "edit"; id: string } | null;

const DEFAULT_ERROR = "No se pudo completar la operación. Intentá de nuevo.";
const SUCCESS_TEXT = {
  create: "Noticia creada.",
  update: "Noticia actualizada.",
  delete: "Noticia eliminada.",
} as const;

interface NewsEditorClientProps {
  initialItems: NewsItem[];
}

export function NewsEditorClient({ initialItems }: NewsEditorClientProps) {
  const [items, setItems] = useState(initialItems);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [formMode, setFormMode] = useState<FormMode>(null);
  const [isPending, startTransition] = useTransition();

  const editingItem =
    formMode?.kind === "edit"
      ? items.find((item) => item.id === formMode.id) ?? null
      : null;

  function applyResult(
    result: NewsMutationResult,
    successText: string,
    onSuccess?: () => void,
  ) {
    if (result.ok) {
      setItems(result.items);
      setNotice({ tone: "success", text: successText });
      onSuccess?.();
      return;
    }

    setNotice({ tone: "error", text: result.error });
  }

  function handleSave(formData: FormData) {
    const mode = formMode?.kind === "edit" ? "update" : "create";

    startTransition(async () => {
      try {
        const result =
          mode === "update"
            ? await updateNewsAction(formData)
            : await createNewsAction(formData);
        applyResult(result, SUCCESS_TEXT[mode], () => setFormMode(null));
      } catch {
        setNotice({ tone: "error", text: DEFAULT_ERROR });
      }
    });
  }

  function handleDelete(formData: FormData) {
    startTransition(async () => {
      try {
        const result = await deleteNewsAction(formData);
        applyResult(result, SUCCESS_TEXT.delete);
      } catch {
        setNotice({ tone: "error", text: DEFAULT_ERROR });
      }
    });
  }

  return (
    <div className="space-y-6">
      {notice ? (
        <div
          role={notice.tone === "error" ? "alert" : "status"}
          className={`rounded-lg border px-4 py-3 text-sm font-semibold ${
            notice.tone === "error"
              ? "border-brand bg-white text-brand"
              : "border-line bg-white text-ink"
          }`}
        >
          {notice.text}
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight">Noticias</h2>
          <p className="mt-1 text-sm text-muted">
            {items.length === 1
              ? "1 noticia cargada"
              : `${items.length} noticias cargadas`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setFormMode({ kind: "create" })}
          disabled={isPending || formMode !== null}
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Nueva noticia
        </button>
      </div>

      {formMode ? (
        <NewsForm
          key={formMode.kind === "edit" ? formMode.id : "create"}
          item={editingItem}
          isPending={isPending}
          onCancel={() => setFormMode(null)}
          onSubmit={handleSave}
        />
      ) : null}

      <NewsList
        items={items}
        isPending={isPending}
        editingId={formMode?.kind === "edit" ? formMode.id : null}
        onEdit={(item) => setFormMode({ kind: "edit", id: item.id })}
        onDelete={handleDelete}
      />
    </div>
  );
}
