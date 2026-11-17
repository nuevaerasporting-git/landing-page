const benefits = [
  {
    title: "[Beneficio 1]",
    description: "[Descripción pendiente de validación por el club.]",
  },
  {
    title: "[Beneficio 2]",
    description: "[Descripción pendiente de validación por el club.]",
  },
  {
    title: "[Beneficio 3]",
    description: "[Descripción pendiente de validación por el club.]",
  },
];

export function FeaturesBlock() {
  return (
    <section className="bg-nesc-white" id="asociate">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="font-display text-2xl font-black uppercase tracking-tight text-nesc-black sm:text-3xl">
          Beneficios para socios
        </h2>
        <p className="mt-2 text-sm text-nesc-muted">
          [Resumen de beneficios pendiente de validación por el club.]
        </p>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <li
              key={benefit.title}
              className="rounded-lg border border-nesc-border bg-nesc-gray p-6"
            >
              <h3 className="text-base font-extrabold uppercase text-nesc-black">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-nesc-muted">
                {benefit.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}