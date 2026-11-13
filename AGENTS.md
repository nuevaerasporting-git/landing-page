<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Estándares del proyecto — Sitio institucional Silcom

> Este archivo es el contrato para cualquier persona o agente que trabaje en el repo.
> Si hay conflicto entre las reglas globales y este archivo, gana este archivo.

## Contexto del proyecto

Sitio web dinámico para un club de práctica de disciplina deportiva en María Teresa, Santa Fe. Incluye sitio público, panel de administración, manual de uso y, a futuro, catálogo de productos.

**Documentación autoritativa** (leer antes de escribir código):

1. `docs/README.md` — visión general, reglas de oro y Definition of Done.
2. `docs/reglas-ia/01-diseno.md` — reglas de diseño.
3. `docs/reglas-ia/02-programacion.md` — reglas de código.
4. `docs/reglas-ia/03-testeo.md` — reglas de testeo.
5. `docs/arquitectura/rutas.md` — URLs, route groups y features.
6. `docs/arquitectura/base-de-datos.md` — tablas, RLS, storage y contenido.
7. `docs/producto/epicas.md` — alcance del producto.
8. `docs/producto/tareas-epica-1.md` — tareas de fundaciones.

Si la tarea no está en la documentación, no se inventa: se pregunta.

## General

- Preferir soluciones simples y mantenibles.
- Evitar el overengineering.
- Explicar las decisiones arquitectónicas cuando afecten la escalabilidad.
- Pensar siempre mobile-first.
- No inventar contenido institucional, datos de contacto, precios ni beneficios del club.

## Stack

- Next.js 16.4 — App Router.
- React 19.3.
- TypeScript en modo strict.
- Tailwind CSS 4.3.
- Supabase para base de datos (PostgreSQL) y storage de imágenes.
- **Autenticación propia**, implementada en el proyecto. **No se usa Supabase Auth.**
- **Cliente de Supabase:** `@supabase/supabase-js`, solo en el servidor. No se usa `@supabase/ssr` ni cliente de navegador.
- **Sin ORM.** No se usa TypeORM, Prisma ni SQL suelto en el runtime de la app. Las migraciones son SQL versionado.
- pnpm 11 como gestor de paquetes.

## Next.js 16

- La fuente de verdad es la documentación local en `node_modules/next/dist/docs/`. No confiar en APIs recordadas de versiones anteriores.
- **No hay proxy de sesión en v1.** La sesión se valida en el servidor contra la cookie propia `silcom_session` y la tabla `sessions`. Si en el futuro se necesita un proxy, la regla de Next.js 16 aplica: el archivo es `src/proxy.ts` (no `middleware.ts`) y exporta `proxy()`. No es parte de v1.
- `params`, `searchParams`, `cookies()` y `headers()` son asíncronos: siempre `await`.
- Server Components por defecto. Usar componentes cliente solo cuando haya interacción real.
- `app/` compone rutas y layouts. La lógica de negocio vive en `src/features/`.
- Las Server Actions verifican sesión, rol y validación de datos, aunque el layout ya lo haya hecho.
- Para autorizar usar `requireSession()` / `requireRole()` en el servidor. **No existen `getUser()` ni `getSession()`**: no hay Supabase Auth.
- Cada route group define `loading.tsx` y `error.tsx` cuando consulta datos.
- No duplicar lógica entre `app/` y `features/`.

## Package manager

- Usar **pnpm** para todo: `pnpm install`, `pnpm add <pkg>`, `pnpm remove <pkg>`, `pnpm run <script>`.
- No usar `npm`, `yarn` ni `bun`.
- Preferir `pnpm dlx` en lugar de `npx`.
- Respetar el lockfile existente.

## Supabase

- **Todos los clientes son solo de servidor.** La app no usa el cliente de Supabase en el navegador.
- Solo `src/shared/supabase/` puede instanciar clientes. Las features los consumen, no los crean.
- **`src/shared/supabase/public.ts`:** cliente de servidor con `SUPABASE_URL` + `SUPABASE_PUBLISHABLE_KEY`. Lee vistas públicas y RLS.
- **`src/shared/supabase/admin.ts`:** cliente de servidor con `SUPABASE_URL` + `SUPABASE_SECRET_KEY`. Bypassea RLS y se usa **solo** después de `requireSession`/`requireRole` en la capa del panel.
- **No hay cliente de navegador, ni `createBrowserClient`, ni `@supabase/ssr`, ni flujo de cookies de Supabase.**
- **RLS activo en todas las tablas** y, además, se **revocan los grants directos** sobre las tablas base a `anon` y `authenticated`. Sin política, nadie lee ni escribe.
- Los roles (`admin`, `editor`) viven en la tabla `users`. **Nunca** usar `user_metadata` para autorizar.
- Las migraciones viven en `supabase/migrations/` y se versionan. No hacer cambios de esquema a mano en el dashboard.
- Regenerar `src/shared/types/database.types.ts` cuando cambia el esquema.
- El sitio público lee las vistas `published_content`, `public_site_settings` y `public_media`. Nunca `draft_content` ni columnas internas.
- Las vistas son `security definer` propiedad de `postgres`, con columnas seguras y filtros; **la vista es el límite de seguridad público**.
- La publicación de contenido se hace con la RPC atómica `publish_content_block(block_id uuid, actor_id uuid)`. Revocar ejecución de `public`/`anon`/`authenticated` y otorgar solo a `service_role`; el servidor verifica el rol antes de llamarla.
- La `secret key` / service role es **obligatoria en el servidor** para el panel y **nunca** se usa en el navegador. Sin prefijo `NEXT_PUBLIC_`.
- Toda validación se hace en el servidor. La validación del cliente es solo experiencia de usuario.
- **Storage:** bucket `media`, máximo 5 MB, solo JPEG, PNG, WebP y AVIF. **No SVG.** Las escrituras se hacen **solo desde el servidor** (Server Actions con service role). No hay políticas de storage para `authenticated`.

## Auth y sesiones

- **Autenticación propia.** No hay Supabase Auth, `auth.users`, `auth.uid()` ni `profiles`.
- Tablas: `users`, `sessions` y `login_attempts`.
- **Contraseñas:** hash bcrypt costo 12 (`bcryptjs`). Mínimo 12 caracteres y máximo 72 bytes (límite de bcrypt). Nunca texto plano, nunca en logs.
- **Token de sesión:** 32 bytes aleatorios en base64url. Se guarda **solo el SHA-256** en `sessions.token_hash`; se compara por hash.
- **Cookie:** `silcom_session`; `HttpOnly`; `Secure` en producción; `SameSite=Lax`; `Path=/`; `Max-Age=43200` (12 h).
- **Expiración absoluta de 12 h por defecto** (`AUTH_SESSION_HOURS`, entero 1–24) desde la creación. Sin refresco deslizante.
- **Rate limit de login:** 5 intentos fallidos por email + IP en 15 minutos. Mensaje de error genérico.
- **Logout:** borra la fila de `sessions` actual y limpia la cookie.
- **Sesiones múltiples:** una por dispositivo; el logout afecta solo a la sesión actual.
- **Roles:** `admin` y `editor`, verificados en el servidor. Un editor no ejecuta acciones de admin. La auditoría es solo `admin`.
- **Recuperación de contraseña:** manual/asistida por un admin en v1. Sin email, sin flujo de reset propio.
- **Autorización:** `requireSession()` / `requireRole()` en el layout del panel y en cada Server Action. Las rutas sin permiso responden 404.

## Arquitectura y organización

- Organización por **vertical slice**: `src/features/<feature>/`.
- **No se crea `backend/`**: en este proyecto el backend vive en `src/features/` y `src/shared/supabase/`.
- Capas dentro de una feature, solo cuando la lógica lo justifique:
  - `actions/` o `adapters/` — Server Actions y puntos de entrada.
  - `services/` o `use-cases/` — lógica de negocio.
  - `repositories/` — consultas a Supabase.
  - `components/` — UI de la feature.
  - `types/` — DTOs y formas de request/response.
- `src/shared/` solo para lo transversal: `supabase/`, `ui/`, `lib/` y `types/`.
- Features del proyecto: `auth`, `content`, `settings`, `media`, `audit`.
  - `auth` — login/logout, creación y validación de sesión, roles, hashing de contraseñas y rate limit. Expone `requireSession()` / `requireRole()` para el resto del panel.
- Arquitectura **monolito modular**. No proponer microservicios sin una necesidad clara de escala.

## Naming conventions

- Variables, funciones y hooks: `camelCase`.
- Componentes, clases, tipos, interfaces, enums y constructores: `PascalCase`.
- Constantes inmutables globales: `UPPER_SNAKE_CASE`.

## Folder naming

- Carpetas en `kebab-case` por defecto.
- Excepción mínima: carpetas que contengan únicamente un componente con su co-locación pueden usar `PascalCase`.

## Functions & components

- Componentes de React: siempre function declarations.
- Funciones reutilizables top-level: preferir function declarations.
- Arrow functions: solo para callbacks, closures o funciones inline dentro de un scope definido.

## File size & extraction

- **Máximo 300 líneas por archivo.** Rango saludable: 200–300.
- Si el comportamiento es complejo, delegar a hooks, utils, services, helpers o subcomponentes dentro de la feature.
- Un archivo de más de 300 líneas debe refactorizarse.

## Types & mappers

- Los tipos y DTOs viven en `src/features/<feature>/types/`.
- Los tipos de la base se generan en `src/shared/types/database.types.ts`. No escribirlos a mano.
- Los mappers viven junto a los types y convierten filas de Supabase en DTOs.
- No exponer filas con columnas internas (`draft_content`, `updated_by`) fuera de la capa de datos.
- No retornar datos crudos desde Server Actions o Route Handlers: usar un mapper.
- Crear tipos globales solo si son realmente transversales.

## TypeScript

- Strict mode.
- Evitar `any`.
- Preferir tipos explícitos.
- Preferir interfaces para modelos de dominio.

## UI design

- Mobile-first.
- Estética institucional, moderna y cercana. No es una marca de lujo ni una app de gaming.
- Espaciado consistente con los tokens del sistema de diseño.
- Formularios accesibles: labels visibles, errores claros y foco visible.
- Layouts responsive.
- Cumplir WCAG AA: contraste, foco, navegación por teclado y áreas táctiles de 44×44 px.
- Seguir la dirección visual de `docs/reglas-ia/01-diseno.md`. No inventar colores, tipografías ni componentes fuera del sistema.

## Seguridad

- RLS en todas las tablas y verificación de rol en el servidor.
- **La service key / secret key es solo de servidor** (obligatoria para el panel). Nunca exponerla en el cliente ni con prefijo `NEXT_PUBLIC_`.
- Nunca exponer claves, tokens ni cadenas de conexión. El token de sesión se guarda solo como hash.
- No loguear contraseñas ni datos personales de socios.
- Validar archivos subidos y limitar tamaño y tipo.
- Las rutas del panel responden 404, no 403, a usuarios sin permiso.
- Sanitizar el parámetro `next` del login (solo rutas internas) para evitar open redirect.

## Testing

- Seguir `docs/reglas-ia/03-testeo.md`.
- El humano define los casos; la IA ayuda a escribirlos.
- Testear comportamiento, no implementación.
- Los flujos críticos del panel (login, edición, publicación, permisos) llevan tests de integración o E2E.
- Los tests de auth deben cubrir: verificación de contraseña, hash del token, expiración de sesión, rate limit y chequeo de roles.
- Todavía no hay framework de tests configurado. Antes de agregar tests, definir y documentar la herramienta.

## Code quality

- Preferir legibilidad antes que cleverness.
- Evitar abstracciones innecesarias.
- Generar código listo para producción.
- No dejar código muerto, comentado ni "por si acaso".

### Collocated documentation (selective)

Los módulos complejos llevan su propia carpeta con un `.md` que documenta el código. Los archivos de código quedan sin comentarios.

**Aplica (usar carpeta + `.md`):**

- Componentes con lógica de negocio, máquinas de estado o efectos no obvios.
- Hooks con comportamiento no obvio.
- Lógica de dominio, casos de uso y services.

**No aplica (un solo archivo, sin carpeta):**

- Componentes presentacionales (Button, Badge, Spinner).
- Types, interfaces, constantes y barrel exports.
- Utilidades puras con nombres claros.
- Archivos de configuración simples.

**Reglas de comentarios:**

- Sin JSDoc ni bloques que expliquen "qué". Eso va en el `.md` o en nombres claros.
- Solo comentarios cortos de "por qué": workarounds, performance, lógica no obvia que sería peligroso perder.
- Si hace falta un comentario para entender una función, renombrar la función.

## Idioma

- Documentación, textos del sitio y copy de UI: español (es-AR).
- Código, identificadores, nombres de archivos y commits: inglés.
- Commits convencionales (`feat:`, `fix:`, `docs:`, `chore:`). Sin atribución a IA ni `Co-Authored-By`.

## Flujo de trabajo

- Una tarea por PR. Si supera las 400 líneas, se divide.
- Leer el diff completo antes de aprobar.
- `pnpm lint` y `pnpm build` deben pasar.
- Actualizar la documentación o el manual si el cambio lo requiere.
- No commitear secretos, datos reales de socios ni `.env.local`.

## Comandos

```bash
pnpm install
pnpm dev
pnpm lint
pnpm build
pnpm start
```

```bash
cp .env.example .env.local
pnpm dlx supabase db push
pnpm dlx supabase gen types typescript --project-id <ref> > src/shared/types/database.types.ts
```

Si el CLI queda instalado como dependencia de desarrollo, usar el script del repo (`pnpm db:push`, `pnpm db:types`).

Para sembrar el primer administrador se inserta un `password_hash` bcrypt válido (nunca texto plano). El script de seed/hash queda **a definir en la Épica 7**; no inventar una ruta de script que todavía no existe.

## Definition of Done

- [ ] Cumple el criterio de aceptación de la tarea.
- [ ] `pnpm lint` y `pnpm build` sin errores.
- [ ] Tests cuando agrega lógica o toca flujos críticos.
- [ ] Funciona en mobile (360 px) y desktop.
- [ ] Accesibilidad básica verificada.
- [ ] Sin secretos ni datos sensibles.
- [ ] Otra persona revisó el diff y lo entiende.
- [ ] Documentación actualizada si corresponde.
