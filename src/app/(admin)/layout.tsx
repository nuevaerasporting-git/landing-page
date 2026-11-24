import type { ReactNode } from "react";
import { AdminNavLinks } from "@/features/content/components/admin/admin-nav-links";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface text-ink">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-white lg:flex">
          <div className="flex h-16 items-center gap-3 border-b border-line px-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand text-sm font-extrabold text-white">
              NE
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-sm font-extrabold">Nueva Era</span>
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                Panel de contenido
              </span>
            </span>
          </div>
          <div className="flex-1 px-3 py-6">
            <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
              Administración
            </p>
            <AdminNavLinks />
          </div>
          <div className="border-t border-line px-6 py-4 text-xs leading-relaxed text-muted">
            Actividades se guarda. Las demás secciones siguen en maquetación.
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b border-line bg-white px-4 sm:px-6 lg:px-8">
            <details className="relative lg:hidden">
              <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-md border border-line [&::-webkit-details-marker]:hidden">
                <span className="sr-only">Abrir menú del panel</span>
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </summary>
              <div className="absolute left-0 top-full z-50 mt-2 w-64 rounded-lg border border-line bg-white p-3 shadow-lg">
                <AdminNavLinks />
              </div>
            </details>
            <div className="hidden min-w-0 lg:block">
              <p className="text-sm font-bold">Panel de administración</p>
              <p className="text-xs text-muted">
                Gestión visual del contenido del sitio
              </p>
            </div>
            <span className="ml-auto inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand" />
              Edición parcial
            </span>
          </header>
          <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
