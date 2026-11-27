import type { SponsorInput, SponsorWriteResult } from "@/features/sponsors/types/sponsor";
import { getAdminClient } from "@/shared/supabase/admin";
import { getPublicClient } from "@/shared/supabase/public";

const TABLE = "sponsors";
const PUBLIC_VIEW = "public_sponsors";
const COLUMNS = "id,name,logo_path,logo_alt,website_url,sort_order,is_active";
const WRITE_ERROR = "No se pudo guardar el patrocinador. Intentá de nuevo.";

function toRow(input: SponsorInput) {
  return {
    name: input.name,
    logo_path: input.logoPath,
    logo_alt: input.logoAlt,
    website_url: input.websiteUrl,
    sort_order: input.sortOrder,
    is_active: input.isActive,
  };
}

export async function listAdminSponsorRows(): Promise<unknown[]> {
  try {
    const { data, error } = await getAdminClient()
      .from(TABLE)
      .select(COLUMNS)
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });

    if (error) {
      console.warn(`[sponsors] ${error.message}`);
      return [];
    }
    return data ?? [];
  } catch {
    console.warn("[sponsors] Admin client unavailable while listing");
    return [];
  }
}

export async function listPublicSponsorRows(): Promise<unknown[]> {
  try {
    const { data, error } = await getPublicClient()
      .from(PUBLIC_VIEW)
      .select(COLUMNS)
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });

    if (error) {
      console.warn(`[sponsors] ${error.message}`);
      return [];
    }
    return data ?? [];
  } catch {
    console.warn("[sponsors] Public client unavailable while listing");
    return [];
  }
}

export async function findSponsorRow(id: string): Promise<unknown> {
  try {
    const { data, error } = await getAdminClient()
      .from(TABLE)
      .select(COLUMNS)
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.warn(`[sponsors] ${error.message}`);
      return null;
    }
    return data;
  } catch {
    console.warn("[sponsors] Admin client unavailable while reading");
    return null;
  }
}

export async function insertSponsorRow(
  input: SponsorInput,
): Promise<SponsorWriteResult> {
  try {
    const { data, error } = await getAdminClient()
      .from(TABLE)
      .insert(toRow(input))
      .select("id")
      .single();

    if (error || !data) {
      console.warn(`[sponsors] ${error?.message ?? "Insert returned no id"}`);
      return { ok: false, error: WRITE_ERROR };
    }
    return { ok: true, id: data.id };
  } catch {
    console.warn("[sponsors] Admin client unavailable while inserting");
    return { ok: false, error: WRITE_ERROR };
  }
}

export async function updateSponsorRow(
  id: string,
  input: SponsorInput,
): Promise<SponsorWriteResult> {
  try {
    const { data, error } = await getAdminClient()
      .from(TABLE)
      .update(toRow(input))
      .eq("id", id)
      .select("id")
      .maybeSingle();

    if (error || !data) {
      console.warn(`[sponsors] ${error?.message ?? "Sponsor not found"}`);
      return { ok: false, error: WRITE_ERROR };
    }
    return { ok: true, id: data.id };
  } catch {
    console.warn("[sponsors] Admin client unavailable while updating");
    return { ok: false, error: WRITE_ERROR };
  }
}

export async function deleteSponsorRow(id: string): Promise<SponsorWriteResult> {
  try {
    const { data, error } = await getAdminClient()
      .from(TABLE)
      .delete()
      .eq("id", id)
      .select("id")
      .maybeSingle();

    if (error || !data) {
      console.warn(`[sponsors] ${error?.message ?? "Sponsor not found"}`);
      return { ok: false, error: "No se pudo eliminar el patrocinador. Intentá de nuevo." };
    }
    return { ok: true, id: data.id };
  } catch {
    console.warn("[sponsors] Admin client unavailable while deleting");
    return { ok: false, error: "No se pudo eliminar el patrocinador. Intentá de nuevo." };
  }
}

