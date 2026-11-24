"use client";

import { useEffect } from "react";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div
        role="alert"
        className="rounded-lg border border-brand bg-white p-6 text-center"
      >
        <h1 className="text-xl font-extrabold tracking-tight">
          No se pudo cargar el panel
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Intentá de nuevo. Si el problema continúa, volvé más tarde.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}
