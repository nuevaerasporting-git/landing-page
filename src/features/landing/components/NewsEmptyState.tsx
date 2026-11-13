import { Icon } from "@/shared/ui/icons";

export function NewsEmptyState() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-line bg-surface px-6 py-12 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-brand/10 text-brand">
        <Icon name="calendar" className="size-6" />
      </span>
      <h3 className="mt-4 text-lg font-extrabold text-ink">
        Todavía no hay novedades publicadas
      </h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
        Cuando el club publique una convocatoria o un evento, va a aparecer en
        este espacio.
      </p>
    </div>
  );
}
