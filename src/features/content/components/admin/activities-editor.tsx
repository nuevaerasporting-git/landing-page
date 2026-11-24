import { getActivitiesSection } from "@/features/content/services/activities";
import { ActivitiesEditorClient } from "./activities-editor-client";

export async function ActivitiesEditor() {
  // TODO(auth): validar requireRole(["admin", "editor"])
  const section = await getActivitiesSection();

  if (!section) {
    return (
      <div
        role="alert"
        className="rounded-lg border border-brand bg-white p-5 text-sm font-semibold text-brand"
      >
        No se pudo cargar la sección Actividades. Intentá de nuevo más tarde.
      </div>
    );
  }

  return <ActivitiesEditorClient section={section} />;
}
