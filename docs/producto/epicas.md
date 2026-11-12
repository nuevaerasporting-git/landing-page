# Épicas del proyecto — Sitio institucional Silcom

> Versión 0.1 — borrador para revisión del equipo.
> Una épica es un objetivo grande y verificable. No es una tarea ni una fecha.

## Cómo leer este documento

Cada épica tiene objetivo, alcance, fuera de alcance, historias sugeridas, criterios de aceptación y riesgos.

- **Prioridad:** Must (sin esto no hay producto), Should (importante, puede esperar un poco), Could (futuro).
- **Tamaño:** S / M / L, relativo al esfuerzo. No son días ni fechas.
- **Dependencias:** qué tiene que estar resuelto antes.

## Roadmap sugerido

| # | Épica | Prioridad | Depende de | Tamaño |
| --- | --- | --- | --- | --- |
| 1 | Fundaciones técnicas y deploy | Must | — | M |
| 2 | Identidad visual y sistema de diseño | Must | 1 (parcial) | M |
| 3 | Home institucional | Must | 2 | M |
| 4 | La disciplina: cómo practicar | Must | 2 | S |
| 5 | Socios y beneficios | Must | 2 | S |
| 6 | Contacto, ubicación y navegación | Must | 2 | S |
| 7 | Acceso y seguridad del panel | Must | 1 | L |
| 8 | Configuración del sitio | Must | 7 | S |
| 9 | Gestión de contenido y publicación | Must | 7 | L |
| 10 | Gestión de imágenes | Should | 7, 9 | M |
| 11 | Manual del panel y capacitación | Must | 7–10 | M |
| 12 | Calidad, accesibilidad y lanzamiento | Must | 3–11 | M |
| 13 | Catálogo de productos | Could | 9, 10 | L |

**Camino crítico:** 1 → 7 → 9 → 11 → 12. El sitio público (3–6) puede avanzar en paralelo al panel.

**Arquitectura ya definida:** Next.js 16 + Supabase (base, auth y storage). Ver [rutas](../arquitectura/rutas.md) y [base de datos](../arquitectura/base-de-datos.md).

> Hasta que exista el panel, los cambios de contenido se hacen por código. El sitio público puede publicarse antes; el panel es lo que lo vuelve autónomo para el club.

---

## Épica 1 — Fundaciones técnicas y deploy

**Prioridad:** Must · **Depende de:** — · **Tamaño:** M

**Objetivo:** tener un proyecto reproducible, con entornos separados y deploy automático.

**Alcance:** repositorio y ramas; lint y build en CI; `.env.example` y variables de entorno; proyecto de Supabase con Auth, base y bucket `media`; migraciones iniciales; clientes de Supabase (`browser`, `server`, `proxy.ts`); deploy con HTTPS y previews por PR; dominio y DNS.

**Fuera de alcance:** diseño visual, contenido y funcionalidades.

**Historias sugeridas:** configurar CI; documentar variables de entorno; provisionar base y storage; configurar deploy y previews.

**Criterios de aceptación:**
- [ ] `pnpm install`, `pnpm lint` y `pnpm build` funcionan desde cero.
- [ ] Cada PR genera una preview accesible.
- [ ] Las variables de entorno están documentadas y no hay secretos en el repo.
- [ ] Las migraciones iniciales de Supabase están versionadas y aplicadas.
- [ ] Producción responde por HTTPS en el dominio definido.

**Riesgos:** decidir hosting tarde; el dominio anterior puede no estar disponible; costos de Supabase.

---

## Épica 2 — Identidad visual y sistema de diseño

**Prioridad:** Must · **Depende de:** 1 (parcial) · **Tamaño:** M

**Objetivo:** definir una dirección visual propia del club y las piezas base para construir pantallas.

**Alcance:** tono visual; paleta y tipografía; tokens de color, espaciado, radios y sombras; componentes base (header, footer, botón, card, formulario, alerta); guía de uso.

**Fuera de alcance:** pantallas completas y contenido final.

**Historias sugeridas:** definir dirección visual; implementar tokens; construir componentes base; documentar la guía de uso.

**Criterios de aceptación:**
- [ ] Los tokens viven en un solo lugar y no hay valores sueltos en las pantallas.
- [ ] Los componentes base cubren estados hover, focus, disabled y error.
- [ ] La guía de uso explica cuándo usar cada componente.
- [ ] Contraste AA y foco visible verificados.

**Riesgos:** no tener logo ni fotos reales; elegir una estética genérica que no represente al club.

---

## Épica 3 — Home institucional

**Prioridad:** Must · **Depende de:** 2 · **Tamaño:** M

**Objetivo:** que un visitante entienda en segundos qué ofrece el club y cuál es el siguiente paso.

**Alcance:** hero con mensaje principal; qué es la disciplina; beneficios para socios; llamada a la acción por WhatsApp; navegación principal; footer.

**Fuera de alcance:** catálogo de productos y novedades.

**Historias sugeridas:** armar el hero; bloque de presentación; bloque de beneficios; CTA de WhatsApp; footer.

**Criterios de aceptación:**
- [ ] El mensaje principal se entiende sin contexto previo.
- [ ] Hay un solo CTA principal por pantalla.
- [ ] Funciona en 360 px y en desktop.
- [ ] El CTA de WhatsApp abre el número correcto configurado.

**Riesgos:** contenido institucional sin aprobar; fotos de baja calidad.

---

## Épica 4 — La disciplina: cómo practicar

**Prioridad:** Must · **Depende de:** 2 · **Tamaño:** S

**Objetivo:** explicar la actividad y cómo empezar, sin dar por sabido nada.

**Alcance:** qué es la práctica; cómo iniciarse; requisitos; medidas de seguridad; preguntas frecuentes.

**Fuera de alcance:** reglamentos internos completos y trámites legales.

**Historias sugeridas:** redactar y validar contenido; maquetar la sección; agregar FAQ; enlazar al contacto.

**Criterios de aceptación:**
- [ ] Una persona que nunca practicó entiende cómo empezar.
- [ ] Todo dato (requisitos, horarios, seguridad) está validado por el club.
- [ ] Hay un camino claro al contacto por WhatsApp.

**Riesgos:** información incompleta o desactualizada.

---

## Épica 5 — Socios y beneficios

**Prioridad:** Must · **Depende de:** 2 · **Tamaño:** S

**Objetivo:** comunicar los beneficios de asociarse y facilitar el alta por WhatsApp.

**Alcance:** beneficios y descuentos; requisitos; pasos para asociarse; preguntas frecuentes; CTA de WhatsApp.

**Fuera de alcance:** cobro de cuotas, gestión de socios y pagos online.

**Historias sugeridas:** redactar beneficios; maquetar pasos de alta; CTA de WhatsApp; FAQ.

**Criterios de aceptación:**
- [ ] Los beneficios y descuentos son los aprobados por el club, sin inventos.
- [ ] Los pasos para asociarse se entienden sin ayuda.
- [ ] El CTA abre WhatsApp con un mensaje inicial útil.

**Riesgos:** que los beneficios cambien seguido y no haya panel todavía para actualizarlos.

---

## Épica 6 — Contacto, ubicación y navegación

**Prioridad:** Must · **Depende de:** 2 · **Tamaño:** S

**Objetivo:** que cualquier visitante encuentre cómo llegar y cómo contactar.

**Alcance:** datos de contacto; ubicación y mapa; horarios; WhatsApp; header y footer compartidos; página 404.

**Fuera de alcance:** formulario de contacto con envío de emails.

**Historias sugeridas:** armar la página de contacto; integrar mapa; unificar header/footer; crear 404.

**Criterios de aceptación:**
- [ ] Dirección, horarios y teléfono coinciden con los datos validados.
- [ ] El mapa carga sin bloquear la página.
- [ ] La navegación funciona con teclado y en mobile.
- [ ] La 404 ofrece volver al inicio.

**Riesgos:** datos de contacto desactualizados; dependencia de un servicio de mapas.

---

## Épica 7 — Acceso y seguridad del panel

**Prioridad:** Must · **Depende de:** 1 · **Tamaño:** L

**Objetivo:** que solo las personas autorizadas administren el sitio, y que el acceso sea seguro.

**Alcance:** login y logout con Supabase Auth; refresco de sesión en `src/proxy.ts`; roles `admin` y `editor` en `profiles`; protección de rutas del lado del servidor; rate limit en login; registro mínimo de acciones en `audit_log`.

**Fuera de alcance:** login social, doble factor y autogestión de usuarios por parte del club.

**Historias sugeridas:** integrar librería de auth; modelar roles; proteger rutas; limitar intentos de login; probar permisos.

**Criterios de aceptación:**
- [ ] Sin sesión válida no se accede a ninguna ruta del panel, verificado en el servidor.
- [ ] Las contraseñas se almacenan hasheadas.
- [ ] Un editor no puede ejecutar acciones de administrador.
- [ ] Los intentos fallidos de login están limitados.
- [ ] Los permisos tienen tests de integración.

**Riesgos:** implementar auth casera; permisos solo en el cliente; complejidad innecesaria para pocos usuarios.

---

## Épica 8 — Configuración del sitio

**Prioridad:** Must · **Depende de:** 7 · **Tamaño:** S

**Objetivo:** cambiar datos globales sin tocar código.

**Alcance:** fila única de `site_settings`: número de WhatsApp, horarios, dirección, redes sociales, textos legales y metadatos SEO por defecto.

**Fuera de alcance:** editar estructura o diseño del sitio.

**Historias sugeridas:** modelar la configuración; pantalla de edición; validación server-side; reflejar cambios en el sitio público.

**Criterios de aceptación:**
- [ ] Un cambio guardado se refleja en el sitio público sin deploy.
- [ ] Los datos inválidos se rechazan en el servidor con mensajes claros.
- [ ] Solo usuarios con permiso pueden modificar la configuración.

**Riesgos:** que la configuración se convierta en un cajón de valores sin control.

---

## Épica 9 — Gestión de contenido y publicación

**Prioridad:** Must · **Depende de:** 7 · **Tamaño:** L

**Objetivo:** que el club edite el contenido del sitio sin depender de un programador.

**Alcance:** edición de `content_blocks` (home, disciplina, socios, contacto); borrador en `draft_content` y publicación en `content`; previsualización; orden de elementos; historial en `content_revisions`.

**Fuera de alcance:** constructor libre de páginas y edición de estructura.

**Historias sugeridas:** modelar contenido; listado y edición; borrador y publicación; previsualización; historial.

**Criterios de aceptación:**
- [ ] Editar → previsualizar → publicar funciona de punta a punta.
- [ ] El contenido en borrador no es visible en el sitio público.
- [ ] Los cambios quedan registrados con autor y fecha.
- [ ] Un editor solo modifica lo que le corresponde.
- [ ] El flujo crítico tiene test E2E.

**Riesgos:** intentar un CMS demasiado flexible; bloques que no cubren el contenido real.

---

## Épica 10 — Gestión de imágenes

**Prioridad:** Should · **Depende de:** 7, 9 · **Tamaño:** M

**Objetivo:** subir y reemplazar imágenes de forma segura y ordenada.

**Alcance:** subida validada por tipo y tamaño al bucket `media` de Supabase Storage; optimización; texto alternativo; metadata en la tabla `media`; reemplazo y borrado.

**Fuera de alcance:** edición de imágenes dentro del panel y galerías avanzadas.

**Historias sugeridas:** configurar storage; subida validada; selector de imagen; alt text obligatorio; reemplazo.

**Criterios de aceptación:**
- [ ] Se rechazan archivos inválidos o demasiado grandes.
- [ ] No se permite subir archivos ejecutables.
- [ ] Las imágenes se sirven optimizadas y con alt text.
- [ ] Reemplazar una imagen no rompe el contenido publicado.

**Riesgos:** costos de storage; imágenes pesadas que afectan la performance.

---

## Épica 11 — Manual del panel y capacitación

**Prioridad:** Must · **Depende de:** 7–10 · **Tamaño:** M

**Objetivo:** que una persona del club use el panel sin asistencia técnica.

**Alcance:** manual paso a paso con capturas; tareas frecuentes; preguntas frecuentes; guion de capacitación; checklist de verificación.

**Fuera de alcance:** documentación técnica interna.

**Historias sugeridas:** escribir el manual; capturar pantallas; grabar una capacitación corta; validar con una persona real.

**Criterios de aceptación:**
- [ ] Una persona no técnica completa las tareas clave sin ayuda: login, editar texto, cambiar imagen, publicar y revertir.
- [ ] El manual está en español y sin jerga técnica.
- [ ] Cada tarea tiene pasos numerados y resultado esperado.

**Riesgos:** documentar una interfaz que todavía cambia; manual desactualizado al mes.

---

## Épica 12 — Calidad, accesibilidad y lanzamiento

**Prioridad:** Must · **Depende de:** 3–11 · **Tamaño:** M

**Objetivo:** salir a producción sin deuda crítica y con una forma de detectar problemas.

**Alcance:** suite de tests; auditoría de accesibilidad; SEO; performance; dominio y DNS; backups; monitoreo básico; plan de rollback.

**Fuera de alcance:** analítica avanzada y marketing.

**Historias sugeridas:** configurar tests; auditar accesibilidad; revisar SEO y performance; configurar dominio; documentar rollback; monitoreo.

**Criterios de aceptación:**
- [ ] Los flujos E2E críticos pasan en CI.
- [ ] Sin problemas críticos de accesibilidad.
- [ ] El sitio es usable en mobile con buena performance.
- [ ] Dominio con HTTPS y backup probado.
- [ ] Existe un plan de rollback documentado.

**Riesgos:** lanzar sin backups; dejar el dominio para el final.

---

## Épica 13 — Catálogo de productos (futuro)

**Prioridad:** Could · **Depende de:** 9, 10 · **Tamaño:** L

**Objetivo:** mostrar productos del club cuando se decida venderlos o exhibirlos.

**Alcance:** catálogo y fichas de producto; consulta por WhatsApp; administración desde el panel.

**Fuera de alcance:** carrito, pagos online y gestión de stock (salvo decisión explícita).

**Historias sugeridas:** modelar productos; listado y ficha; administración; CTA de consulta.

**Criterios de aceptación:**
- [ ] Productos y fichas se editan desde el panel.
- [ ] Cada producto permite consultar por WhatsApp.
- [ ] No se muestran precios ni stock inventados.

**Riesgos:** convertir el sitio en un e-commerce sin haberlo decidido.

---

## Explícitamente fuera de alcance (v1)

- Gestión de socios, cuotas y pagos.
- Reservas de turnos o clases.
- E-commerce con pago online.
- Multi-idioma.
- App móvil.
- Login social o doble factor.

## Preguntas abiertas para el club

1. ¿Existe logo y fotos reales? ¿Quién las aporta?
2. ¿Cuáles son los beneficios y descuentos exactos?
3. ¿Horarios, dirección y teléfono definitivos?
4. ¿Quiénes van a administrar el panel y con qué roles?
5. ¿Quieren publicar novedades o eventos?
6. ¿Cuándo entra el catálogo de productos?
7. ¿Se recupera el dominio anterior? ¿Quién lo gestiona?
8. ¿Hay presupuesto para Supabase y hosting?
