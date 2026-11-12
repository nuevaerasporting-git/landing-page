# Base de datos inicial — Supabase

> Versión 0.1 — borrador para revisión del equipo.
> Modelo propuesto para v1. Las migraciones se escriben en la épica 1 y se ajustan con la implementación.

## 1. Alcance

La base guarda el contenido editable del sitio, la configuración global, las imágenes y la auditoría del panel. La autenticación la maneja Supabase Auth.

**Decisiones tomadas:** Supabase para base de datos (PostgreSQL), autenticación y storage de imágenes.

**Fuera de v1:** socios, cuotas, pagos, reservas, productos y novedades.

## 2. Convenciones

- Nombres en inglés, `snake_case`, en plural para tablas.
- Claves primarias `uuid` con `gen_random_uuid()`, salvo logs (`bigint identity`).
- Fechas `timestamptz` con `now()`.
- `updated_at` se actualiza con trigger, no desde la aplicación.
- **RLS activo en todas las tablas.** Sin política, nadie lee ni escribe.
- El rol se lee de `profiles`, nunca de `user_metadata` (el usuario puede editarlo).
- Los borradores nunca son visibles para el sitio público.

## 3. Relaciones

```
auth.users 1──1 profiles
profiles 1──N content_blocks (updated_by)
profiles 1──N content_revisions (created_by)
profiles 1──N media (uploaded_by)
profiles 1──N audit_log (actor_id)
content_blocks 1──N content_revisions
```

`site_settings` es una fila única, sin relación obligatoria con otras tablas.

## 4. Enums

| Enum | Valores | Uso |
| --- | --- | --- |
| `user_role` | `admin`, `editor` | Rol dentro del panel. |
| `content_status` | `draft`, `published` | Estado de publicación de un bloque. |

## 5. Tablas

### 5.1 `profiles`

Perfil de cada persona que puede entrar al panel. Se crea junto con el usuario de Supabase Auth.

| Columna | Tipo | Nulo | Default | Notas |
| --- | --- | --- | --- | --- |
| `id` | `uuid` | No | — | PK, referencia `auth.users(id)` con `on delete cascade`. |
| `email` | `text` | No | — | Copia para mostrar en el panel. |
| `full_name` | `text` | Sí | — | Nombre visible. |
| `role` | `user_role` | No | `editor` | Permisos. |
| `is_active` | `boolean` | No | `true` | Desactivar sin borrar el usuario. |
| `created_at` | `timestamptz` | No | `now()` | |
| `updated_at` | `timestamptz` | No | `now()` | Trigger. |

### 5.2 `site_settings`

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
| `updated_by` | `uuid` | Sí | — | Referencia `profiles(id)`. |
| `updated_at` | `timestamptz` | No | `now()` | Trigger. |

### 5.3 `content_blocks`

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
| `updated_by` | `uuid` | Sí | — | Referencia `profiles(id)`. |
| `created_at` | `timestamptz` | No | `now()` | |
| `updated_at` | `timestamptz` | No | `now()` | Trigger. |
| `published_at` | `timestamptz` | Sí | — | Última publicación. |

**Flujo de edición:** el admin guarda en `draft_content`; la previsualización lee `draft_content ?? content`; publicar copia `draft_content` a `content`, limpia el borrador, marca `published` y crea una revisión.

Índices: unique `(key)` y `(page, sort_order)`.

### 5.4 `content_revisions`

Historial de contenido publicado. Permite ver qué cambió y volver atrás.

| Columna | Tipo | Nulo | Default | Notas |
| --- | --- | --- | --- | --- |
| `id` | `bigint identity` | No | — | PK. |
| `block_id` | `uuid` | No | — | FK `content_blocks(id)` con `on delete cascade`. |
| `content` | `jsonb` | No | — | Snapshot de lo publicado. |
| `created_by` | `uuid` | Sí | — | Referencia `profiles(id)`. |
| `created_at` | `timestamptz` | No | `now()` | |

Índice: `(block_id, created_at desc)`.

### 5.5 `media`

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
| `uploaded_by` | `uuid` | Sí | — | Referencia `profiles(id)`. |
| `created_at` | `timestamptz` | No | `now()` | |

### 5.6 `audit_log`

Registro de acciones del panel. Solo lo lee un administrador.

| Columna | Tipo | Nulo | Default | Notas |
| --- | --- | --- | --- | --- |
| `id` | `bigint identity` | No | — | PK. |
| `actor_id` | `uuid` | Sí | — | Referencia `profiles(id)`. |
| `action` | `text` | No | — | Por ejemplo `content.update`, `content.publish`, `settings.update`, `media.upload`. |
| `entity` | `text` | No | — | `content_block`, `site_settings`, `media`. |
| `entity_id` | `text` | Sí | — | ID afectado. |
| `metadata` | `jsonb` | No | `'{}'` | Contexto adicional, sin datos sensibles. |
| `created_at` | `timestamptz` | No | `now()` | |

Índices: `(created_at desc)` y `(actor_id)`.

## 6. Vistas públicas

Para no exponer columnas internas, el sitio público lee vistas, no las tablas directamente.

| Vista | Expone | Filtro |
| --- | --- | --- |
| `published_content` | `key`, `page`, `block_type`, `content`, `sort_order`, `published_at` | Solo `status = 'published'`. |
| `public_site_settings` | Datos de contacto, redes y SEO | Omite `updated_by` y `updated_at`. |

Ambas se crean con `security_invoker = true` y se otorga `select` a `anon` y `authenticated`.

## 7. RLS inicial

| Tabla | anon | editor | admin |
| --- | --- | --- | --- |
| `profiles` | Sin acceso | Lee y edita solo su fila (sin cambiar rol) | Lee y edita todas |
| `site_settings` | Lee la vista pública | Lee y actualiza | Lee y actualiza |
| `content_blocks` | Lee la vista publicada | Lee todo; crea, edita y publica | Igual que editor |
| `content_revisions` | Sin acceso | Lee | Lee |
| `media` | Lee metadata pública | Crea, edita y borra | Igual que editor |
| `audit_log` | Sin acceso | Sin acceso | Lee |
| Storage `media` | Lee archivos públicos | Sube y reemplaza | Sube, reemplaza y borra |

Reglas:

- Helper `public.current_user_role()` como `security definer` con `search_path = ''`, que devuelve el rol de `auth.uid()` solo si `is_active`.
- El helper evita recursión al consultar `profiles` dentro de sus propias políticas.
- Un editor puede publicar directo. Si el club quiere aprobación previa, se agrega un estado y un permiso nuevo.
- El service role bypassa RLS: nunca se usa en el navegador ni en el runtime normal de la app.

## 8. Storage

- Bucket `media`.
- Lectura pública; escritura solo con rol `editor` o `admin`.
- Tamaño máximo inicial: 5 MB por archivo.
- Tipos permitidos: JPEG, PNG, WebP y AVIF. **No se permite SVG** (riesgo de XSS).
- Rutas por año y mes: `2026/11/home-hero.webp`.
- Validar tipo real, tamaño y dimensiones en el servidor antes de subir.

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

- `set_updated_at()`: trigger en `profiles`, `site_settings` y `content_blocks`.
- `handle_new_user()`: trigger sobre `auth.users` que crea la fila en `profiles` con email y rol `editor`.
- `current_user_role()`: helper de RLS descrito arriba.
- `publish_content_block(block_id)`: RPC `security definer` que valida el rol, copia el borrador, marca publicado, crea la revisión y registra la auditoría **en una sola transacción**. Evita publicaciones a medias.
- El primer administrador se promueve manualmente una única vez después de crearlo.

## 12. Migraciones y tipos

- Las migraciones SQL viven en `supabase/migrations/` y se versionan en el repo.
- Se crean con `supabase migration new <nombre>` y se aplican con `supabase db push`.
- Los tipos se generan con `supabase gen types typescript` hacia `src/shared/types/database.types.ts`.
- Ningún cambio de esquema se hace a mano en el dashboard y se deja sin migración.

## 13. Decisiones abiertas

1. Editor de texto enriquecido: Markdown asistido o editor WYSIWYG con sanitización.
2. Retención de revisiones: sin límite inicial por bajo volumen; revisar si crece.
3. ¿Un editor puede publicar directo o requiere aprobación de un admin?
4. Borrado de imágenes en uso: bloquear o permitir con confirmación.
5. Límite definitivo de tamaño y dimensiones de imagen.
