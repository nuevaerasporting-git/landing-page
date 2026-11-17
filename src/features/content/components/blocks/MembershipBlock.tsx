import { MembershipCardSelector } from "../MembershipCardSelector";

export function MembershipBlock() {
  return (
    <section id="asociate" className="border-b border-nesc-border bg-nesc-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-nesc-red">
              Membresía Oficial
            </span>
            <h2 className="mt-1 mb-4 text-3xl font-black uppercase tracking-tight text-nesc-black sm:text-4xl">
              Sacá tu Carnet de Socio
            </h2>
            <p className="mb-6 text-sm font-medium leading-relaxed text-nesc-muted sm:text-base">
              Ser socio de Nueva Era te da acceso al Polideportivo, beneficios en el
              Natatorio durante el verano y respaldo a todas nuestras categorías
              formativas.
            </p>

            <div className="space-y-3.5">
              <div className="flex items-start gap-3.5 rounded-xl border border-nesc-border bg-nesc-gray p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-nesc-red text-sm font-black text-white">
                  01
                </div>
                <div>
                  <h3 className="text-xs font-extrabold uppercase text-nesc-black">
                    Dónde y Cuándo Asociarse
                  </h3>
                  <p className="mt-1 text-xs font-medium leading-relaxed text-nesc-muted">
                    En nuestra <strong className="text-nesc-black">Sede Social (Dorrego y Urquiza)</strong>{" "}
                    de Lunes a Viernes de 16:30 a 20:30 hs, o iniciando el trámite online por
                    WhatsApp.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-xl border border-nesc-border bg-nesc-gray p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-nesc-black text-sm font-black text-white">
                  02
                </div>
                <div>
                  <h3 className="text-xs font-extrabold uppercase text-nesc-black">
                    Requisitos Mínimos
                  </h3>
                  <p className="mt-1 text-xs font-medium leading-relaxed text-nesc-muted">
                    Presentar DNI, teléfono de contacto y foto para la credencial. Para Grupo
                    Familiar, acreditar vínculo directo.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-xl border border-nesc-border bg-nesc-gray p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-nesc-red text-sm font-black text-white">
                  03
                </div>
                <div>
                  <h3 className="text-xs font-extrabold uppercase text-nesc-black">
                    Medios de Pago Flexibles
                  </h3>
                  <p className="mt-1 text-xs font-medium leading-relaxed text-nesc-muted">
                    Transferencia bancaria, débito automático, cobrador a domicilio en María
                    Teresa o efectivo en Secretaría.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <MembershipCardSelector />
          </div>
        </div>
      </div>
    </section>
  );
}