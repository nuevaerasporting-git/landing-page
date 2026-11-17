"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-6">
      <h2 className="text-xl font-bold text-nesc-black">
        Algo salió mal
      </h2>
      <p className="mt-2 text-sm text-nesc-muted">
        Intentá recargar la página.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-md bg-nesc-red px-6 text-sm font-extrabold uppercase text-white transition hover:bg-nesc-red-dark"
      >
        Reintentar
      </button>
    </div>
  );
}