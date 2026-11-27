import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { getAdminSponsors } from "@/features/sponsors/services/get-sponsors";

export default async function SponsorsAdminPage() {
  await connection();
  const sponsors = await getAdminSponsors();

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <header>
        <Link
          href="/admin"
          className="inline-flex min-h-11 items-center text-sm font-semibold text-muted transition-colors hover:text-brand"
        >
          Volver al dashboard
        </Link>
        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
              Administración
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
              Patrocinadores
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              Alta, edición y orden de las marcas que acompañan al club. Los
              cambios visibles se publican en la sección de la portada.
            </p>
          </div>
          <Link
            href="/admin/patrocinadores/nuevo"
            className="inline-flex min-h-11 w-fit items-center justify-center rounded-md bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
          >
            Nuevo patrocinador
          </Link>
        </div>
      </header>

      {sponsors.length === 0 ? (
        <div role="status" className="rounded-lg border border-line bg-white p-6">
          <p className="text-sm font-bold">Todavía no hay patrocinadores</p>
          <p className="mt-1 text-sm text-muted">
            Cuando agregues el primero, va a aparecer en la portada del sitio.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-white">
          {sponsors.map((sponsor) => (
            <li
              key={sponsor.id}
              className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-md border border-line bg-surface p-2">
                  <Image
                    src={sponsor.logoUrl}
                    alt=""
                    width={80}
                    height={48}
                    className="max-h-12 w-auto object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{sponsor.name}</p>
                  <p className="mt-1 truncate text-xs text-muted">
                    {sponsor.websiteUrl ?? "Sin sitio web"}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Orden {sponsor.sortOrder} · {sponsor.isActive ? "Visible" : "Oculto"}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/admin/patrocinadores/${sponsor.id}/editar`}
                  className="inline-flex min-h-11 items-center rounded-md border border-line px-3 text-sm font-semibold text-ink transition-colors hover:bg-surface hover:text-brand"
                >
                  Editar
                </Link>
                <Link
                  href={`/admin/patrocinadores/${sponsor.id}/eliminar`}
                  className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold text-brand transition-colors hover:bg-surface"
                >
                  Eliminar
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
