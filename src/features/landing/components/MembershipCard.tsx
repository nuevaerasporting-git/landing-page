import type { MembershipCategory } from "@/features/landing/types";

interface MembershipCardProps {
  category: MembershipCategory;
}

export function MembershipCard({ category }: MembershipCardProps) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-line bg-surface p-5 shadow-card">
      <h3 className="text-lg font-extrabold text-ink">{category.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {category.description}
      </p>
      <p className="mt-5 rounded-md bg-surface-muted px-3 py-2 text-sm font-bold text-ink-soft">
        {category.priceLabel}
      </p>
    </article>
  );
}
