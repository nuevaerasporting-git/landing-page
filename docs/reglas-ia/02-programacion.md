# Reglas de programación con IA

> Versión 0.1 — borrador para revisión del equipo.
> Aplica a todo cambio de código: sitio público, panel de administración, scripts y configuración.

## 1. Contrato del proyecto

Antes de escribir código, la IA **debe leer**:

1. `AGENTS.md` del repositorio (reglas del proyecto).
2. Este documento.
3. La documentación local de Next.js en `node_modules/next/dist/docs/`.
4. [Estructura de rutas](../arquitectura/rutas.md) y [base de datos](../arquitectura/base-de-datos.md), si la tarea toca pantallas o datos.

> **Importante:** el proyecto usa Next.js 16.4. La documentación que la IA "recuerda" de entrenamiento puede estar desactualizada y romper el build. La fuente de verdad es la documentación instalada en `node_modules/next/dist/docs/`.

Stack actual:

| Pieza | Versión / regla |
| --- | --- |
| Next.js | 16.4 — App Router |
| React | 19.3 |
| TypeScript | Strict, sin `any` |
| Tailwind CSS | 4.3 |
| Supabase | Base de datos, auth y storage, vía `@supabase/ssr` |
| Gestor de paquetes | `pnpm` (no usar npm, yarn ni bun) |
| Lint | ESLint 9 |

### Next.js 16: errores que la IA suele cometer

- Crear `middleware.ts`. **En Next.js 16 se llama `src/proxy.ts` y exporta `proxy()`.**
- Usar `params`, `searchParams`, `cookies()` o `headers()` de forma sincrónica. **Son asíncronos: siempre `await`.**
- Copiar código de Supabase para Next.js 15 con `middleware`. La lógica es la misma, el archivo y la función no.
- Confiar en `getSession()` para autorizar. **Usar `getUser()` en el servidor.**
- Crear un cliente de Supabase nuevo por cada componente cliente. El cliente de navegador es singleton.

## 2. Decisiones de arquitectura

Ya definidas:

- **Base de datos:** Supabase (PostgreSQL).
- **Autenticación:** Supabase Auth con email y contraseña. Roles en `profiles`.
- **Storage:** Supabase Storage, bucket `media`.
- **Acceso a datos:** cliente de Supabase con RLS. No se usa ORM en v1.
- **Permisos:** `admin` y `editor`, verificados en el servidor y en RLS.

Pendientes de definir antes de la épica correspondiente:

- Estrategia de deploy, dominio y entornos.
- ¿Un editor publica directo o requiere aprobación?
- Límites definitivos de imágenes.
- Herramientas de test (Vitest y Playwright como propuesta inicial).

Si una tarea depende de una decisión pendiente, se frena y se resuelve primero. La IA no elige por nosotros.

## 3. Reglas de código

- **Vertical slice:** organizar por funcionalidad (`features/<feature>/...`), no por tipo de archivo suelto.
- **Máximo 300 líneas por archivo.** Si se acerca al límite, extraer hooks, utilidades o subcomponentes.
- **Sin `any`.** Preferir tipos explícitos e interfaces para modelos de dominio.
- **Componentes de React:** function declarations. Arrow functions solo para callbacks.
- **Nombres:** `camelCase` para variables y funciones, `PascalCase` para componentes y tipos, `UPPER_SNAKE_CASE` para constantes globales.
- **Conexiones externas:** el cliente de navegador es Singleton. En el servidor, el cliente de Supabase se crea una vez por request con las cookies de esa request: no se comparte entre usuarios.
- **Datos de conexión:** siempre por variables de entorno. Nunca hardcodear.
- **Nunca exponer entidades de ORM fuera de la capa de persistencia.** Usar mappers y DTOs.
- **No agregar dependencias nuevas** sin justificar qué problema resuelve y por qué no alcanza con lo existente.
- **No dejar código muerto, comentado o "por si acaso".**

## 4. Cómo pedirle código a la IA

### Flujo obligatorio

1. **Plan primero.** Pedir qué archivos va a tocar, qué va a cambiar y qué riesgos ve. Aprobarlo antes de escribir.
2. **Un cambio acotado.** Una tarea por pedido. Nada de "aprovechá y refactorizá todo".
3. **Diff chico.** Si el pedido implica más de 400 líneas cambiadas, se divide en entregas.
4. **Explicación.** La IA debe poder explicar cada decisión. Si no se entiende, se pregunta o se descarta.

### Plantilla de pedido

```
Objetivo: [qué tiene que hacer el código]
Contexto: leer AGENTS.md, docs/reglas-ia/02-programacion.md y [archivos]
Restricciones: Next 16 App Router, TS strict, Tailwind, vertical slice, máx. 300 líneas
Alcance: [qué SÍ y qué NO entra en este cambio]
Criterio de aceptación: [cómo se verifica]
Validación: pnpm lint && pnpm build
```

### Ejemplo malo

> "Hacé el panel de administración completo."

Problema: sin alcance, sin modelo de datos, sin criterios. Resultado inrevisable.

### Ejemplo bueno

> "Implementá el listado de novedades del panel. Leé AGENTS.md y docs/reglas-ia/02-programacion.md. Alcance: ruta del panel que lista novedades con título, estado y fecha, usando el repositorio existente. No incluyas edición ni creación en este cambio. Criterio: la página muestra el estado vacío y los datos reales cuando existen; pasa lint y build."

## 5. Git y revisión

- **Ramas:** `feat/...`, `fix/...`, `docs/...`, `chore/...`.
- **Commits:** convencionales (`feat: ...`, `fix: ...`), en inglés, sin atribución a IA ni `Co-Authored-By`.
- **PRs chicos:** preferentemente menos de 400 líneas cambiadas. Si es más grande, se divide.
- **Un PR = una intención.** No mezclar refactor, feature y formato.
- **Revisión humana obligatoria.** Quien revisa debe leer el diff completo, no solo la descripción.
- **Nunca mergear** con lint o build roto.

## 6. Seguridad del panel (no negociable)

- Toda validación se hace **en el servidor**. La validación del cliente es solo experiencia de usuario.
- Autenticación con librería probada, sesiones seguras y contraseñas hasheadas.
- Cada ruta y acción del panel verifica permisos del lado del servidor.
- Nunca exponer claves, tokens ni cadenas de conexión en el cliente.
- No devolver entidades internas ni datos innecesarios en las respuestas.
- Proteger formularios públicos contra abuso (rate limit o captcha si aparece spam).
- Revisar dependencias nuevas antes de instalarlas.
- Los datos de socios son datos personales: mínimo acceso, mínimo dato, nunca en logs.

## 7. Errores típicos que hay que detectar

- Código que compila pero nadie entiende.
- Componentes de cientos de líneas con lógica de negocio y estilos mezclados.
- `useEffect` para resolver todo, incluso lo que se resuelve en el servidor.
- Fetch duplicados o llamadas desde el cliente a datos que deberían venir del servidor.
- `any` para "destrabar" TypeScript.
- Dependencias nuevas para problemas que ya resuelve el stack.
- Lógica de permisos solo en el cliente.
- Credenciales o datos reales en el repositorio.
- "Ya funciona en mi máquina" sin build limpio.

## 8. Definition of Done técnico

- [ ] Cumple el criterio de aceptación.
- [ ] `pnpm lint` sin errores.
- [ ] `pnpm build` sin errores.
- [ ] Tests agregados o actualizados cuando hay lógica o flujos críticos.
- [ ] Sin `any`, sin secretos, sin código muerto.
- [ ] Archivos por debajo de 300 líneas.
- [ ] Accesibilidad básica: labels, foco, contraste, teclado.
- [ ] Responsive verificado en mobile y desktop.
- [ ] Otra persona revisó el diff.

## 9. Comandos del proyecto

```bash
pnpm install     # instalar dependencias
pnpm dev         # entorno local
pnpm lint        # lint
pnpm build       # build de producción
pnpm start       # servir el build
```
