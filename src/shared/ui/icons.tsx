import type { IconName } from "@/features/landing/types";

interface IconProps {
  name: IconName;
  className?: string;
}

export function Icon({ name, className = "size-6" }: IconProps) {
  const baseProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": true,
  } as const;

  switch (name) {
    case "arrow-right":
      return (
        <svg {...baseProps}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...baseProps}>
          <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" />
          <path d="M8.8 8.5c.2-.5.5-.6.8-.6h.6c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .4-.1.6l-.5.6c-.1.2-.2.4 0 .7.4.7 1 1.3 1.7 1.7.3.2.5.1.7 0l.6-.5c.2-.1.4-.2.6-.1l1.6.7c.3.1.4.3.4.5v.6c0 .3-.1.6-.6.8-.5.2-1.2.3-1.9.1-2.4-.7-4.3-2.6-5-5-.2-.7-.1-1.4.1-1.9Z" />
        </svg>
      );
    case "map-pin":
      return (
        <svg {...baseProps}>
          <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...baseProps}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
          <circle cx="12" cy="12" r="3.5" />
          <circle cx="17" cy="7" r="0.75" fill="currentColor" stroke="none" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...baseProps}>
          <path d="M14.5 8.5H17V5.5h-2.5C11.8 5.5 10.5 7 10.5 9.2V11H8v3h2.5v6h3.2v-6h2.6l.5-3h-3.1V9.5c0-.7.3-1 .8-1Z" />
        </svg>
      );
    case "soccer":
      return (
        <svg {...baseProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="m12 7 4 3-1.5 4.5h-5L8 10l4-3Z" />
          <path d="M12 3v4M4 9l4 1M20 9l-4 1M6 19l2.5-4.5M18 19l-2.5-4.5M10 19h4" />
        </svg>
      );
    case "hockey":
      return (
        <svg {...baseProps}>
          <path d="M6 4v8c0 3 2 5 5 5h7" />
          <circle cx="18.5" cy="17" r="1.5" />
        </svg>
      );
    case "tennis":
      return (
        <svg {...baseProps}>
          <circle cx="9" cy="9" r="5" />
          <path d="m12.5 12.5 6 6" />
          <path d="m6 6 6 6M6 12l6-6" />
        </svg>
      );
    case "padel":
      return (
        <svg {...baseProps}>
          <circle cx="9" cy="9" r="5" />
          <path d="m12.5 12.5 6 6" />
          <circle cx="7.5" cy="7.5" r="0.6" fill="currentColor" stroke="none" />
          <circle cx="10.5" cy="10.5" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "folklore":
      return (
        <svg {...baseProps}>
          <path d="M9 18V6l9-2v12" />
          <circle cx="6.5" cy="18" r="2.5" />
          <circle cx="15.5" cy="16" r="2.5" />
        </svg>
      );
    case "pool":
      return (
        <svg {...baseProps}>
          <path d="M3 8c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" />
          <path d="M3 13c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" />
          <path d="M3 18c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" />
        </svg>
      );
    case "users":
      return (
        <svg {...baseProps}>
          <path d="M16 19v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V19" />
          <circle cx="9.5" cy="7" r="3.5" />
          <path d="M17 11a3.5 3.5 0 0 1 0 7" />
          <path d="M21 19v-1.5a4 4 0 0 0-3-3.8" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...baseProps}>
          <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
          <path d="M8 3v4M16 3v4M3.5 10h17" />
        </svg>
      );
    case "shirt":
      return (
        <svg {...baseProps}>
          <path d="m8 4-4.5 3 2 4L8 10v10h8V10l2.5 1 2-4L16 4l-2.5 2h-3L8 4Z" />
        </svg>
      );
    case "star":
      return (
        <svg {...baseProps}>
          <path d="m12 3 2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8L6.6 19.6l1-6L3.3 9.4l6-.9L12 3Z" />
        </svg>
      );
    case "menu":
      return (
        <svg {...baseProps}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case "close":
      return (
        <svg {...baseProps}>
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      );
    case "check":
      return (
        <svg {...baseProps}>
          <path d="m5 12.5 4 4L19 7" />
        </svg>
      );
    default:
      return null;
  }
}
