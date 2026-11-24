"use client";

import { useTransition, useState } from "react";
import {
  createActivityCardAction,
  deleteActivityCardAction,
  saveActivitiesHeaderAction,
  updateActivityCardAction,
} from "@/features/content/actions/activities";
import type {
  ActivitiesSection,
  ActivityActionResult,
} from "@/features/content/types/activities";
import { ActivitiesHeaderForm } from "./activities-header-form";
import { ActivityCardForm } from "./activity-card-form";

interface ActivitiesEditorClientProps {
  section: ActivitiesSection;
}

interface Notice {
  kind: "success" | "error";
  text: string;
}

export function ActivitiesEditorClient({
  section,
}: ActivitiesEditorClientProps) {
  const [current, setCurrent] = useState(section);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isPending, startTransition] = useTransition();

  function applyResult(result: ActivityActionResult, successText: string) {
    if (result.ok) {
      setCurrent(result.section);
      setNotice({ kind: "success", text: successText });
    } else {
      setNotice({ kind: "error", text: result.error });
    }
  }

  function saveHeader(formData: FormData) {
    startTransition(async () => {
      applyResult(
        await saveActivitiesHeaderAction(formData),
        "Los textos se guardaron correctamente.",
      );
    });
  }

  function saveCard(formData: FormData, isNew: boolean) {
    startTransition(async () => {
      const result = isNew
        ? await createActivityCardAction(formData)
        : await updateActivityCardAction(formData);
      applyResult(result, isNew ? "La actividad se creó." : "La actividad se guardó.");
      if (result.ok && isNew) setIsCreating(false);
    });
  }

  function deleteCard(id: string) {
    const formData = new FormData();
    formData.set("id", id);
    startTransition(async () => {
      applyResult(
        await deleteActivityCardAction(formData),
        "La actividad se eliminó.",
      );
    });
  }

  return (
    <div className="space-y-8">
      {notice ? (
        <div
          role={notice.kind === "error" ? "alert" : "status"}
          className={`rounded-lg border px-4 py-3 text-sm font-semibold ${
            notice.kind === "error"
              ? "border-brand bg-white text-brand"
              : "border-line bg-white text-ink"
          }`}
        >
          {notice.text}
        </div>
      ) : null}

      <ActivitiesHeaderForm
        header={current}
        disabled={isPending}
        onSave={saveHeader}
      />

      <section aria-labelledby="activities-cards-title">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2
              id="activities-cards-title"
              className="text-xl font-extrabold tracking-tight"
            >
              Actividades
            </h2>
            <p className="mt-1 text-sm text-muted">
              Cargá disciplinas con imagen, días y horarios y un botón propio.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsCreating(true)}
            disabled={isPending || isCreating}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Nueva actividad
          </button>
        </div>

        {current.items.length === 0 && !isCreating ? (
          <div
            role="status"
            className="mt-5 rounded-lg border border-dashed border-line bg-white p-6 text-center"
          >
            <p className="text-sm font-semibold">Todavía no hay actividades.</p>
            <p className="mt-1 text-sm text-muted">
              Usá «Nueva actividad» para cargar la primera.
            </p>
          </div>
        ) : null}

        <ul className="mt-5 space-y-5">
          {current.items.map((card) => (
            <li key={card.id}>
              <ActivityCardForm
                card={card}
                defaultCta={current.cardCta}
                disabled={isPending}
                onSave={saveCard}
                onDelete={deleteCard}
              />
            </li>
          ))}
          {isCreating ? (
            <li>
              <ActivityCardForm
                card={null}
                defaultCta={current.cardCta}
                disabled={isPending}
                onSave={saveCard}
                onCancel={() => setIsCreating(false)}
              />
            </li>
          ) : null}
        </ul>
      </section>
    </div>
  );
}
