import { NescLogo } from "./NescLogo";

export function Footer() {
  return (
    <footer className="border-t-4 border-nesc-red bg-nesc-black text-nesc-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="grid grid-cols-1 gap-8 border-b border-white/15 pb-10 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <NescLogo variant="negative" className="h-11 w-10 shrink-0" />
              <div>
                <span className="block font-black uppercase tracking-tight text-lg">
                  Nueva Era Sporting Club
                </span>
                <span className="block text-xs font-semibold text-gray-400">
                  Asociación Civil Sin Fines de Lucro
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-gray-300">
              Fundado el 19 de enero de 1961 a partir de la unión del Club Sportivo Juventud
              Unida y Aspirante Football Club. Orgullo deportivo y social de María Teresa.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-extrabold uppercase tracking-widest text-nesc-red">
              Nuestros Espacios
            </h3>
            <ul className="space-y-3 text-xs text-gray-300">
              <li>
                <strong className="block font-bold text-white">Sede Social y Salón de Fiestas</strong>
                <span>Dorrego y Urquiza — María Teresa (CP 2609), Santa Fe.</span>
              </li>
              <li>
                <strong className="block font-bold text-white">
                  Polideportivo y Estadio Cecilio Gilmour Eden
                </strong>
                <span>Sáenz Peña y Sarmiento — María Teresa (CP 2609), Santa Fe.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-extrabold uppercase tracking-widest text-nesc-red">
              Contacto Directo
            </h3>
            <p className="mb-4 text-xs text-gray-300">
              Comunicate con Secretaría para trámites de socios, alquiler de instalaciones o
              consultas de disciplinas.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <a
                href="https://wa.me/5493462000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center rounded bg-nesc-red px-4 text-xs font-extrabold uppercase tracking-wide text-white transition-colors hover:bg-nesc-red-dark"
              >
                WhatsApp
              </a>
              <a
                href="https://www.instagram.com/nuevaerasportingclub/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center rounded border border-white/25 px-4 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:border-white"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 pt-6 text-[11px] text-gray-400 sm:flex-row">
          <p>© 2026 Nueva Era Sporting Club. Todos los derechos reservados.</p>
          <p className="font-semibold text-gray-300">
            En las buenas y en las malas, siempre juntos.
          </p>
        </div>
      </div>
    </footer>
  );
}