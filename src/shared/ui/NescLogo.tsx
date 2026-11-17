type NescLogoProps = {
  variant?: "positive" | "negative";
  className?: string;
};

export function NescLogo({ variant = "positive", className }: NescLogoProps) {
  const isPositive = variant === "positive";

  return (
    <svg
      viewBox="0 0 100 116"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Escudo Nueva Era Sporting Club"
      className={className}
    >
      {isPositive ? (
        <>
          <path
            d="M50 4 L95 18 C95 18 95 22 94 26 L50 62 L6 26 C5 22 5 18 5 18 L50 4 Z"
            fill="#FFFFFF"
          />
          <path
            d="M6 26 L50 62 L94 26 C90 66 72 95 50 112 C28 95 10 66 6 26 Z"
            fill="#E30613"
          />
          <path
            d="M6 26 L50 62 L94 26"
            stroke="#111111"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          <path
            d="M50 4 L95 18 C92 63 74 94 50 112 C26 94 8 63 5 18 L50 4 Z"
            stroke="#111111"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <text
            x="50"
            y="34"
            textAnchor="middle"
            fill="#111111"
            fontFamily="Montserrat, sans-serif"
            fontWeight="900"
            fontSize="18"
            letterSpacing="1.5"
          >
            NESC
          </text>
        </>
      ) : (
        <>
          <path
            d="M50 4 L95 18 C95 18 95 22 94 26 L50 62 L6 26 C5 22 5 18 5 18 L50 4 Z"
            fill="#E30613"
          />
          <path
            d="M6 26 L50 62 L94 26 C90 66 72 95 50 112 C28 95 10 66 6 26 Z"
            fill="#FFFFFF"
          />
          <path
            d="M50 4 L95 18 C92 63 74 94 50 112 C26 94 8 63 5 18 L50 4 Z"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <text
            x="50"
            y="34"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="Montserrat, sans-serif"
            fontWeight="900"
            fontSize="18"
            letterSpacing="1.5"
          >
            NESC
          </text>
        </>
      )}
    </svg>
  );
}