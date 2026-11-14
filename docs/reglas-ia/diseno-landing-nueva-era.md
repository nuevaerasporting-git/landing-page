# Documento de diseño — Landing institucional Nueva Era Sporting Club

**Versión:** 1.0 — propuesta para revisión humana  
**Destino:** implementación con OpenCode en la rama `gabi-landing-page`  
**Alcance:** página de inicio (`/`), no el panel administrativo ni la integración con bases de datos.  
**Estado:** dirección visual definida; datos institucionales sensibles a confirmación señalados con `PENDIENTE`.

## 1. Objetivo y contexto

Crear una landing institucional de **Nueva Era Sporting Club (NESC)**, de **María Teresa, Santa Fe, Argentina**, que comunique pertenencia, vida deportiva y comunitaria, permita descubrir sus actividades, facilite las consultas sobre asociación y muestre novedades y patrocinadores. Prioridad: una experiencia clara, emotiva, ligera, accesible y **corta de recorrer**.

**Públicos:** familias, deportistas, futuros socios, socios actuales y personas de la comunidad.  
**Tono:** cercano, institucional, optimista, auténtico; español argentino, sin exageraciones comerciales.  
**Objetivo principal de conversión:** consulta para asociarse a través de WhatsApp **solo cuando se confirme el número oficial**.

### Fuentes utilizadas y criterios

1. `MANUAL DE MARCA NESC - BORRADOR.pdf`: identidad, escudo, tipografía Montserrat, rojo y blanco dominantes; negro/gris complementarios. **Es un borrador: verificar aprobación final del escudo.**
2. `captura instagram club.jpeg`: referencia de comunicación visual real, publicaciones con fotografías deportivas, escudos, rojo/blanco/negro y variedad de actividades; no utilizar la captura como recurso gráfico de la web.
3. `Historia NESC.pdf`: historia, comunidad e instalaciones como base para los textos históricos; los hechos históricos no prueban por sí solos qué disciplinas siguen activas hoy.
4. `docs/reglas-ia/01-diseno.md` y `AGENTS.md` del repositorio: restricciones técnicas, accesibilidad, sistema de diseño, contenido verificado y estilo.

**Fecha fundacional confirmada por la responsable del proyecto:** **19 de enero de 1961**. El documento histórico y el Instagram coinciden con 1961. El borrador del manual de marca menciona 1960: ese dato debe corregirse en el manual para evitar inconsistencias. Para la landing, utilizar **1961** cuando se mencione la fundación.

## 2. Identidad visual y dirección creativa

**Concepto:** «El club que nos reúne». Combinar la energía del deporte con el orgullo de una institución de pueblo. Evitar una estética de e-sports, gaming, lujo o plantilla SaaS.

### Paleta propuesta

El manual determina **colores, no códigos HEX oficiales**. Estos valores son *tokens digitales propuestos*, sujetos a contraste y revisión con la identidad definitiva:

| Token | HEX propuesto | Aplicación |
|---|---|---|
| `brand-red` | `#E30613` | Botones primarios, acentos y titulares destacados; validar contra el escudo oficial |
| `brand-white` | `#FFFFFF` | Fondos, textos sobre superficies oscuras |
| `ink` | `#151515` | Titulares, footer y superficies oscuras |
| `surface` | `#F7F7F5` | Alternancia suave de secciones |
| `muted` | `#626262` | Texto secundario, con contraste verificado |
| `line` | `#DDDDDD` | Bordes y divisores discretos |

**Regla de jerarquía:** rojo y blanco protagonistas, negro/gris de soporte. No usar degradados violetas, neones ni efectos saturados. Evitar texto blanco pequeño sobre rojo si no alcanza WCAG AA; probar contraste de cada combinación.

### Tipografía

- **Montserrat** (establecida en el manual), preferentemente una sola familia en pesos 400, 500, 600, 700 y 800.
- Títulos contundentes y breves; párrafos cómodos de leer, interlineado generoso.
- No reproducir la rotulación del escudo con texto HTML: usar el logo autorizado como imagen.

### Escudo, iconos, fotos y estilo

- Usar el **escudo oficial aprobado**, sin redibujarlo ni deformarlo, cuando esté disponible como SVG/PNG autorizado. El manual muestra distintas aplicaciones y proporciones, pero es borrador.
- Fotografías **reales, autorizadas** del club; si faltan, mostrar bloques de imagen explícitamente rotulados «Imagen del club pendiente». No usar stock fingiendo pertenecer al club.
- Una sola familia de iconos, si son necesarios; no agregar librerías solo por decoración.
- Composición limpia, bloques bien espaciados, fotografía deportiva dinámica, bordes discretos, pocas sombras y nada de animaciones gratuitas.
- Espaciado consistente: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64` px; radios pequeños y coherentes.

## 3. Arquitectura de la landing (orden de lectura)

Mantener una página concisa. Las secciones de noticias y patrocinadores deben ser compactas; usar anclas desde el menú en vez de crear pantallas adicionales para esta entrega.

### A. Header / navegación

- Logo/escudo y nombre «Nueva Era Sporting Club».
- Anclas a `Actividades`, `Asociate`, `Novedades` y `Patrocinadores`.
- CTA destacado «Quiero asociarme» que lleve a la sección de asociación (hasta confirmar WhatsApp).
- Versión móvil: cabecera compacta y menú accesible, con foco visible y estados adecuados.
- Header no debe tapar contenido cuando se usan anclas.

### B. Hero (primer pantallazo)

**Objetivo:** que cualquier visitante entienda de qué se trata la institución y perciba cercanía.

- Imagen principal horizontal de deporte/comunidad **real del club** como fondo o panel lateral, con capa oscura para garantizar contraste. Si no hay fotografía autorizada, usar placeholder explícito con composición gráfica de color institucional.
- Sobretexto pequeño: «María Teresa · Santa Fe».
- Título propuesto: **«Mucho más que un club. Un lugar para encontrarnos.»** *(copy editorial propuesto, no lema oficial)*.
- Bajada propuesta: «Deporte, comunidad y momentos compartidos en Nueva Era Sporting Club.»
- CTA principal: **«Quiero asociarme»** (ancla a sección de asociación). Acción secundaria discreta: «Conocé las actividades».
- En móvil: título y CTA claramente visibles antes de una imagen excesivamente alta; sin vídeo automático.

### C. Actividades (franja breve de descubrimiento)

**Objetivo:** mostrar diversidad deportiva sin aumentar demasiado el scroll.

- Título: «Encontrá tu lugar en Nueva Era».
- Tarjetas visuales para **Fútbol, Hockey, Fútbol infantil y Tenis**; **Folklore** como actividad cultural si se confirma su vigencia. Estas categorías se ven en la captura de Instagram; confirmar la oferta actual antes de publicar.
- Tarjetas con imagen real o placeholder, nombre y acción simple «Consultar actividad»; no inventar horarios, edades ni inscripciones.
- Desktop: grilla compacta; móvil: grilla de 2 columnas si el contenido sigue siendo legible o carrusel accesible sin movimiento automático.
- **No presentar rugby, pádel u otras actividades históricas como actualmente disponibles** solo porque figuren en la historia institucional.

### D. Asociación, precios e información útil

**Objetivo:** resolver las dudas frecuentes de una persona que evalúa asociarse.

- Título: «Sé parte del club».
- Texto breve, cálido y verificable, sin prometer descuentos ni prestaciones no confirmadas.
- Bloques fáciles de escanear: «Cómo asociarte», «Cuotas y categorías», «Consultas».
- Para precios: **no inventar importes**. Mientras no se confirmen, mostrar «Consultá los valores y categorías de asociación» sin cifra.
- Datos necesarios para publicación: cuota actual, modalidades, requisitos, medios de pago y contacto oficial.
- CTA único claro «Consultar cómo asociarme»: llevar a WhatsApp solo cuando haya URL/número confirmado; mientras tanto, enlazar a la sección de contacto o mostrar un marcador de pendiente.
- Diseño: bloque claro con borde/acento rojo, no una tabla interminable.

### E. Noticias / actualidad

**Objetivo:** transmitir que el club está vivo y activo.

- Título: «Lo que pasa en el club».
- Hasta **3 tarjetas** en escritorio y 1–2 visibles en móvil, con imagen, categoría, título breve y fecha **solo si hay publicaciones verificadas**.
- Fuente inicial: noticias del club proporcionadas o aprobadas por el equipo. La captura de Instagram es una referencia visual y **no debe convertirse en noticias ficticias**.
- Sin noticias confirmadas: usar tarjetas claramente marcadas como contenido pendiente o una invitación a seguir el Instagram oficial una vez confirmada su URL.
- Evitar un feed automático o acceso a APIs en esta primera landing, salvo pedido expreso.

### F. Patrocinadores

**Objetivo:** agradecer y dar visibilidad a quienes acompañan al club.

- Título: «Quienes nos acompañan».
- Franja compacta de logotipos autorizados sobre fondo neutro, con tamaños visualmente equilibrados y sin alterar marcas.
- Si se desea un carrusel, permitir control manual y pausar cualquier desplazamiento; respetar `prefers-reduced-motion`. La opción más simple y accesible es una grilla o franja desplazable sin autoplay.
- **No inventar patrocinadores ni logotipos.** Si todavía no hay archivos oficiales, usar marcadores «Logo pendiente» sin nombres falsos.

### G. Footer / contacto

- Escudo/nombre, localidad «María Teresa, Santa Fe», enlaces de ancla, icono/enlace a Instagram **cuando se confirme la URL oficial** y canal de contacto **cuando se confirme**.
- Puede incluir **Polideportivo: Sáenz Peña y Sarmiento, María Teresa, Santa Fe**, según el manual de marca; validar vigencia antes de publicar.
- No mostrar teléfono, e-mail, enlace de WhatsApp ni redes inventadas.
- Copyright sin año de fundación hasta resolver contradicción; usar año corriente del sitio si hace falta.

## 4. Diseño responsive y accesibilidad

- **Mobile-first: 360 px** como ancho mínimo de referencia; verificar también 390 px, tablet 768 px y desktop 1280–1440 px.
- Sin desbordamiento horizontal; imágenes adaptativas, texto legible y botones cómodos.
- Área táctil objetivo mínima **44×44 px**.
- Un solo `h1`, encabezados jerárquicos (`h2` por sección), `alt` descriptivo para imágenes informativas, navegación de teclado completa.
- Contraste WCAG AA para texto y controles; foco visible; enlaces con nombres comprensibles.
- Respetar `prefers-reduced-motion`; no hacer depender la información del hover.
- Optimizar fotografías, usar `next/image` cuando corresponda y evitar recursos externos innecesarios.
- Rendimiento: hero ligero, carga diferida para imágenes secundarias, sin animaciones pesadas.

## 5. Reglas de implementación para el agente (OpenCode)

1. Trabajar **solo en la rama `gabi-landing-page`**. Comprobar rama antes de editar.
2. Revisar `AGENTS.md`, `docs/README.md`, `docs/reglas-ia/01-diseno.md`, `02-programacion.md`, `03-testeo.md`, `docs/arquitectura/rutas.md` y demás documentación pertinente **sin resumirla nuevamente**. Estas reglas del proyecto tienen prioridad sobre sugerencias de este documento si hay conflicto.
3. Usar stack existente: **Next.js 16.4.6 App Router, React 19.3, TypeScript strict, Tailwind CSS 4.3, pnpm 11**. Consultar documentación local de Next 16 antes de introducir APIs nuevas.
4. Respetar rutas definidas en la documentación: la home debe ubicarse donde indiquen los route groups (`src/app/(public)/page.tsx` si esa regla sigue vigente). No crear otras páginas sin necesidad.
5. Preferir Server Components; Client Components solo para menú o interacciones necesarias.
6. Crear tokens de diseño y componentes reutilizables siguiendo arquitectura del repositorio; no introducir backend, autenticación, migraciones, Supabase ni panel para esta entrega.
7. No inventar datos. Centralizar los contenidos pendientes en un lugar identificable y documentar qué falta para publicar.
8. No añadir dependencias sin justificación; usar componentes sencillos, archivos menores de 300 líneas y nombres convencionales.
9. No modificar archivos ajenos al alcance ni borrar trabajo existente.
10. Al finalizar ejecutar `pnpm lint` y `pnpm build`, informar errores y advertencias reales. Probar visualmente móvil y escritorio y revisar el diff antes de hacer commit.
11. No hacer `git push`, merges ni pull requests sin autorización expresa.

## 6. Datos / materiales pendientes de validación

**Bloqueantes para una publicación real (no para una maqueta con marcadores explícitos):**

- [x] **Año de fundación confirmado: 1961** (19 de enero). Pendiente de corregir el borrador del manual de marca, que dice 1960.
- [ ] Confirmar escudo definitivo y entregar archivo digital autorizado.
- [ ] Confirmar paleta HEX definitiva o aprobar tokens propuestos.
- [ ] Entregar imágenes reales con permiso de uso para hero y actividades.
- [ ] Confirmar disciplinas efectivamente activas.
- [ ] Confirmar cuotas, categorías de asociación, requisitos y beneficios.
- [ ] Confirmar número/enlace oficial de WhatsApp y URL de Instagram.
- [ ] Entregar 1–3 noticias actuales con título, fecha, imagen y texto aprobado.
- [ ] Entregar marcas/logos autorizados de patrocinadores.
- [ ] Validar dirección de contacto y el alcance exacto de esta entrega con el equipo.

## 7. Criterios de aceptación de esta entrega

- [ ] Landing `/` implementada en la rama propia y ejecutable con `pnpm dev`.
- [ ] Identidad visual coherente con rojo/blanco, Montserrat y escudo autorizado o placeholder rotulado.
- [ ] Hero, actividades, asociación, noticias, patrocinadores y footer presentes, compactos y navegables.
- [ ] No hay precios, contactos, noticias, marcas ni fechas fundacionales inventadas.
- [ ] Diseño usable a 360 px y 1440 px, sin desbordamientos y con buena legibilidad.
- [ ] Interacciones accesibles con teclado; buen contraste y foco.
- [ ] `pnpm lint` y `pnpm build` finalizan sin errores.
- [ ] Diff revisado, sin secretos, cambios ajenos ni dependencias innecesarias.
- [ ] Listado breve de contenido pendiente antes de una publicación real.

## 8. Prompt breve sugerido para una nueva sesión de OpenCode

> Estamos en la rama `gabi-landing-page`. Implementá **solo la landing institucional `/`** de Nueva Era Sporting Club siguiendo este documento de diseño y las instrucciones `AGENTS.md`/`docs/` del repositorio. Primero indicá, en máximo 8 líneas, qué archivos pensás crear o modificar y cualquier conflicto real con las reglas. No inventes información institucional; usá placeholders etiquetados cuando falten datos. No incorpores Supabase ni funciones de panel. Mantené el alcance acotado y componentes reutilizables. Al finalizar ejecutá `pnpm lint` y `pnpm build`, informá resultados y no hagas push ni commit sin mi autorización.

---

**Nota de revisión:** los títulos, textos promocionales, tokens HEX y composición son propuestas de diseño, no afirmaciones oficiales del club. Se deberán aprobar antes de publicar.
