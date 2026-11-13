"use client";

import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS, SITE_INFO } from "@/features/landing/data/site";
import { ButtonLink } from "@/shared/ui/Button";
import { Icon } from "@/shared/ui/icons";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  return (
    <div className="relative md:hidden" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
        aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
        className="flex size-11 items-center justify-center rounded-md border border-line text-ink"
      >
        <Icon name={isOpen ? "close" : "menu"} className="size-5" />
      </button>

      {isOpen ? (
        <div
          id="mobile-nav"
          className="absolute right-0 top-14 w-64 rounded-lg border border-line bg-surface p-4 shadow-card"
        >
          <nav aria-label="Navegación mobile" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex min-h-11 items-center rounded-md px-3 text-sm font-semibold text-ink-soft hover:bg-surface-muted hover:text-ink"
              >
                {item.label}
              </a>
            ))}
            <ButtonLink
              href={SITE_INFO.whatsappUrl}
              onClick={() => setIsOpen(false)}
              className="mt-2 w-full"
              variant="primary"
            >
              <Icon name="whatsapp" className="size-4" />
              WhatsApp
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
