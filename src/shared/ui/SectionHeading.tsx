type HeadingAlign = "left" | "center";
type HeadingTone = "light" | "muted" | "dark";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: HeadingAlign;
  tone?: HeadingTone;
}

const ALIGN_CLASSES: Record<HeadingAlign, string> = {
  left: "",
  center: "mx-auto text-center",
};

const TONE_CLASSES: Record<
  HeadingTone,
  { eyebrow: string; title: string; description: string }
> = {
  light: {
    eyebrow: "text-brand",
    title: "text-ink",
    description: "text-muted",
  },
  muted: {
    eyebrow: "text-ink-soft",
    title: "text-ink",
    description: "text-ink-soft",
  },
  dark: {
    eyebrow: "text-white",
    title: "text-white",
    description: "text-white/75",
  },
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: SectionHeadingProps) {
  const toneClasses = TONE_CLASSES[tone];

  return (
    <div className={`max-w-2xl ${ALIGN_CLASSES[align]}`}>
      {eyebrow ? (
        <p
          className={`mb-2 text-xs font-bold uppercase tracking-[0.18em] ${toneClasses.eyebrow}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl ${toneClasses.title}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-3 text-base leading-relaxed ${toneClasses.description}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
