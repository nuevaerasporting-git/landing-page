# Base de datos inicial — Supabase

> Versión 0.1 — borrador para revisión del equipo.
> Modelo propuesto para v1. Las migraciones se escriben en la épica 1 y se ajustan con la implementación.

## 1. Alcance

La base guarda el contenido editable del sitio, la configuración global, las imágenes, la autenticación del panel y la auditoría. **La autenticación es propia**: no se usa Supabase Auth.

**Decisiones tomadas:** Supabase para base de datos (PostgreSQL) y storage de imágenes. La autenticación (usuarios, sesiones y contraseñas) se implementa en las tablas `users` y `sessions`.

**Fuera de v1:** socios, cuotas, pagos, reservas, productos y novedades.

## 2. Convenciones

- Nombres en inglés, `snake_case`, en plural para tablas.
- Claves primarias `uuid` con `gen_random_uuid()`, salvo logs (`bigint identity`).
- Fechas `timestamptz` con `now()`.
- `updated_at` se actualiza con trigger, no desde la aplicación.
- **Sin Supabase Auth.** No existen `auth.users`, `profiles` ni `handle_new_user`.
- **RLS activo en todas las tablas**, y además se **revocan los grants directos** de `select/insert/update/delete` sobre las tablas base a `anon` y `authenticated`. El público lee solo a través de vistas controladas.
- **La service key es solo de servidor.** Bypassea RLS y se usa únicamente después de `requireSession`/`requireRole` en la capa del panel. Nunca en el navegador.
- Los borradores nunca son visibles para el sitio público.

## 3. Relaciones

```
users 1──N sessions
users 1──N content_blocks (updated_by)
users 1──N content_revisions (created_by)
users 1──N media (uploaded_by)
users 1──N audit_log (actor_id)
content_blocks 1──N content_revisions
```

`site_settings` es una fila única. `login_attempts` registra intentos de login y no tiene relación obligatoria con `users` (se identifica por email).

## 4. Enums

| Enum | Valores | Uso |
| --- | --- | --- |
| `user_role` | `admin`, `editor` | Rol dentro del panel. |
| `content_status` | `draft`, `published` | Estado de publicación de un bloque. |

## 5. Tablas

### 5.1 `users`

Personas que pueden entrar al panel. La cuenta se crea desde el servidor; no hay registro público.

| Columna | Tipo | Nulo | Default | Notas |
| --- | --- | --- | --- | --- |
| `id` | `uuid` | No | `gen_random_uuid()` | PK. |
| `email` | `text` | No | — | Unique. Normalizado a minúsculas. |
| `password_hash` | `text` | No | — | Hash bcrypt (costo 12). Nunca texto plano. |
| `full_name` | `text` | Sí | — | Nombre visible. |
| `role` | `user_role` | No | `editor` | Permisos. |
| `is_active` | `boolean` | No | `true` | Desactivar sin borrar el usuario. |
| `created_at` | `timestamptz` | No | `now()` | |
| `updated_at` | `timestamptz` | No | `now()` | Trigger. |

Índice: unique `(lower(email))`; la aplicación normaliza el email a minúsculas antes de insertar y buscar.

### 5.2 `sessions`

Sesiones activas del panel. **Una fila por dispositivo.** El token en claro nunca se guarda: solo su hash.

| Columna | Tipo | Nulo | Default | Notas |
| --- | --- | --- | --- | --- |
| `id` | `uuid` | No | `gen_random_uuid()` | PK. |
| `user_id` | `uuid` | No | — | FK `users(id)` con `on delete cascade`. |
| `token_hash` | `text` | No | — | Unique. SHA-256 del token; nunca el token en claro. |
| `expires_at` | `timestamptz` | No | — | Expiración absoluta: `created_at + AUTH_SESSION_HOURS` (12 h por defecto). Sin refresco deslizante. |
| `created_at` | `timestamptz` | No | `now()` | |

Índices: unique `(token_hash)` y `(user_id)`.

### 5.3 `login_attempts`

Registro de intentos de login para rate limiting y auditoría. Retención 30 días.

| Columna | Tipo | Nulo | Default | Notas |
| --- | --- | --- | --- | --- |
| `id` | `bigint identity` | No | — | PK. |
| `email` | `text` | No | — | Email intentado (normalizado). |
| `ip` | `inet` | Sí | — | IP de origen, si está disponible. |
| `success` | `boolean` | No | — | Resultado del intento. |
| `created_at` | `timestamptz` | No | `now()` | |

Índices: `(email, ip, created_at desc)` y `(created_at desc)`; el rate limit consulta por email + IP en la ventana de 15 minutos.

### 5.4 `site_settings`

Configuración global. **Una sola fila** para evitar valores sueltos y poder validar.

| Columna | Tipo | Nulo | Default | Notas |
| --- | --- | --- | --- | --- |
| `id` | `smallint` | No | `1` | PK, `check (id = 1)`. |
| `whatsapp_number` | `text` | No | — | Formato E.164, por ejemplo `+549...`. |
| `whatsapp_message` | `text` | No | `''` | Mensaje inicial del CTA. |
| `email` | `text` | Sí | — | Contacto público. |
| `phone` | `text` | Sí | — | Teléfono visible. |
| `address` | `text` | Sí | — | Dirección. |
| `schedule` | `text` | Sí | — | Horarios en texto libre. |
| `map_url` | `text` | Sí | — | Enlace a mapa. |
| `instagram_url` | `text` | Sí | — | |
| `facebook_url` | `text` | Sí | — | |
| `seo_title` | `text` | Sí | — | Título por defecto. |
| `seo_description` | `text` | Sí | — | Descripción por defecto. |
| `updated_by` | `uuid` | Sí | — | Referencia `users(id)`. |
| `updated_at` | `timestamptz` | No | `now()` | Trigger. |

### 5.5 `content_blocks`

Un bloque editable del sitio. La clave es estable y la usa el código; el contenido vive en JSONB.

| Columna | Tipo | Nulo | Default | Notas |
| --- | --- | --- | --- | --- |
| `id` | `uuid` | No | `gen_random_uuid()` | PK. |
| `key` | `text` | No | — | Unique. Slug: `home-hero`, `socios-benefits`. |
| `page` | `text` | No | — | `check in ('home','disciplina','socios','contacto')`. |
| `block_type` | `text` | No | — | `check in ('hero','rich_text','features','steps','faq','cta')`. |
| `content` | `jsonb` | No | `'{}'` | Contenido **publicado**. |
| `draft_content` | `jsonb` | Sí | — | Cambios sin publicar. `null` = sin cambios pendientes. |
| `status` | `content_status` | No | `draft` | Un bloque nuevo no es visible hasta publicarse. |
| `sort_order` | `integer` | No | `0` | Orden dentro de la página. |
| `updated_by` | `uuid` | Sí | — | Referencia `users(id)`. |
| `created_at` | `timestamptz` | No | `now()` | |
| `updated_at` | `timestamptz` | No | `now()` | Trigger. |
| `published_at` | `timestamptz` | Sí | — | Última publicación. |

**Flujo de edición:** el admin guarda en `draft_content`; la previsualización lee `draft_content ?? content`; publicar copia `draft_content` a `content`, limpia el borrador, marca `published` y crea una revisión.

Índices: unique `(key)` y `(page, sort_order)`.

### 5.6 `content_revisions`

Historial de contenido publicado. Permite ver qué cambió y volver atrás.

| Columna | Tipo | Nulo | Default | Notas |
| --- | --- | --- | --- | --- |
| `id` | `bigint identity` | No | — | PK. |
| `block_id` | `uuid` | No | — | FK `content_blocks(id)` con `on delete cascade`. |
| `content` | `jsonb` | No | — | Snapshot de lo publicado. |
| `created_by` | `uuid` | Sí | — | Referencia `users(id)`. |
| `created_at` | `timestamptz` | No | `now()` | |

Índice: `(block_id, created_at desc)`.

### 5.7 `media`

Metadata de las imágenes. El archivo vive en Supabase Storage, bucket `media`.

| Columna | Tipo | Nulo | Default | Notas |
| --- | --- | --- | --- | --- |
| `id` | `uuid` | No | `gen_random_uuid()` | PK. |
| `bucket` | `text` | No | `'media'` | Bucket de Storage. |
| `path` | `text` | No | — | Unique. Ruta dentro del bucket. |
| `alt_text` | `text` | Sí | — | Obligatorio en el panel para imágenes informativas. |
| `mime_type` | `text` | No | — | `image/jpeg`, `image/png`, `image/webp` o `image/avif`. |
| `size_bytes` | `bigint` | No | — | Validado en el servidor. |
| `width` | `integer` | Sí | — | |
| `height` | `integer` | Sí | — | |
| `uploaded_by` | `uuid` | Sí | — | Referencia `users(id)`. |
| `created_at` | `timestamptz` | No | `now()` | |

### 5.8 `audit_log`

Registro de acciones del panel. Solo lo lee un administrador.

| Columna | Tipo | Nulo | Default | Notas |
| --- | --- | --- | --- | --- |
| `id` | `bigint identity` | No | — | PK. |
| `actor_id` | `uuid` | Sí | — | Referencia `users(id)`. |
| `action` | `text` | No | — | Por ejemplo `content.update`, `content.publish`, `settings.update`, `media.upload`. |
| `entity` | `text` | No | — | `content_block`, `site_settings`, `media`. |
| `entity_id` | `text` | Sí | — | ID afectado. |
| `metadata` | `jsonb` | No | `'{}'` | Contexto adicional, sin datos sensibles. |
| `created_at` | `timestamptz` | No | `now()` | |

Índices: `(created_at desc)` y `(actor_id)`.

### 5.9 Reglas de autenticación propia

La autenticación no depende de Supabase Auth. Estas reglas aplican a toda implementación de login, sesión y permisos.

| Tema | Regla |
| --- | --- |
| Hashing de contraseñas | bcrypt con costo 12 (`bcryptjs`) por defecto. Nunca texto plano, nunca en logs. |
| Longitud de contraseña | Mínimo 12 caracteres; máximo 72 bytes (límite de bcrypt). |
| Token de sesión | 32 bytes aleatorios, codificados en base64url. |
| Almacenamiento del token | Se guarda solo el SHA-256 en `sessions.token_hash`. La comparación se hace por hash. |
| Cookie | Nombre `silcom_session`; `HttpOnly`; `Secure` en producción; `SameSite=Lax`; `Path=/`; `Max-Age=43200` (12 h). |
| Expiración | Absoluta: 12 h desde la creación (`AUTH_SESSION_HOURS`, entero 1–24). No hay refresco deslizante. |
| Rate limit de login | 5 intentos fallidos por email + IP en 15 minutos. Mensaje de error genérico. |
| Logout | Borra la fila de `sessions` actual y limpia la cookie. |
| Sesiones múltiples | Permitidas (una por dispositivo). El logout afecta solo a la sesión actual. |
| Recuperación de contraseña | En v1 es manual/asistida por un admin. No hay flujo por email. |
| Autorización | `requireSession()` / `requireRole()` en el servidor, en el layout del panel y en cada Server Action. Roles: `admin`, `editor`. |
| Auditoría | Las acciones sensibles se registran en `audit_log`; la lectura de auditoría es solo `admin`. |

## 6. Vistas públicas

El sitio público lee vistas, no las tablas directamente. **La vista es el límite de seguridad público:** expone solo columnas seguras y filtra el contenido publicado.

| Vista | Expone | Filtro |
| --- | --- | --- |
| `published_content` | `key`, `page`, `block_type`, `content`, `sort_order`, `published_at` | Solo `status = 'published'`. |
| `public_site_settings` | Datos de contacto, redes y SEO | Omite `updated_by` y `updated_at`. |
| `public_media` | `id`, `path`, `alt_text`, `mime_type`, `width`, `height` | Solo metadata segura de imágenes. |

**Reglas de las vistas:**

- Se crean como vistas **security definer** propiedad de `postgres`, con listas de columnas estrictas y filtros explícitos. La vista es el límite de seguridad público.
- Se otorga `select` a `anon` **solo sobre las vistas**, nunca sobre las tablas base.
- Se **revocan** los grants directos de `select/insert/update/delete` sobre las tablas base a `anon` y `authenticated`.
- `public_media` no expone `bucket`, `size_bytes`, `uploaded_by` ni `created_at`.

## 7. RLS inicial

RLS se mantiene activo en todas las tablas. Como no hay usuarios de Supabase Auth, el acceso se reparte así:

| Tabla | anon | authenticated | service_role |
| --- | --- | --- | --- |
| `users` | Sin acceso | Sin acceso (no se usa) | Lee y escribe (solo servidor, tras guarda) |
| `sessions` | Sin acceso | Sin acceso (no se usa) | Lee y escribe (solo servidor, tras guarda) |
| `login_attempts` | Sin acceso | Sin acceso (no se usa) | Lee y escribe (solo servidor) |
| `site_settings` | Lee `public_site_settings` (vista) | Sin acceso (no se usa) | Lee y actualiza |
| `content_blocks` | Lee `published_content` (vista) | Sin acceso (no se usa) | Lee todo; crea, edita y publica |
| `content_revisions` | Sin acceso | Sin acceso (no se usa) | Lee |
| `media` | Lee `public_media` (vista) | Sin acceso (no se usa) | Crea, edita y borra |
| `audit_log` | Sin acceso | Sin acceso (no se usa) | Lee (solo admin) |
| Storage `media` | Lee archivos públicos | Sin acceso (no se usa) | Sube, reemplaza y borra |

Reglas:

- **No existe `current_user_role()`** ni ningún helper basado en `auth.uid()`: no hay usuarios de Supabase Auth.
- **Se revocan los grants directos** sobre las tablas base a `anon` y `authenticated`. El público solo lee vistas.
- **El service role bypassa RLS.** Se usa únicamente en el servidor, después de `requireSession`/`requireRole` en la capa del panel. Nunca en el navegador.
- El control de autorización real (quién puede editar o publicar) vive en el código del servidor, no en políticas de RLS basadas en auth.
- Un editor puede publicar directo. Si el club quiere aprobación previa, se agrega un estado y un permiso nuevo.

## 8. Storage

- Bucket `media`.
- Lectura pública; **escritura solo desde el servidor** vía Server Actions con el cliente service role.
- Tamaño máximo inicial: 5 MB por archivo.
- Tipos permitidos: JPEG, PNG, WebP y AVIF. **No se permite SVG** (riesgo de XSS).
- Rutas por año y mes: `2026/11/home-hero.webp`.
- Validar tipo real, tamaño y dimensiones en el servidor antes de subir.
- No se crean políticas de storage para `authenticated`: no hay usuarios de Supabase Auth.

## 9. Catálogo inicial de bloques

| Página | Key | Tipo | Contenido |
| --- | --- | --- | --- |
| Home | `home-hero` | `hero` | Título, subtítulo, imagen y CTA. |
| Home | `home-about` | `rich_text` | Qué es el club. |
| Home | `home-benefits` | `features` | Resumen de beneficios. |
| Home | `home-cta` | `cta` | Llamada a asociarse. |
| Disciplina | `disciplina-intro` | `rich_text` | Qué es la práctica. |
| Disciplina | `disciplina-steps` | `steps` | Cómo empezar. |
| Disciplina | `disciplina-safety` | `rich_text` | Seguridad. |
| Disciplina | `disciplina-faq` | `faq` | Preguntas frecuentes. |
| Socios | `socios-intro` | `rich_text` | Beneficios de asociarse. |
| Socios | `socios-benefits` | `features` | Descuentos y beneficios. |
| Socios | `socios-steps` | `steps` | Pasos para asociarse. |
| Socios | `socios-faq` | `faq` | Preguntas frecuentes. |
| Contacto | `contacto-intro` | `rich_text` | Texto de contacto. |

## 10. Formas de contenido (JSONB)

```jsonc
// hero
{ "title": "...", "subtitle": "...", "image_id": "uuid | null", "cta": { "label": "...", "action": "whatsapp" } }

// rich_text
{ "title": "...", "body_markdown": "..." }

// features
{ "items": [{ "title": "...", "description": "...", "icon": "..." }] }

// steps
{ "items": [{ "title": "...", "description": "..." }] }

// faq
{ "items": [{ "question": "...", "answer_markdown": "..." }] }

// cta
{ "title": "...", "description": "...", "label": "...", "action": "whatsapp" }
```

- `action: "whatsapp"` resuelve la URL con `site_settings.whatsapp_number`. No se guarda el número en el contenido.
- `body_markdown` acepta un subconjunto seguro de Markdown y se sanitiza al renderizar.
- `image_id` se valida contra `media` en el servidor; JSONB no puede tener FK.

## 11. Funciones, triggers y transacciones

- `set_updated_at()`: trigger en `users`, `site_settings` y `content_blocks`.
- `publish_content_block(block_id uuid, actor_id uuid)`: RPC `security definer` que valida que el actor sea un usuario activo con rol `admin` o `editor`, copia el borrador, marca publicado, crea la revisión y registra la auditoría **en una sola transacción**. Evita publicaciones a medias.
  - `revoke execute` de `public`, `anon` y `authenticated`; `grant execute` solo a `service_role`.
  - El servidor vuelve a verificar el rol antes de llamar a la RPC.
- `delete_expired_sessions()` (opcional): borra sesiones vencidas. Se puede ejecutar por cron o script administrativo.
- **No existe `handle_new_user()`**: no hay Supabase Auth que dispare el trigger.
- **No existe `current_user_role()`**: la autorización se resuelve en el código del servidor.
- El primer administrador se crea en la Épica 7 con un `password_hash` bcrypt válido (nunca texto plano).

## 12. Migraciones y tipos

- Las migraciones SQL viven en `supabase/migrations/` y se versionan en el repo.
- Se crean con `supabase migration new <nombre>` y se aplican con `supabase db push`.
- Los tipos se generan con `supabase gen types typescript` hacia `src/shared/types/database.types.ts`.
- Ningún cambio de esquema se hace a mano en el dashboard y se deja sin migración.

## 13. Decisiones abiertas

1. Hashing de contraseñas: bcrypt costo 12 (por defecto) vs argon2id.
2. Flujo de recuperación manual de contraseña: reset directo por admin o script de servidor.
3. Cadencia del cleanup de sesiones vencidas (cron diario vs al iniciar sesión).
4. Sesiones múltiples: una por dispositivo (definido) vs límite máximo por usuario.
5. Umbrales de rate limit: 5 intentos / 15 min (definido) vs valores a ajustar con uso real.
6. Retención de `login_attempts`: 30 días (definido) vs otro período por privacidad.
7. Editor de texto enriquecido: Markdown asistido o editor WYSIWYG con sanitización.
8. Retención de revisiones: sin límite inicial por bajo volumen; revisar si crece.
9. ¿Un editor puede publicar directo o requiere aprobación de un admin?
10. Borrado de imágenes en uso: bloquear o permitir con confirmación.
11. Límite definitivo de tamaño y dimensiones de imagen.
