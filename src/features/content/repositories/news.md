# Repositorio de noticias

La persistencia vive en `site_configurations.sections.news.items` (JSONB), en la fila cuyo `domain` es `SITE_DOMAIN ?? "localhost:3000"`. No hay tabla de noticias.

Si `items` no existe, la lectura devuelve `[]` sin escribir en la base. Cada lectura admin arma el DTO con `imagePublicUrl` derivado desde el servidor; en JSONB solo se guarda `imagePath`. La lectura pública vive en `public-news.ts` y usa únicamente el cliente público.

`parseStoredNewsItems()` es estricto: si `items` no es una lista o alguna noticia no cumple el formato, la operación devuelve un error y no escribe. Así ninguna mutación descarta silentemente datos almacenados.

Las mutaciones leen el JSONB completo, reemplazan únicamente `news.items` y preservan el resto de las secciones. No se setea `updated_at` desde la aplicación.

Las validaciones de título, fecha, descripción, enlace de Instagram y path de imagen se aplican en servidor antes de leer o escribir.

## Pendiente del equipo

No hay autenticación, autorización ni roles en esta capa. Las acciones que expongan este repositorio deberán integrar `requireSession()` / `requireRole()` antes de considerar el CRUD apto para producción.

La escritura es read-modify-write de todo el JSONB: dos ediciones simultáneas pueden sobrescribirse. La estrategia de control concurrente se define con la infraestructura de acceso.

La capa de servicios (`src/features/content/services/news.ts`) se encarga del rollback y de la limpieza de imágenes; este repositorio solo persiste `items`.
