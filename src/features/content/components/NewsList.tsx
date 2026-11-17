"use client";

import { useState } from "react";
import { NewsModal } from "@/shared/ui/NewsModal";

type NewsItem = {
  id: number;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  body: string;
  image: string;
};

const NEWS: NewsItem[] = [
  {
    id: 1,
    category: "FÚTBOL",
    date: "14 Nov 2026",
    title: "¡Ganó el Tren Rojo! Gran triunfo de local en el Cecilio Gilmour Eden",
    excerpt:
      "Con un gran marco de público en el Polideportivo, Primera y Reserva sumaron puntos clave defendiendo nuestros colores.",
    body: "Una tarde inolvidable se vivió en el Estadio Cecilio Gilmour Eden. Con el aliento constante de la familia de Nueva Era, nuestros planteles superiores lograron una victoria fundamental en la liga regional. Agradecemos a todos los socios y simpatizantes que colmaron las tribunas.",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    category: "HOCKEY",
    date: "10 Nov 2026",
    title: "Finde a puro hockey: encuentro regional de categorías formativas",
    excerpt:
      "Nuestras jugadoras recibieron a clubes de la zona en una jornada llena de deporte, amistad y valores.",
    body: "Las categorías formativas e infantiles de Hockey sobre Césped fueron anfitrionas de un gran encuentro regional en el Polideportivo de Sáenz Peña y Sarmiento. Desde 1989, el hockey sigue creciendo y formando deportistas con orgullo rojiblanco.",
    image:
      "https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    category: "EVENTOS",
    date: "02 Nov 2026",
    title: "Fiesta de la Comida al Disco de Arado: ¡Reservá tu tarjeta!",
    excerpt:
      "Llega una nueva edición de nuestro clásico encuentro gastronómico y cultural en la Sede Social.",
    body: "Te esperamos en el salón de fiestas de Dorrego y Urquiza para compartir una noche tradicional en comunidad, con música en vivo, presentación del taller de Tango y Folklore y las mejores recetas al disco. Pedí tu tarjeta en Secretaría.",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
  },
];

export function NewsList() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const active = NEWS.find((n) => n.id === activeId) ?? null;

  const [featured, ...secondary] = NEWS;

  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <article className="flex flex-col justify-between overflow-hidden rounded-2xl border border-nesc-border bg-nesc-white shadow-sm transition-shadow hover:shadow-md lg:col-span-7">
          <div>
            <div className="relative flex aspect-[16/10] items-center justify-center bg-nesc-gray">
              <span className="text-sm font-medium text-nesc-muted">Imagen de noticia (pendiente)</span>
              <span className="absolute left-4 top-4 rounded bg-nesc-red px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white">
                {featured.category} • Destacada
              </span>
            </div>
            <div className="p-6">
              <span className="text-xs font-bold uppercase text-nesc-muted">{featured.date}</span>
              <h3 className="mb-2.5 mt-1.5 text-xl font-black leading-snug text-nesc-black sm:text-2xl">
                {featured.title}
              </h3>
              <p className="text-sm leading-relaxed text-nesc-muted">{featured.excerpt}</p>
            </div>
          </div>
          <div className="px-6 pb-6">
            <button
              type="button"
              onClick={() => setActiveId(featured.id)}
              className="inline-flex cursor-pointer items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-nesc-red transition-colors hover:text-nesc-red-dark"
            >
              <span>Leer nota completa</span>
              <span>→</span>
            </button>
          </div>
        </article>

        <div className="flex flex-col gap-6 lg:col-span-5">
          {secondary.map((item) => (
            <article
              key={item.id}
              className="flex flex-1 flex-col justify-between overflow-hidden rounded-2xl border border-nesc-border bg-nesc-white shadow-sm transition-shadow hover:shadow-md sm:flex-row lg:flex-col"
            >
              <div className="relative flex aspect-video items-center justify-center bg-nesc-gray sm:aspect-auto sm:w-2/5 lg:aspect-[16/8] lg:w-full">
                <span className="text-xs font-medium text-nesc-muted">Imagen (pendiente)</span>
                <span className="absolute left-3 top-3 rounded bg-nesc-red px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                  {item.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <span className="text-[11px] font-bold uppercase text-nesc-muted">{item.date}</span>
                  <h3 className="mb-2 mt-1 line-clamp-2 text-base font-extrabold leading-snug text-nesc-black">
                    {item.title}
                  </h3>
                  <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-nesc-muted">
                    {item.excerpt}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className="inline-flex cursor-pointer items-center gap-1.5 self-start text-xs font-extrabold uppercase tracking-wide text-nesc-red transition-colors hover:text-nesc-red-dark"
                >
                  <span>Leer más</span>
                  <span>→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <NewsModal
        open={active !== null}
        onClose={() => setActiveId(null)}
        title={active?.title ?? ""}
        body={active?.body ?? ""}
        category={active?.category ?? ""}
        date={active?.date}
      />
    </>
  );
}