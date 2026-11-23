import Link from "next/link";
import { ADMIN_SECTIONS } from "@/features/content/data/admin";

const SUMMARY_CARDS = [
  { label: "Secciones editables", value: String(ADMIN_SECTIONS.length) },
  { label: "Estado del contenido", value: "Sin cambios" },
  { label: "Última actualización", value: "Sin registrar" },
  { label: "Guardado", value: "Deshabilitado" },
];

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
          Resumen
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
          Panel de contenido
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Vista de maquetación del panel. Las pantallas muestran el contenido
          actual y no incluyen guardado ni edición.
        </p>
      </header>

      <div
        role="status"
        className="flex flex-col gap-2 rounded-lg border border-line bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p className="text-sm font-bold">CRUD pendiente — a cargo del equipo</p>
          <p className="mt-1 text-sm text-muted">
            Cada persona implementará la edición de su sección en el panel.
          </p>
        </div>
        <span className="inline-flex w-fit items-center rounded-full bg-surface px-3 py-1 text-xs font-semibold text-muted">
          Solo lectura
        </span>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SUMMARY_CARDS.map((card) => (
          <li
            key={card.label}
            className="rounded-lg border border-line bg-white p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              {card.label}
            </p>
            <p className="mt-3 text-xl font-extrabold tracking-tight text-ink">
              {card.value}
            </p>
          </li>
        ))}
      </ul>

      <section aria-labelledby="secciones-title">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 id="secciones-title" className="text-xl font-extrabold tracking-tight">
              Secciones
            </h2>
            <p className="mt-1 text-sm text-muted">
              Valores de referencia de la landing, tomados de los datos locales.
            </p>
          </div>
        </div>

        <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-white">
          {ADMIN_SECTIONS.map((section) => (
            <li key={section.key} className="p-4 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h3 className="text-sm font-bold">{section.label}</h3>
                  <p className="mt-1 text-xs text-muted">
                    {section.description}
                  </p>
                  <p className="mt-2 truncate text-sm text-ink">
                    {section.summary}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="inline-flex items-center rounded-full border border-line px-3 py-1 text-xs font-semibold text-muted">
                    Sin cambios
                  </span>
                  <Link
                    href={section.route}
                    className="inline-flex min-h-11 items-center rounded-md bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
                  >
                    Ver sección
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
