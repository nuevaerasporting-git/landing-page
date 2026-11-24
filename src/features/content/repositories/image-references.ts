import { getAdminClient } from "@/shared/supabase/admin";

const SECTIONS_TABLE = "site_configurations";

interface SectionsRow {
  sections?: unknown;
}

export async function isImageReferenced(
  path: string,
  publicUrl: string,
): Promise<boolean> {
  const targets = new Set<string>();
  if (path) targets.add(path);
  if (publicUrl) targets.add(publicUrl);
  if (targets.size === 0) return false;

  try {
    const { data, error } = await getAdminClient()
      .from(SECTIONS_TABLE)
      .select("sections");

    if (error) {
      console.warn(`[activities] Could not check image references: ${error.message}`);
      return true;
    }

    const rows = (data ?? []) as SectionsRow[];
    return rows.some((row) => containsTarget(row.sections, targets));
  } catch {
    console.warn("[activities] Could not check image references");
    return true;
  }
}

function containsTarget(
  value: unknown,
  targets: Set<string>,
  depth = 0,
): boolean {
  if (depth > 20) return false;
  if (typeof value === "string") return targets.has(value);
  if (Array.isArray(value)) {
    return value.some((item) => containsTarget(item, targets, depth + 1));
  }
  if (typeof value === "object" && value !== null) {
    return Object.values(value).some((item) =>
      containsTarget(item, targets, depth + 1),
    );
  }
  return false;
}
