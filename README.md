## Cómo funciona la subida de imágenes a Supabase

La subida ya está implementada en `src/features/media/`. Desde cualquier formulario se usa el componente `ImageUploader`, que arma un `FormData` con la imagen y la clave de la sección, y llama a la Server Action `uploadImage`.

Flujo:

1. El componente envía los campos `section` e `image`.
2. La action valida la sección contra la lista permitida (`SECTION_KEYS`) y la imagen (5 MB máximo, solo JPEG, PNG, WebP o AVIF, comparando el tipo declarado con los magic bytes).
3. Sube el archivo al bucket público `media` con ruta `media/<sección>/<uuid>.<ext>`, usando la secret key solo desde el servidor.
4. Devuelve `{ ok: true, path, publicUrl }`, o `{ ok: false, error }` con un mensaje en español.

El bucket se crea con `supabase/media-bucket.sql` (público, límite de 5 MB y esos cuatro tipos MIME). En Storage no hay carpetas reales: `hero/` y `sponsors/` son prefijos del nombre del objeto. `next.config.ts` habilita las imágenes remotas de Supabase y eleva el límite de Server Actions a 6 MB.

### Qué incluye

- Selector reutilizable con vista previa, arrastrar y soltar, estados de carga y error.
- Validación de sección, tamaño, tipo declarado y contenido real del archivo.
- Extensión canónica y nombre único por imagen (`uuid`), sin sobrescribir archivos.
- Lectura de credenciales desde variables de entorno y acceso al bucket solo con secret key en servidor.

### Qué no incluye

- Inserción del registro en la tabla de imágenes.
- Escritura del identificador o la URL en el JSONB de la sección.
- Control de acceso: la action no autentica ni autoriza.
- Borrado, reemplazo ni verificación de referencias antes de borrar.
- Extracción de dimensiones de la imagen.
- Migración de los archivos que ya estén en la raíz del bucket sin prefijo.

## Consideraciones para el CRUD de cada sección

La action de subida solo devuelve `path` y `publicUrl`. Cada CRUD es responsable de validar, persistir y resolver los borrados. Las claves válidas de sección son `hero`, `activities`, `membership`, `news`, `sponsors` y `site`; están definidas en un único lugar (`src/features/content/utils/section-keys.ts`).

### Actividades (CRUD completo)

El contenido se guarda en `site_configurations.sections` bajo la clave `activities`, en la fila de `SITE_DOMAIN ?? "localhost:3000"`. Las Server Actions viven en `src/features/content/actions/activities.ts` y delegan la lógica en `services/activities.ts`.

- El cliente envía solo el `path` de la imagen; el servidor valida el formato y deriva el `publicUrl` con `getPublicUrl()`.
- Si la escritura en DB falla después de subir una imagen, se borra el archivo recién subido (`rollbackUpload`).
- Antes de borrar una imagen se recorren todos los JSONB de `site_configurations` y solo se elimina del bucket si ninguna otra sección o card la referencia.
- Si falla la consulta de referencias, no se borra nada: se prefiere un archivo huérfano antes que romper otra sección.
- Las actions ya revalidan `/` y `/admin/contenido/activities`.
- El editor de `/admin/contenido/activities` permite cargar, editar y borrar cards con imagen, días/horarios y CTA propio, además de editar los textos de la cabecera.
- La landing muestra la imagen, los horarios y el CTA de cada card; si una actividad no tiene imagen, sigue mostrando el placeholder.
- Falta conectar los guards de sesión: cada action y `ActivitiesEditor` tienen un `TODO(auth)` para `requireRole(["admin", "editor"])`.

Detalle del flujo en `src/features/content/services/activities.md` y del estado del editor en `src/features/content/components/admin/activities-editor.md`.
