interface NescShieldProps {
  className?: string;
  title?: string;
}

export function NescShield({
  className = "size-10",
  title,
}: NescShieldProps) {
  return (
    <svg
      viewBox="0 0 72 88"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M36 2 66 12v26c0 22-12 36-30 46C18 74 6 60 6 38V12L36 2Z"
        fill="#111111"
      />
      <path
        d="M36 8 60 16v22c0 18-9 30-24 39-15-9-24-21-24-39V16L36 8Z"
        fill="#FFFFFF"
      />
      <path
        d="M36 2 48 14 36 22 24 14 36 2Z"
        fill="#FFFFFF"
        stroke="#111111"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M14 56 36 74 58 56v8L36 84 14 64v-8Z"
        fill="#E30613"
      />
      <text
        x="36"
        y="49"
        textAnchor="middle"
        fill="#111111"
        fontSize="15"
        fontWeight="800"
        letterSpacing="0.5"
      >
        NESC
      </text>
    </svg>
  );
}
