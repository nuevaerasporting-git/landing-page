import { HistoryDisciplinesModal } from "@/shared/ui/HistoryDisciplinesModal";
import { NescLogo } from "@/shared/ui/NescLogo";

export function HeroBlock() {
  return (
    <section className="relative overflow-hidden border-b border-nesc-border bg-nesc-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-8 py-10 sm:py-14 lg:grid-cols-12 lg:gap-6 lg:py-16">
          <div className="z-10 lg:col-span-7">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-nesc-red/25 bg-nesc-red/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-nesc-red sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-nesc-red" />
              <span>Fundado el 19 de Enero de 1961 • María Teresa</span>
            </div>

            <h1 className="mb-5 text-4xl font-black uppercase leading-[1.04] tracking-tight text-nesc-black sm:text-5xl lg:text-[54px]">
              Una historia nacida de la unión.
              <span className="mt-1 block italic text-nesc-red">Sumate al Tren Rojo.</span>
            </h1>

            <p className="mb-7 max-w-xl text-sm font-medium leading-relaxed text-nesc-muted sm:text-base">
              Más de 65 años impulsando el deporte, la amistad y la vida social en
              María Teresa. Fútbol, hockey sobre césped, tenis, pádel, natatorio y
              actividades culturales para toda la familia.
            </p>

            <div className="mb-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <a
                href="#asociate"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-nesc-red px-7 text-sm font-extrabold uppercase tracking-wide text-white shadow-md shadow-nesc-red/20 transition-all hover:bg-nesc-red-dark"
              >
                <span>Quiero Asociarme</span>
                <span>→</span>
              </a>
              <HistoryDisciplinesModal
                defaultTab="historia"
                triggerLabel="Historia y Disciplinas"
                triggerClassName="inline-flex h-12 cursor-pointer items-center justify-center rounded-md border-2 border-nesc-black px-6 text-sm font-extrabold uppercase tracking-wide text-nesc-black transition-all hover:bg-nesc-black hover:text-white"
              />
            </div>

            <div className="grid max-w-md grid-cols-3 gap-4 border-t border-nesc-border pt-6">
              <div>
                <span className="block text-2xl font-black text-nesc-red sm:text-3xl">1961</span>
                <span className="text-[11px] font-bold uppercase tracking-wide text-nesc-muted">
                  Unión Histórica
                </span>
              </div>
              <div>
                <span className="block text-2xl font-black text-nesc-black sm:text-3xl">+6</span>
                <span className="text-[11px] font-bold uppercase tracking-wide text-nesc-muted">
                  Disciplinas
                </span>
              </div>
              <div>
                <span className="block text-2xl font-black text-nesc-black sm:text-3xl">2</span>
                <span className="text-[11px] font-bold uppercase tracking-wide text-nesc-muted">
                  Predios Propios
                </span>
              </div>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="absolute -inset-2 hidden rounded-2xl bg-nesc-red sm:block" style={{ transform: "rotate(2deg)" }} />
            <div className="nesc-hero-diagonal relative flex aspect-[4/3] items-center justify-center rounded-2xl border-2 border-nesc-black bg-nesc-gray shadow-xl lg:aspect-[4/4.3]">
              <span className="text-sm font-medium text-nesc-muted">Foto del predio (pendiente)</span>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                <div className="text-nesc-black">
                  <span className="mb-1 inline-block rounded bg-nesc-red px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                    Casa Propia
                  </span>
                  <p className="text-sm font-extrabold leading-tight">Estadio Cecilio Gilmour Eden</p>
                  <p className="text-[11px] font-medium text-nesc-muted">
                    Polideportivo • Sáenz Peña y Sarmiento
                  </p>
                </div>
                <div className="h-12 w-11 shrink-0 rounded-lg bg-white p-1.5 shadow">
                  <NescLogo className="h-full w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}