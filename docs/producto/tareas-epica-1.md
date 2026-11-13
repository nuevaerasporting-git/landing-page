# Tareas — Épica 1: Fundaciones técnicas y deploy

> Versión 1.0 — documento de ejemplo para planificar el resto de las épicas.
> Una tarea = un PR chico y revisable. Si el diff supera las 400 líneas, se divide antes de pedir review.
> Este documento no reemplaza a [epicas.md](./epicas.md): lo baja a trabajo ejecutable.

## 1. Cómo usar este documento

Este archivo es el **modelo de planificación** para las demás épicas. Cada tarea debe poder asignarse, implementarse, revisarse y cerrarse sin preguntas abiertas.

**Reglas del documento:**

- Una tarea tiene un solo objetivo y un solo PR.
- Los IDs (`T1.1`, `T1.2`, ...) son estables: no se renumeran.
- Si una tarea no tiene criterios de aceptación observables, no está lista.
- Si depende de una decisión pendiente, se marca `Bloqueada` y no se empieza.
- Los enlaces a documentación son parte del contexto obligatorio, no decoración.

**Anatomía de una tarea:**

| Campo | Para qué sirve |
| --- | --- |
| Objetivo | Resultado observable en una frase. |
| Contexto | Documentos y archivos que hay que leer antes de tocar código. |
| Pasos | Orden de implementación; no es una lista de deseos. |
| Criterios de aceptación | Qué tiene que ser verdad para cerrar. |
| Validación | Comandos o pruebas que lo demuestran. |
| Fuera de alcance | Qué **no** se hace en este PR. |
| Evidencia | Qué se adjunta al PR para que otro lo revise. |

**Estados:** `Pendiente`, `En curso`, `En revisión`, `Hecha`, `Bloqueada`.

**Para reutilizarlo en otra épica:**

1. Copiar la estructura de las secciones 1 a 4.
2. Cambiar IDs, dependencias, ramas y criterios por los de la épica nueva.
3. Mantener una tarea por PR y los mismos campos.
4. No copiar decisiones ni tareas de la Épica 1.

## 2. Decisiones bloqueantes

Se resuelven antes de empezar. Sin esto, las tareas quedan trabadas.

| # | Decisión | Recomendación | Bloquea | Estado | Responsable |
| --- | --- | --- | --- | --- | --- |
| D1 | Proyectos de Supabase: uno de desarrollo y uno de producción, con dueño claro. | Dos proyectos separados. El equipo trabaja contra desarrollo; producción solo recibe migraciones. | T1.1 en adelante | Pendiente | Por asignar |
| D2 | Hosting y deploy. | Vercel por integración con Next.js y previews por PR. | T1.10 | Pendiente | Por asignar |
| D3 | Dominio: recuperar el anterior o comprar uno nuevo. | Resolver antes del lanzamiento; no bloquea el desarrollo. | T1.10 | Pendiente | Por asignar |
| D4 | CLI de Supabase y flujo de migraciones. | CLI como dependencia de desarrollo, `supabase link` y `db push`. Stack local opcional. | T1.3 | Pendiente | Por asignar |

> **Autenticación propia confirmada.** La Épica 1 crea el esquema base (`users` y `sessions`) y el entorno (incluida la service key solo de servidor), pero **el flujo de autenticación (login, sesión de 12 h, guards, rate limit) se implementa en la Épica 7**. No se usa Supabase Auth. La service key es obligatoria en el servidor para el panel y nunca se expone al cliente.

## 3. Orden y dependencias

| # | Tarea | Depende de | Tamaño | PR | Rama sugerida | Estado |
| --- | --- | --- | --- | --- | --- | --- |
| T1.1 | Configurar proyectos de Supabase y credenciales | D1 | S | — (manual) | — | Pendiente |
| T1.2 | Instalar y configurar clientes de Supabase | T1.1 | M | PR 1 | `feat/e1-supabase-clients` | Pendiente |
| T1.3 | Migración inicial: enums, tablas, índices y triggers | T1.1, D4 | M | PR 2 | `feat/e1-initial-migration` | Pendiente |
| T1.4 | RLS y vistas públicas | T1.3 | M | PR 3 | `feat/e1-rls-public-views` | Pendiente |
| T1.5 | RPC de publicación y auditoría | T1.4 | S | PR 4 | `feat/e1-publish-rpc` | Pendiente |
| T1.6 | Bucket `media` y acceso a storage | T1.4 | S | PR 5 | `feat/e1-media-bucket` | Pendiente |
| T1.7 | Seed inicial de configuración y bloques | T1.4 | S | PR 6 | `feat/e1-seed` | Pendiente |
| T1.8 | Generar tipos y clientes tipados | T1.3 | S | PR 7 | `feat/e1-db-types` | Pendiente |
| T1.9 | CI: lint y build en cada PR | T1.2 | S | PR 8 | `ci/e1-lint-build` | Pendiente |
| T1.10 | Deploy, previews y dominio | T1.9, D2, D3 | M | PR 9 | `chore/e1-deploy` | Pendiente |
| T1.11 | Documentar puesta en marcha y validar desde cero | T1.1–T1.10 | S | PR 10 | `docs/e1-setup` | Pendiente |

## 4. Tareas

### T1.1 — Configurar proyectos de Supabase y credenciales

**Depende de:** D1 · **Tamaño:** S · **PR:** — (manual) · **Estado:** Pendiente

**Objetivo:** tener los proyectos de Supabase listos y las variables de entorno cargadas localmente.

**Contexto:** [.env.example](../../.env.example), [README](../README.md), [base de datos](../arquitectura/base-de-datos.md) (§5.9).

**Pasos:**
1. Crear proyecto de desarrollo y proyecto de producción (o el esquema que se decida en D1).
2. Guardar URL, publishable key y **secret key** de cada uno en un canal privado.
3. Copiar `.env.example` a `.env.local` y completar con el proyecto de desarrollo: `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`, `NEXT_PUBLIC_SITE_URL` y `AUTH_SESSION_HOURS=12`.
4. Verificar que `.env.local` está ignorado y que `.env.example` no tiene claves reales.
5. Definir quién es dueño de la organización y quién tiene acceso.

**Criterios de aceptación:**
- [ ] `pnpm dev` inicia con las variables cargadas.
- [ ] `.env.local` no aparece en `git status`.
- [ ] Las claves reales no están en el repo ni en la documentación.
- [ ] `SUPABASE_SECRET_KEY` está cargada solo en el servidor y es requerida para el panel; nunca se prefija con `NEXT_PUBLIC_`.
- [ ] El equipo sabe qué proyecto es desarrollo y cuál producción.

**Validación:** `git check-ignore .env.local`, `git status`, `pnpm dev`.

**Fuera de alcance:** crear tablas, clientes, auth o código de aplicación.

**Evidencia para el PR:** captura de los nombres de las variables (sin valores) y nota de dueño/accesos.

---

### T1.2 — Instalar y configurar los clientes de Supabase (solo servidor)

**Depende de:** T1.1 · **Tamaño:** M · **PR:** 1 · **Rama:** `feat/e1-supabase-clients` · **Estado:** Pendiente

**Objetivo:** dejar dos clientes de Supabase de servidor, uno público y uno administrativo, sin cliente de navegador ni flujo de cookies de Supabase.

**Contexto:** [AGENTS.md](../../AGENTS.md) (Supabase), [rutas](../arquitectura/rutas.md) (§5), [base de datos](../arquitectura/base-de-datos.md) (§6–§7).

**Pasos:**
1. Instalar `@supabase/supabase-js` con pnpm. **No instalar `@supabase/ssr`**.
2. Crear `src/shared/supabase/public.ts` (solo servidor) con `SUPABASE_URL` + `SUPABASE_PUBLISHABLE_KEY` para lecturas públicas.
3. Crear `src/shared/supabase/admin.ts` (solo servidor) con `SUPABASE_URL` + `SUPABASE_SECRET_KEY`, usado solo tras las guardas del panel.
4. **No crear cliente de navegador, ni `src/proxy.ts`, ni `src/shared/supabase/browser.ts`/`server.ts`.**
5. Verificar que ambos clientes solo se importen desde código de servidor y que la secret key nunca llegue al cliente.
6. No implementar auth en esta tarea: `requireSession()` / `requireRole()` se agregan en la Épica 7.

**Criterios de aceptación:**
- [ ] `pnpm lint` y `pnpm build` pasan.
- [ ] Existen `src/shared/supabase/public.ts` y `src/shared/supabase/admin.ts`, ambos solo de servidor.
- [ ] No existe cliente de navegador ni `@supabase/ssr`.
- [ ] `src/proxy.ts` **no** forma parte de esta tarea.
- [ ] La `secret key` no aparece en ningún archivo del cliente ni con prefijo `NEXT_PUBLIC_`.

**Validación:** `pnpm lint && pnpm build`; buscar imports y la secret key en `src/`.

**Fuera de alcance:** auth, guards, proxy, consultas de features, UI.

**Evidencia para el PR:** archivos creados, salida de lint/build y resultado de la búsqueda de la secret key.

---

### T1.3 — Migración inicial: enums, tablas, índices y triggers

**Depende de:** T1.1, D4 · **Tamaño:** M · **PR:** 2 · **Rama:** `feat/e1-initial-migration` · **Estado:** Pendiente

**Objetivo:** crear el esquema descrito en [base de datos](../arquitectura/base-de-datos.md), incluidas las tablas de autenticación propia.

**Contexto:** [base de datos](../arquitectura/base-de-datos.md) (§4–§5, §11).

**Pasos:**
1. Inicializar Supabase en el repo y crear la primera migración.
2. Crear enums `user_role` y `content_status`.
3. Crear tablas `users`, `sessions`, `login_attempts`, `site_settings`, `content_blocks`, `content_revisions`, `media` y `audit_log`. **No crear `profiles` ni nada sobre `auth.users`.**
4. Agregar constraints, claves foráneas e índices:
   - `users`: unique index `(lower(email))`; `password_hash`, `role` e `is_active` con `not null` y defaults según el esquema.
   - `sessions`: unique `(token_hash)`, índice `(user_id)`, `expires_at not null`.
   - `login_attempts`: índices `(email, ip, created_at desc)` y `(created_at desc)`.
   - `site_settings`: `check (id = 1)`.
   - `content_blocks`: unique `(key)`, índice `(page, sort_order)`, checks de `page` y `block_type`.
   - `content_revisions`: índice `(block_id, created_at desc)`.
   - `audit_log`: índices `(created_at desc)` y `(actor_id)`.
5. Crear `set_updated_at()` y sus triggers (`users`, `site_settings`, `content_blocks`).
6. Aplicar la migración al proyecto de desarrollo.

**Criterios de aceptación:**
- [ ] La migración se aplica desde cero sin errores.
- [ ] El esquema coincide con el documento de base de datos.
- [ ] `users` incluye `password_hash`; `sessions` incluye `token_hash` y `expires_at`.
- [ ] Las tablas tienen los índices y constraints definidos.
- [ ] No existe `profiles`, `handle_new_user()` ni ninguna referencia a `auth.users`.
- [ ] No hay cambios hechos a mano fuera de la migración.

**Validación:** `pnpm dlx supabase db push` en desarrollo; revisar tablas, índices y triggers en el esquema.

**Fuera de alcance:** RLS, vistas públicas, RPC, storage, seed.

**Evidencia para el PR:** nombre de la migración, listado de tablas/índices/triggers y salida de `supabase db diff`.

---

### T1.4 — RLS y vistas públicas

**Depende de:** T1.3 · **Tamaño:** M · **PR:** 3 · **Rama:** `feat/e1-rls-public-views` · **Estado:** Pendiente

**Objetivo:** que el público lea solo vistas seguras y que el acceso a tablas base quede cerrado.

**Contexto:** [base de datos](../arquitectura/base-de-datos.md) (§6–§7), [AGENTS.md](../../AGENTS.md) (Supabase).

**Pasos:**
1. Activar RLS en todas las tablas.
2. **Revocar** los grants directos de `select/insert/update/delete` sobre las tablas base a `anon` y `authenticated`.
3. **No crear `current_user_role()`** ni helpers basados en `auth.uid()`: no hay Supabase Auth.
4. Crear las vistas `published_content`, `public_site_settings` y `public_media` como `security definer` propiedad de `postgres`, con columnas seguras y filtros.
5. Otorgar `select` a `anon` **solo sobre las vistas**.
6. Probar con la clave pública: lectura de vistas OK, acceso directo a tablas denegado. El service role bypassa RLS y se reserva para el servidor del panel.

**Criterios de aceptación:**
- [ ] `anon` solo lee contenido publicado, configuración pública y metadata pública de imágenes, y solo a través de vistas.
- [ ] El acceso directo a las tablas base con la clave pública es rechazado.
- [ ] Un usuario sin sesión no lee borradores ni auditoría.
- [ ] Las vistas no exponen columnas internas (`updated_by`, `size_bytes`, `bucket`, etc.).
- [ ] No hay tablas sin RLS.

**Validación:** consultas con la clave pública (vistas OK, tablas denegadas). El chequeo de roles se prueba en la Épica 7.

**Fuera de alcance:** RPC de publicación, storage, seed, auth.

**Evidencia para el PR:** resultado de las consultas permitidas/denegadas y listado de grants.

---

### T1.5 — RPC de publicación y auditoría

**Depende de:** T1.4 · **Tamaño:** S · **PR:** 4 · **Rama:** `feat/e1-publish-rpc` · **Estado:** Pendiente

**Objetivo:** publicar un bloque de forma atómica y dejar registro.

**Contexto:** [base de datos](../arquitectura/base-de-datos.md) (§11), [AGENTS.md](../../AGENTS.md) (Supabase).

**Pasos:**
1. Crear `publish_content_block(block_id uuid, actor_id uuid)` como `security definer` con `search_path = ''`.
2. Validar que el actor sea un usuario activo con rol `admin` o `editor`, que el bloque exista y que tenga `draft_content`.
3. Copiar `draft_content` a `content`, limpiar el borrador, marcar `published` y `published_at`.
4. Insertar la revisión en `content_revisions` y la acción `content.publish` en `audit_log`.
5. **Revocar ejecución** de `public`, `anon` y `authenticated`; **otorgar solo a `service_role`**. El servidor vuelve a verificar el rol antes de llamar a la RPC.

**Criterios de aceptación:**
- [ ] Publicar deja el bloque visible en `published_content`.
- [ ] Si falla un paso, no queda estado a medias.
- [ ] La RPC valida que `actor_id` sea `admin` o `editor` activo.
- [ ] `anon` y `authenticated` no pueden ejecutar la RPC; solo `service_role`.
- [ ] Se crea una revisión y una entrada de auditoría por publicación.

**Validación:** llamada a la RPC como `service_role` con una `actor_id` válida e inválida; revisión de las tres tablas.

**Fuera de alcance:** UI de publicación, flujo de auth, edición de contenido.

**Evidencia para el PR:** definición de la función, grants y filas creadas en `content_blocks`, `content_revisions` y `audit_log`.

---

### T1.6 — Bucket `media` y acceso a storage

**Depende de:** T1.4 · **Tamaño:** S · **PR:** 5 · **Rama:** `feat/e1-media-bucket` · **Estado:** Pendiente

**Objetivo:** permitir la subida de imágenes de forma segura, solo desde el servidor.

**Contexto:** [base de datos](../arquitectura/base-de-datos.md) (§8), [AGENTS.md](../../AGENTS.md) (Storage).

**Pasos:**
1. Crear el bucket `media` con lectura pública.
2. Configurar límite de 5 MB y tipos permitidos: JPEG, PNG, WebP, AVIF. Sin SVG.
3. **No crear políticas de storage para `authenticated`**: no hay usuarios de Supabase Auth. Las escrituras se hacen solo desde el servidor con la service key (Server Actions, Épica 10).
4. Versionar la creación/configuración del bucket en una migración SQL sobre `storage.buckets` o en `supabase/config.toml`, según lo que soporte la versión del CLI; **no dejarla solo en el dashboard**.
5. Verificar que `anon` no puede escribir.
6. Documentar la convención de rutas `AAAA/MM/nombre.ext`.

**Criterios de aceptación:**
- [ ] `anon` puede leer pero no subir.
- [ ] Las escrituras están restringidas al servidor (service role); no hay políticas de escritura para usuarios de Supabase Auth.
- [ ] Se rechazan tipos no permitidos y archivos mayores a 5 MB.
- [ ] El bucket y su configuración están versionados, no solo configurados a mano.

**Validación:** subida desde el servidor con service role (válida) y sin service role (rechazada); probar archivo inválido y archivo de más de 5 MB.

**Fuera de alcance:** UI de subida, optimización de imágenes, edición de `alt_text`.

**Evidencia para el PR:** configuración versionada, resultados de subida válida y rechazos.

---

### T1.7 — Seed inicial de configuración y bloques

**Depende de:** T1.4 · **Tamaño:** S · **PR:** 6 · **Rama:** `feat/e1-seed` · **Estado:** Pendiente

**Objetivo:** que el sitio tenga datos iniciales y bloques para editar.

**Contexto:** [base de datos](../arquitectura/base-de-datos.md) (§9–§10), [epicas.md](./epicas.md).

**Pasos:**
1. Crear la fila única de `site_settings` con datos validados por el club; si falta un dato, usar un placeholder explícito y no inventarlo.
2. Cargar los 13 bloques del catálogo, todos en `draft`.
3. Versionar el seed en `supabase/seed.sql`.
4. Aplicarlo en desarrollo.
5. El primer administrador se crea en la Épica 7, cuando exista `bcryptjs` y el script de hash; no sembrar contraseñas en texto plano.

**Criterios de aceptación:**
- [ ] Existe una sola fila en `site_settings`.
- [ ] Los bloques existen con la key, página y tipo correctos.
- [ ] Ningún bloque aparece publicado todavía.
- [ ] El seed no contiene contraseñas ni hashes inventados; el primer admin queda para la Épica 7.

**Validación:** consultas a `site_settings` y `content_blocks` (conteos y estados).

**Fuera de alcance:** publicar contenido, crear el primer admin, contenido final del club.

**Evidencia para el PR:** salida de las consultas de conteo y estado.

---

### T1.8 — Generar tipos y clientes tipados

**Depende de:** T1.3 · **Tamaño:** S · **PR:** 7 · **Rama:** `feat/e1-db-types` · **Estado:** Pendiente

**Objetivo:** que los clientes de Supabase tengan tipos reales y no se use `any`.

**Contexto:** [base de datos](../arquitectura/base-de-datos.md) (§12), [AGENTS.md](../../AGENTS.md) (Types).

**Pasos:**
1. Agregar el CLI de Supabase como dependencia de desarrollo.
2. Generar `src/shared/types/database.types.ts` desde el esquema real.
3. Tipar los clientes `public` y `admin` con `Database` (no existen clientes de navegador ni de servidor con cookies).
4. Agregar scripts `db:types`, `db:push` y `db:reset` si aplica.
5. Documentar el comando en la puesta en marcha.

**Criterios de aceptación:**
- [ ] Los tipos se generan desde el esquema real.
- [ ] Los clientes están tipados y compilan sin `any`.
- [ ] Existe un comando documentado para regenerar tipos.
- [ ] `pnpm lint` y `pnpm build` pasan.

**Validación:** `pnpm db:types`, `pnpm lint`, `pnpm build`.

**Fuera de alcance:** ORM, tipos escritos a mano, cambios de esquema.

**Evidencia para el PR:** archivo generado, scripts y salida de lint/build.

---

### T1.9 — CI: lint y build en cada PR

**Depende de:** T1.2 · **Tamaño:** S · **PR:** 8 · **Rama:** `ci/e1-lint-build` · **Estado:** Pendiente

**Objetivo:** que ningún PR roto llegue a main.

**Contexto:** [AGENTS.md](../../AGENTS.md) (Comandos, Definition of Done).

**Pasos:**
1. Crear workflow de GitHub Actions para `pull_request` y `push` a main.
2. Configurar pnpm con la versión del repo.
3. Ejecutar `pnpm install --frozen-lockfile`, `pnpm lint` y `pnpm build`.
4. No incluir secretos: usar variables de entorno de Supabase de prueba o valores dummy seguros con formato válido para build (incluida una `SUPABASE_SECRET_KEY` ficticia), nunca la clave real.
5. Proteger main: no se mergea con checks rojos.

**Criterios de aceptación:**
- [ ] El workflow corre en cada PR.
- [ ] Falla si lint o build fallan.
- [ ] No expone secretos en logs.
- [ ] Main está protegido con checks obligatorios.

**Validación:** abrir un PR de prueba y verificar el check; probar un fallo de lint/build.

**Fuera de alcance:** tests (todavía no hay framework), deploy, previews.

**Evidencia para el PR:** enlace o captura del workflow y de la protección de main.

---

### T1.10 — Deploy, previews y dominio

**Depende de:** T1.9, D2, D3 · **Tamaño:** M · **PR:** 9 · **Rama:** `chore/e1-deploy` · **Estado:** Pendiente

**Objetivo:** tener producción accesible y una preview por PR.

**Contexto:** [README](../README.md), [AGENTS.md](../../AGENTS.md) (Comandos).

**Pasos:**
1. Conectar el repo al hosting definido en D2.
2. Configurar variables de entorno por entorno (desarrollo, preview, producción), incluida `SUPABASE_SECRET_KEY` como variable **solo de servidor** y `AUTH_SESSION_HOURS`.
3. Configurar previews por PR.
4. Conectar el dominio definido en D3 y forzar HTTPS.
5. Verificar que producción usa el proyecto de Supabase de producción y que las previews usan desarrollo.

**Criterios de aceptación:**
- [ ] Cada PR genera una URL de preview.
- [ ] Producción responde por HTTPS en el dominio.
- [ ] Las variables están cargadas en el hosting y no en el repo.
- [ ] Producción no apunta al proyecto de desarrollo.
- [ ] Las previews no escriben en producción.

**Validación:** abrir preview y producción; revisar variables y proyecto de Supabase asociado en el hosting.

**Fuera de alcance:** implementar auth, contenido, diseño o funcionalidades.

**Evidencia para el PR:** URLs de preview/producción y captura de variables (sin valores).

---

### T1.11 — Documentar puesta en marcha y validar desde cero

**Depende de:** T1.1–T1.10 · **Tamaño:** S · **PR:** 10 · **Rama:** `docs/e1-setup` · **Estado:** Pendiente

**Objetivo:** que otra persona pueda levantar el proyecto sin ayuda y sin prometer funcionalidades que todavía no existen.

**Contexto:** [README](../README.md), [AGENTS.md](../../AGENTS.md) (Comandos), [base de datos](../arquitectura/base-de-datos.md) (§12).

**Pasos:**
1. Actualizar README con: crear proyecto, cargar env (incluida la service key solo de servidor), aplicar migraciones y seed. La documentación debe reflejar **autenticación propia**, no Supabase Auth.
2. Aclarar que el primer administrador y el login del panel se implementan en la Épica 7; en la Épica 1 solo queda el esquema y el sitio público.
3. Verificar el flujo desde un clon limpio.
4. Anotar los problemas encontrados y corregirlos.

**Criterios de aceptación:**
- [ ] Una persona sigue los pasos y llega a `pnpm dev` funcionando.
- [ ] No falta ningún paso de Supabase.
- [ ] El documento no contiene claves reales.
- [ ] El README no promete login ni panel operativo antes de la Épica 7.

**Validación:** clon limpio + seguir la guía al pie de la letra.

**Fuera de alcance:** implementar auth, crear el primer admin, funcionalidades del panel.

**Evidencia para el PR:** log del clon limpio y diff del README.

## 5. Cómo trabajar estas tareas con IA

- **El humano dirige; la IA ejecuta.** No se acepta código sin entender qué hace y por qué.
- **Un pedido por tarea.** No mezclar tareas en un mismo prompt.
- **Contexto obligatorio:** `AGENTS.md`, reglas de programación, rutas, base de datos y la tarea específica.
- **Plan antes del código.** Pedir archivos a tocar, comandos, riesgos y fuera de alcance. Aprobarlo antes de implementar.
- **Revisar el diff completo** y ejecutar la validación de la tarea.
- **Actualizar documentación** si el cambio lo requiere.

**Errores típicos que hay que corregir en la respuesta de la IA:**

- Proponer **Supabase Auth**, `auth.uid()`, `profiles`, `handle_new_user`, `getUser()`/`getSession()` o un proxy que refresque sesión de Supabase.
- Crear un cliente de Supabase en el navegador o instalar `@supabase/ssr`.
- Usar la service key con prefijo `NEXT_PUBLIC_` o en código de cliente.
- Proponer un ORM o SQL suelto en el runtime de la app.
- Hacer cambios de esquema a mano en el dashboard en vez de una migración.
- Inventar contenido, datos de contacto, claves o rutas de archivos.

**Prompt base (copiar y completar).** Para otra épica, reemplazar `tareas-epica-1.md` por el archivo correspondiente.

```text
Vas a implementar T1.X — <título>.

Contexto obligatorio (leer antes de responder):
- AGENTS.md
- docs/reglas-ia/02-programacion.md
- docs/arquitectura/rutas.md
- docs/arquitectura/base-de-datos.md
- docs/producto/tareas-epica-1.md (tarea T1.X)

Restricciones:
- Una tarea = un PR. No toques archivos fuera del alcance.
- Auth propia; no Supabase Auth, ni `auth.uid()`, ni `profiles`, ni `getUser/getSession`, ni `@supabase/ssr`, ni cliente de navegador, ni proxy de sesión.
- Supabase solo en servidor: `public` y `admin`; la secret key nunca va al cliente ni usa `NEXT_PUBLIC_`.
- Sin ORM ni SQL suelto en runtime.
- No inventes contenido, datos, claves ni rutas.

Entregable:
1. Plan corto: archivos a tocar, comandos, riesgos y qué NO vas a hacer.
2. Implementación.
3. Resultado de la validación: <comandos>.
4. Diff resumido y evidencia para el PR.

Espera mi aprobación del plan antes de escribir código.
```

## 6. Checklist de revisión de PR

- [ ] El PR implementa solo la tarea y respeta el fuera de alcance.
- [ ] No hay secretos, claves reales ni `.env.local`.
- [ ] `pnpm lint` y `pnpm build` pasan.
- [ ] Las migraciones están versionadas y no se editó una migración ya aplicada.
- [ ] No hay cambios de esquema hechos a mano en el dashboard.
- [ ] Se mantiene la autenticación propia y los clientes solo de servidor.
- [ ] La documentación o el manual se actualizaron si corresponde.
- [ ] La evidencia de validación está adjunta.
- [ ] El rollback es claro si toca base de datos o infraestructura.
- [ ] Otra persona entiende el diff sin explicación oral.

## 7. Riesgos de la épica y mitigación

| Riesgo | Mitigación |
| --- | --- |
| D2/D3 se deciden tarde. | No bloquean T1.2–T1.9; T1.10 queda al final y se planifica con fecha. |
| Se filtra la service key. | `.env.example` con placeholders, `.gitignore`, valores dummy en CI y revisión de PR. |
| Cambios manuales en Supabase. | Migraciones versionadas; `supabase db diff` como control. |
| El seed del primer admin genera dependencia circular. | El primer admin se crea en la Épica 7; el seed solo carga configuración y bloques. |
| No hay framework de tests. | La Épica 1 valida con lint/build y pruebas manuales; el framework se define antes de la Épica 7. |

## 8. Criterios de aceptación de la épica

- [ ] `pnpm install`, `pnpm lint` y `pnpm build` funcionan desde cero.
- [ ] Cada PR genera una preview accesible.
- [ ] Las variables de entorno están documentadas y no hay secretos en el repo.
- [ ] Las migraciones iniciales de Supabase están versionadas y aplicadas.
- [ ] Producción responde por HTTPS en el dominio definido.
- [ ] T1.1 a T1.11 están cerradas con su validación y evidencia.
- [ ] La Épica 1 no implementó el flujo de login, guards ni sesión: eso queda para la Épica 7.
