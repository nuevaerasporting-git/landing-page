import Link from "next/link";
import { NescLogo } from "./NescLogo";
import { HistoryDisciplinesModal } from "./HistoryDisciplinesModal";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  return (
    <header className="relative sticky top-0 z-40 border-b border-nesc-border bg-nesc-gray">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6">
        <Link href="#" className="group flex shrink-0 items-center gap-2 focus:outline-none sm:gap-3">
          <NescLogo variant="positive" className="h-8 w-8 shrink-0 transition-transform duration-200 group-hover:scale-105 sm:h-10 sm:w-10" />
          <div className="whitespace-nowrap leading-none">
            <span className="block text-[13px] font-black uppercase tracking-tight text-nesc-black sm:text-lg">
              Nueva Era
            </span>
            <span className="block text-[9px] font-bold uppercase tracking-[0.12em] text-nesc-red sm:text-xs sm:tracking-widest">
              Sporting Club
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-bold text-nesc-black md:flex">
          <a href="#sponsors" className="transition-colors hover:text-nesc-red">
            Sponsors
          </a>
          <a href="#asociate" className="transition-colors hover:text-nesc-red">
            Asociate
          </a>
          <a href="#novedades" className="transition-colors hover:text-nesc-red">
            Novedades
          </a>
          <HistoryDisciplinesModal
            defaultTab="historia"
            triggerLabel="Nuestra Historia"
            triggerClassName="cursor-pointer transition-colors hover:text-nesc-red"
          />
        </nav>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <a
            href="https://wa.me/5493462000000?text=Hola%20Secretar%C3%ADa%20NESC!%20Quisiera%20hacer%20una%20consulta."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp a Secretaría"
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md border border-nesc-border px-3 text-xs font-bold uppercase tracking-wide text-nesc-black transition-colors hover:border-nesc-black hover:bg-nesc-white sm:h-11 sm:px-4 sm:text-sm"
          >
            <svg className="h-4 w-4 shrink-0 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.031 2C6.508 2 2.023 6.485 2.023 12.008c0 1.766.461 3.49 1.337 5.01L2 22l5.118-1.342a9.96 9.96 0 0 0 4.913 1.292h.004c5.522 0 10.008-4.486 10.008-10.008A9.943 9.943 0 0 0 19.11 4.93 9.944 9.944 0 0 0 12.031 2zm5.825 14.316c-.246.693-1.434 1.326-1.988 1.409-.513.077-1.163.109-1.878-.118-.434-.138-.99-.322-1.703-.63-2.996-1.293-4.953-4.312-5.103-4.512-.15-.2-1.219-1.622-1.219-3.094 0-1.472.771-2.196 1.045-2.495.274-.299.598-.374.797-.374.199 0 .399.002.573.01.184.009.43-.07.673.514.249.599.847 2.071.922 2.221.075.15.125.324.025.524-.1.2-.15.324-.299.499-.15.175-.314.39-.449.524-.15.149-.306.311-.131.611.174.299.775 1.279 1.664 2.071 1.143 1.019 2.106 1.335 2.405 1.485.299.15.474.125.648-.075.175-.2.748-.873.947-1.172.2-.299.399-.249.673-.15.274.1.498.224.573.349.075.125.075.723-.171 1.416z" />
            </svg>
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <a
            href="#asociate"
            className="inline-flex h-10 items-center justify-center rounded-md bg-nesc-red px-3.5 text-xs font-extrabold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-nesc-red-dark sm:h-11 sm:px-5 sm:text-sm"
          >
            Hacete Socio
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}