import { NewsList } from "../NewsList";

export function NewsBlock() {
  return (
    <section id="novedades" className="bg-nesc-gray py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-nesc-red">
              Actualidad del Club
            </p>
            <h2 className="mt-1 font-display text-2xl font-black uppercase tracking-tight text-nesc-black sm:text-3xl">
              Últimas Novedades
            </h2>
          </div>
          <a
            href="https://www.instagram.com/nuevaerasportingclub/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase text-nesc-red transition-colors hover:text-nesc-red-dark sm:text-sm"
          >
            <span className="sm:hidden">Instagram</span>
            <span className="hidden sm:inline">Ver más en @nuevaerasportingclub</span>
            <span>↗</span>
          </a>
        </div>
        <NewsList />
      </div>
    </section>
  );
}