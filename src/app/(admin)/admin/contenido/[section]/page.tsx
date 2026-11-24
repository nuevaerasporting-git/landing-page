import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ActivitiesEditor } from "@/features/content/components/admin/activities-editor";
import {
  ADMIN_SECTIONS,
  getSectionFields,
  isSectionKey,
} from "@/features/content/data/admin";

interface SectionEditorPageProps {
  params: Promise<{ section: string }>;
}

function SectionEditorSkeleton() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-8" aria-hidden="true">
      <div className="h-9 w-56 animate-pulse rounded bg-surface" />
      <div className="h-20 animate-pulse rounded-lg border border-line bg-white" />
      <div className="h-64 animate-pulse rounded-lg border border-line bg-white" />
    </div>
  );
}

interface EditorHeadingProps {
  label: string;
  description?: string;
}

function EditorHeading({ label, description }: EditorHeadingProps) {
  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex min-h-11 items-center text-sm font-semibold text-muted transition-colors hover:text-brand"
      >
        Volver al dashboard
      </Link>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight">{label}</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}

async function SectionEditor({ params }: SectionEditorPageProps) {
  const { section } = await params;
  if (!isSectionKey(section)) notFound();

  const descriptor = ADMIN_SECTIONS.find((item) => item.key === section);
  const label = descriptor?.label ?? section;
  const heading = (
    <EditorHeading label={label} description={descriptor?.description} />
  );

  if (section === "activities") {
    return (
      <div className="mx-auto w-full max-w-4xl space-y-8">
        {heading}
        <ActivitiesEditor />
      </div>
    );
  }

  const fields = getSectionFields(section);

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8">
      {heading}

      <div
        role="status"
        className="flex flex-col gap-2 rounded-lg border border-line bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p className="text-sm font-bold">CRUD pendiente — a cargo del equipo</p>
          <p className="mt-1 text-sm text-muted">
            Los campos se muestran deshabilitados y no hay acciones de guardado.
          </p>
        </div>
        <span className="inline-flex w-fit items-center rounded-full bg-surface px-3 py-1 text-xs font-semibold text-muted">
          Sin cambios
        </span>
      </div>

      <section aria-labelledby="campos-title">
        <h2 id="campos-title" className="text-xl font-extrabold tracking-tight">
          Campos actuales
        </h2>
        <p className="mt-1 text-sm text-muted">
          Valores de referencia de los datos locales del sitio.
        </p>

        <form className="mt-4 rounded-lg border border-line bg-white p-5 sm:p-6">
          <fieldset disabled className="grid gap-5 sm:grid-cols-2">
            <legend className="sr-only">Campos de {label}</legend>
            {fields.map((field, index) => (
              <div key={`${field.label}-${index}`} className="min-w-0">
                <label
                  htmlFor={`campo-${index}`}
                  className="block text-xs font-bold uppercase tracking-[0.1em] text-muted"
                >
                  {field.label}
                </label>
                <input
                  id={`campo-${index}`}
                  value={field.value}
                  readOnly
                  className="mt-2 h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink disabled:cursor-not-allowed disabled:opacity-70"
                />
              </div>
            ))}
          </fieldset>
        </form>
      </section>
    </div>
  );
}

export default function SectionEditorPage({ params }: SectionEditorPageProps) {
  return (
    <Suspense fallback={<SectionEditorSkeleton />}>
      <SectionEditor params={params} />
    </Suspense>
  );
}
