import { revalidatePath } from "next/cache";

export function revalidateSponsorPaths(): void {
  revalidatePath("/");
  revalidatePath("/admin/patrocinadores");
}
