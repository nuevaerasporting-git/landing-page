import Link from "next/link";
import { ADMIN_SECTIONS } from "@/features/content/data/admin";

export function AdminNavLinks() {
  return (
    <nav aria-label="Secciones del panel">
      <ul className="space-y-1">
        <li>
          <Link
            href="/admin"
            className="flex min-h-11 items-center rounded-md px-3 text-sm font-semibold text-ink transition-colors hover:bg-surface hover:text-brand"
          >
            Dashboard
          </Link>
        </li>
        {ADMIN_SECTIONS.map((section) => (
          <li key={section.key}>
            <Link
              href={section.route}
              className="flex min-h-11 items-center rounded-md px-3 text-sm font-semibold text-muted transition-colors hover:bg-surface hover:text-brand"
            >
              {section.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
