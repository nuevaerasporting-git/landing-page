import { NewsEditorClient } from "@/features/content/components/admin/news-editor-client";
import { getAdminNewsSection } from "@/features/content/services/news";

export async function NewsEditor() {
  const result = await getAdminNewsSection();

  if (!result.ok) {
    return (
      <section
        role="alert"
        aria-labelledby="news-load-error-title"
        className="rounded-lg border border-line bg-white p-5"
      >
        <h2 id="news-load-error-title" className="text-base font-bold">
          No se pudieron cargar las noticias.
        </h2>
        <p className="mt-2 text-sm text-muted">{result.error}</p>
      </section>
    );
  }

  return <NewsEditorClient initialItems={result.section.items} />;
}
