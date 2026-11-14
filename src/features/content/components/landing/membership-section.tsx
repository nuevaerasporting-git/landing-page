import { Container } from "@/shared/ui/container";

export function MembershipSection() {
  return (
    <section id="asociate" className="bg-brand text-white">
      <Container className="py-10 sm:py-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
              Sé parte de Nueva Era
            </h2>
            <p className="mt-3 text-base leading-relaxed sm:text-lg">
              Sumate a nuestro club y compartí la pasión por el deporte, la
              familia y la comunidad
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white sm:text-base">
              Consultanos por requisitos, categorías y cuotas vigentes
            </p>
          </div>

          <a
            href="#contacto"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-white px-7 py-3 text-sm font-semibold text-brand transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </Container>
    </section>
  );
}
