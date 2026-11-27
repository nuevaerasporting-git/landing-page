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

La action solo devuelve `path` y `publicUrl`. Guardar el registro, escribir en `sections`, sumar auth y resolver borrados lo hace cada integrante en su CRUD. Las claves válidas de sección son `hero`, `activities`, `membership`, `news`, `sponsors` y `site`; están definidas en un único lugar (`src/features/content/utils/section-keys.ts`) y el editor admin usa las mismas claves en `/admin/contenido/<sección>`.

Dos puntos a no olvidar:

- Si el insert en la tabla falla después de subir el archivo, hay que borrar el archivo para no dejar basura.
- Antes de borrar una imagen, conviene chequear si alguna sección la está usando, porque el JSONB no tiene foreign keys que lo impidan.

### Estado del CRUD de noticias

Las acciones de `src/features/content/actions/news.ts` crean, editan y eliminan noticias en `sections.news.items`, y revalidan `/` y `/admin/contenido/news`. La pantalla de `/admin/contenido/news` lista, crea, edita y elimina noticias, y permite subir o reemplazar la imagen con `ImageUploader`. La sección Novedades de la landing muestra las noticias publicadas, ordenadas de la más reciente a la más antigua, y conserva los placeholders cuando no hay ninguna.

No hay autenticación ni autorización (`requireSession()` / `requireRole()`): **el CRUD no es apto para producción** hasta que el equipo integre esos controles.
