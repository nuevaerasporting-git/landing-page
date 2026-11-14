import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type ButtonLinkVariant = "primary" | "secondary";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: ButtonLinkVariant;
  className?: string;
  onClick?: () => void;
}

const VARIANT_CLASSES: Record<ButtonLinkVariant, string> = {
  primary: "bg-brand text-white hover:bg-brand/90",
  secondary:
    "border border-muted bg-white text-ink hover:border-brand hover:text-brand",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  onClick,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
        VARIANT_CLASSES[variant],
        className,
      )}
    >
      {children}
    </a>
  );
}
