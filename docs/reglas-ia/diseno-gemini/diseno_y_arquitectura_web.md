# Diseño y arquitectura web — Nueva Era Sporting Club

> Documento de referencia para la Home institucional. Describe el estado actual de la
> implementación visual y no reemplaza las reglas generales de [docs/](../../).

## 1. Estado y objetivo

La implementación actual es un prototipo visual responsive de la Home de Nueva Era
Sporting Club. Conserva la dirección visual Editorial Deportiva / Bento y permite validar
la navegación, la jerarquía de contenido y las interacciones principales antes de cargar
datos institucionales definitivos.

### Regla de contenido

Los precios, beneficios, horarios, direcciones, teléfonos, sponsors, noticias, historia,
fotos y enlaces institucionales deben ser validados por el club antes de publicarse.
Mientras no estén confirmados, deben mostrarse como placeholders explícitos y nunca como
datos reales o definitivos.

## 2. Stack y reglas

| Área | Decisión |
| --- | --- |
| Framework | Next.js 16.4 con App Router en `src/app/`. |
| UI | React 19.3 y Server Components por defecto. |
| Lenguaje | TypeScript strict, sin `any`. |
| Estilos | Tailwind CSS 4.3 y tokens en `src/app/globals.css`. |
| Tipografía | Montserrat mediante `next/font/google`. |
| Mobile-first | La Home se valida desde 360 px y luego en desktop. |
| Interactividad | Solo los componentes que manejan estado, modales o menú son Client Components. |
| Validación | `pnpm lint` y `pnpm build` antes de considerar terminado un cambio. |

No se deben crear clientes de Supabase en esta capa visual ni hardcodear nuevos datos
institucionales. La integración con contenido y configuración queda para la arquitectura
de features definida en la documentación general.

## 3. Estructura actual de carpetas

```text
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── (public)/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── loading.tsx
│       └── error.tsx
├── features/
│   └── content/
│       └── components/
│           ├── MembershipCardSelector.tsx
│           ├── NewsList.tsx
│           └── blocks/
│               ├── HeroBlock.tsx
│               ├── SponsorsBlock.tsx
│               ├── MembershipBlock.tsx
│               ├── NewsBlock.tsx
│               ├── RichTextBlock.tsx
│               ├── FeaturesBlock.tsx
│               └── CtaBlock.tsx
└── shared/
    └── ui/
        ├── Navbar.tsx
        ├── MobileMenu.tsx
        ├── Footer.tsx
        ├── NescLogo.tsx
        ├── NewsModal.tsx
        └── HistoryDisciplinesModal.tsx
```

La Home se compone en [src/app/(public)/page.tsx](../../../src/app/(public)/page.tsx) en
este orden:

1. `HeroBlock`
2. `SponsorsBlock`
3. `MembershipBlock`
4. `NewsBlock`

## 4. Identidad visual

### 4.0 Criterios de la skill `frontend-design`

La dirección visual debe seguir la skill `frontend-design` registrada para el proyecto.
Esto significa que cada decisión debe estar anclada en el sujeto real —un club deportivo
local con historia, identidad rojiblanca y vida comunitaria— y no en una plantilla SaaS
genérica.

- La identidad del club es el elemento distintivo: escudo, rojo institucional, blanco,
  marcos deportivos y referencias a instalaciones reales validadas.
- El hero debe comunicar primero qué es el club y cuál es la acción principal; no debe
  convertirse en una colección de tarjetas decorativas.
- La tipografía debe tener una jerarquía intencional: Montserrat es la familia oficial,
  con pesos y tamaños definidos por función, no por decoración.
- El layout Editorial Deportiva / Bento se usa para ordenar información del club, no para
  repetir tarjetas idénticas sin una relación semántica.
- Los bordes, numeraciones, etiquetas y divisores deben explicar jerarquía, secuencia o
  pertenencia. Si no comunican información, se eliminan.
- La interacción debe responder a acciones de la persona: abrir el menú, cambiar una
  categoría o leer una novedad. No agregar animaciones automáticas decorativas.
- El copy debe ser claro, breve y escrito desde la perspectiva de quien visita el sitio.
  Cada CTA debe describir la acción real que ejecuta.

Antes de sumar una sección o componente, revisar si la decisión es propia de Nueva Era
Sporting Club o si podría pertenecer indistintamente a cualquier landing generada.

### 4.1 Escudo

`NescLogo` admite dos variantes:

- `positive`: header y fondos claros; blanco, rojo y contorno negro.
- `negative`: footer y fondos oscuros; rojo, blanco y contorno claro.

### 4.2 Tokens

Los tokens viven en `src/app/globals.css` y deben reutilizarse en lugar de agregar colores
sueltos:

```css
@theme {
  --color-nesc-red: #E30613;
  --color-nesc-red-dark: #B0040E;
  --color-nesc-white: #FFFFFF;
  --color-nesc-black: #111111;
  --color-nesc-gray: #F4F4F6;
  --color-nesc-gray-mid: #4B5563;
  --color-nesc-border: #E5E7EB;
  --color-nesc-muted: #374151;
}
```

La composición usa rojo y blanco como colores dominantes, negro para contraste y gris
para superficies secundarias. El marco rojo inclinado del hero es el gesto visual
principal; el resto de la interfaz debe mantenerse sobrio para no competir con él.
No usar degradados decorativos ni fotos de stock como si fueran del club.

## 5. Componentes y comportamiento

### Navbar y navegación

`Navbar` es un Server Component y `MobileMenu` es un Client Component.

- Desktop: header sticky con logo, `Sponsors`, `Asociate`, `Novedades` y `Nuestra Historia`.
- Mobile: botón hamburguesa con las mismas etiquetas y destinos que desktop.
- El menú se despliega debajo del header, ocupa todo el ancho y permite scroll interno en
  pantallas bajas.
- El título de marca se mantiene compacto y sin saltos incómodos en mobile.
- El CTA principal es `Hacete Socio`.
- El botón de contacto muestra `WhatsApp`; el número definitivo debe venir de configuración
  validada.

### Hero

`HeroBlock` usa una composición de una columna en mobile y dos columnas en desktop:

- Identificador institucional superior.
- Título principal y bajada.
- CTA `Quiero Asociarme`.
- Modal `Historia y Disciplinas`.
- Tres métricas rápidas.
- Área reservada para la imagen principal y su identificación.

Las métricas, fechas, nombres de espacios y textos históricos son contenido pendiente de
validación.

### Sponsors

`SponsorsBlock` mantiene una grilla compacta de sponsors principales y secundarios.
Los nombres, logos y enlace de contacto deben ser reemplazables sin modificar el layout.

### Membresía

`MembershipBlock` contiene:

- Información resumida en tres tarjetas.
- `MembershipCardSelector` como Client Component.
- Selector interactivo de tres categorías.
- Credencial visual roja.
- Beneficios dinámicos.
- Botón visible `Solicitar Alta`, cuyo destino es el canal de WhatsApp configurado.

Los precios, categorías, beneficios, requisitos, medios de pago y horarios son datos
pendientes de validación.

### Novedades

`NewsBlock` contiene una noticia destacada y dos secundarias en desktop; en mobile se
apilan. `NewsList` abre `NewsModal` sin abandonar la página.

- Las imágenes deben ser fotos reales del club o placeholders claramente identificados.
- No usar URLs de stock para representar noticias reales.
- Las fechas, títulos, categorías y cuerpos deben provenir de contenido validado.
- El enlace externo se muestra como `Instagram` en mobile y con texto ampliado en desktop.

### Footer

`Footer` usa fondo negro, borde superior rojo y tres columnas en desktop:

1. Identidad y reseña institucional.
2. Espacios e instalaciones.
3. Contacto directo con botones `WhatsApp` e `Instagram`.

Todos los datos de contacto, direcciones, lema, historia y año deben validarse antes de
publicarse.

### Modales

- `NewsModal`: lectura completa de una novedad.
- `HistoryDisciplinesModal`: pestañas de historia y disciplinas.

Ambos se renderizan mediante portal y deben conservar cierre por botón, fondo y navegación
usable con teclado.

## 6. Responsive y accesibilidad

- Validar como mínimo en 360 px y desktop.
- No permitir scroll horizontal.
- Mantener áreas táctiles de al menos 44 × 44 px.
- Mostrar foco visible en links, botones y controles.
- Usar labels y nombres accesibles en controles iconográficos.
- Mantener la navegación mobile idéntica a la desktop.
- Verificar contraste AA en texto, botones y estados de foco.

## 7. Fuera de alcance de esta referencia

Todavía no forman parte de esta implementación visual:

- Páginas `/la-disciplina`, `/socios` y `/contacto`.
- Panel `/admin`.
- Autenticación, roles y sesiones.
- Lectura desde Supabase.
- Edición, borradores y publicación de contenido.
- Gestión de imágenes.
- Tests automatizados.

Cuando estas piezas se implementen, esta referencia debe actualizarse para documentar sus
componentes reales sin inventar una estructura paralela.
