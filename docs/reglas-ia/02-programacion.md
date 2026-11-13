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
| Supabase | Base de datos y storage, vía `@supabase/supabase-js` (solo servidor) |
| Autenticación | Propia (tablas `users` y `sessions`), no Supabase Auth |
| Gestor de paquetes | `pnpm` (no usar npm, yarn ni bun) |
| Lint | ESLint 9 |

### Next.js 16: errores que la IA suele cometer

- Crear `middleware.ts`. **En Next.js 16 se llama `src/proxy.ts` y exporta `proxy()`.** Aclaración: en v1 **no hace falta proxy**; la sesión se valida en el servidor. Solo si alguna vez se agrega uno, aplicar esta regla de nombre.
- Usar `params`, `searchParams`, `cookies()` o `headers()` de forma sincrónica. **Son asíncronos: siempre `await`.**
- Copiar código de Supabase Auth para Next.js con `middleware` o `src/proxy.ts`. **En este proyecto no hay Supabase Auth ni refresco de sesión en proxy.**
- Usar `supabase.auth.getUser()` o `getSession()`. **No existen**: la sesión es propia y se valida contra la cookie `silcom_session`.
- Usar `auth.uid()`, `auth.users`, `profiles` o `handle_new_user`. **No existen**: la autenticación es propia.
- Crear un cliente de Supabase en el navegador. **Todos los clientes son solo de servidor.**
- Confiar en el cliente para autorizar. **Usar `requireSession()` / `requireRole()` en el servidor.**

## 2. Decisiones de arquitectura

Ya definidas:

- **Base de datos:** Supabase (PostgreSQL).
- **Autenticación:** propia, con tablas `users` y `sessions`. Roles `admin` y `editor` en `users`. No se usa Supabase Auth.
- **Sesión:** cookie `silcom_session` con expiración absoluta de 12 h.
- **Acceso a datos:** clientes de Supabase **solo de servidor** (`public` y `admin`). El cliente `admin` usa la service key y se usa solo tras las guardas del panel.
- **Storage:** Supabase Storage, bucket `media`; escrituras solo desde el servidor.
- **ORM y SQL:** sin ORM en v1. No se usa SQL suelto en el runtime salvo las RPC documentadas.
- **Permisos:** `admin` y `editor`, verificados en el servidor con `requireSession()` / `requireRole()`.

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
- **Clientes de Supabase:** solo de servidor. Los clientes `public` y `admin` son módulos sin estado de sesión, por lo que pueden compartirse como módulos (`src/shared/supabase/public.ts` y `src/shared/supabase/admin.ts`). **No hay cliente de navegador.**
- **Sesión:** propia, en la cookie `silcom_session` (`HttpOnly`, `SameSite=Lax`). La validación se hace en el servidor contra la tabla `sessions`.
- **La service key** es solo de servidor y se usa únicamente en el cliente `admin`, después de las guardas del panel.
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
- Cada ruta y acción del panel verifica permisos del lado del servidor con `requireSession()` / `requireRole()`.
- Nunca exponer claves, tokens ni cadenas de conexión en el cliente.
- No devolver entidades internas ni datos innecesarios en las respuestas.
- Proteger formularios públicos contra abuso (rate limit o captcha si aparece spam).
- Revisar dependencias nuevas antes de instalarlas.
- Los datos de socios son datos personales: mínimo acceso, mínimo dato, nunca en logs.

### 6.1 Autenticación y sesiones

- **Contraseñas:** hash bcrypt costo 12 (`bcryptjs`). Mínimo 12 caracteres y máximo 72 bytes (límite de bcrypt). Nunca texto plano, nunca en logs.
- **Token de sesión:** 32 bytes aleatorios base64url; guardar **solo el SHA-256** en `sessions.token_hash` y comparar por hash.
- **Cookie:** `silcom_session`, `HttpOnly`, `Secure` en producción, `SameSite=Lax`, `Path=/`, `Max-Age=43200` (12 h). Expiración absoluta, sin refresco.
- **Rate limit:** 5 intentos fallidos por email + IP en 15 minutos, con mensaje de error genérico.
- **Logout:** borrar la fila de sesión actual y limpiar la cookie.
- **CSRF:** las mutaciones se hacen con Server Actions y la cookie es `SameSite=Lax`; no exponer rutas de mutación por GET.
- **Open redirect:** sanitizar el parámetro `next` del login a una ruta interna.
- **Service key:** solo de servidor, obligatoria para el panel, nunca con prefijo `NEXT_PUBLIC_`.
- **Recuperación de contraseña:** manual/asistida por un admin en v1; sin flujo por email.

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
- [ ] Si toca auth: tests de login, expiración de sesión, logout, rate limit y roles.
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
