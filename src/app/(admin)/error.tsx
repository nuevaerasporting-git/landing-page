"use client";

export default function AdminError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto w-full max-w-3xl" role="alert">
      <div className="rounded-lg border border-line bg-white p-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
          Panel de administración
        </p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight">
          No se pudo cargar la pantalla
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Intentá de nuevo. Si el problema continúa, avisá a quien administra
          el sitio.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-5 inline-flex min-h-11 items-center rounded-md bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}
