import { hasExpectedShape } from "@/features/content/repositories/site-configuration";
import type { OperationResult } from "@/features/content/types/activities";
import type { Sections } from "@/features/content/types/site-configuration";
import { getAdminClient } from "@/shared/supabase/admin";

const SECTIONS_TABLE = "site_configurations";
const WRITE_ERROR = "No se pudo guardar la sección Actividades.";

function getDomain(): string {
  return process.env.SITE_DOMAIN ?? "localhost:3000";
}

export async function readAdminSections(): Promise<Sections | null> {
  try {
    const { data, error } = await getAdminClient()
      .from(SECTIONS_TABLE)
      .select("sections")
      .eq("domain", getDomain())
      .maybeSingle();

    if (error) {
      console.warn(`[activities] Could not read site sections: ${error.message}`);
      return null;
    }

    const sections: unknown = data?.sections;
    if (!hasExpectedShape(sections)) {
      console.warn("[activities] Unexpected sections payload");
      return null;
    }

    return sections;
  } catch {
    console.warn("[activities] Admin client unavailable");
    return null;
  }
}

export async function writeSections(sections: Sections): Promise<OperationResult> {
  try {
    const { data, error } = await getAdminClient()
      .from(SECTIONS_TABLE)
      .update({ sections, updated_at: new Date().toISOString() })
      .eq("domain", getDomain())
      .select("uuid");

    if (error) {
      console.warn(`[activities] Could not write site sections: ${error.message}`);
      return { ok: false, error: WRITE_ERROR };
    }

    if (!data || data.length === 0) {
      console.warn("[activities] No site configuration matched the domain");
      return { ok: false, error: WRITE_ERROR };
    }

    return { ok: true };
  } catch {
    console.warn("[activities] Could not write site sections");
    return { ok: false, error: WRITE_ERROR };
  }
}
