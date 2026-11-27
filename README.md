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

## CRUD de patrocinadores

Está en `/admin/patrocinadores` (el viejo `/admin/contenido/sponsors` redirige ahí). Permite crear, editar, ordenar, ocultar y eliminar patrocinadores.

- Campos: nombre, logo (archivo subido al bucket `media` con prefijo `sponsors/`), texto alternativo del logo, sitio web opcional, orden y estado visible/oculto.
- Los patrocinadores activos se muestran en la sección de la portada. Si no hay ninguno, se siguen mostrando los marcadores «Logo pendiente».
- La tabla `sponsors` y la vista pública `public_sponsors` se crean con la migración `supabase/migrations/20261127120000_create_sponsors.sql`. Aplicarla con `pnpm dlx supabase db push` antes de usar el CRUD.
- La limpieza de logos y la revalidación de la portada se documentan en `src/features/sponsors/README.md`.

**Pendiente:** el panel no tiene autenticación propia todavía, así que estas acciones no verifican sesión ni rol, igual que el resto del panel actual. La autorización se agrega en la Épica 7; no expongas el panel sin esa guarda.
