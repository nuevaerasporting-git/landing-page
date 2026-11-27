# Servicios de noticias

Esta capa orquesta el repositorio de `sections.news.items` y la limpieza de imágenes. No expone interfaz ni valida sesión.

## Lectura

- `getPublicNewsSection()` usa `getSiteSections()` y el cliente público de Supabase. No interviene el cliente con service role. Si RLS no permite leer la fila, devuelve `{ ok: false, error }` sin modificar permisos ni políticas.
- `getAdminNewsSection()` usa el cliente administrador y se reserva para operaciones del panel.

Ambas lecturas exigen que `news.items` sea una lista y que cada noticia tenga el formato esperado. Si `items` no existe, devuelven `[]`; si existe pero es incompatible, devuelven un error en lugar de descartar noticias.

La lectura pública ordena las noticias por `publishedAt` de la más reciente a la más antigua. La landing la consume directamente desde `public-news.ts`; si falla o no hay noticias, muestra los placeholders de siempre. La lectura del panel conserva el orden almacenado.

## Mutaciones

- `createNews()` valida, persiste y, si falla, hace rollback de la imagen subida verificada.
- `updateNews()` lee el item anterior, valida, persiste y limpia la imagen reemplazada solo si quedó sin referencias. Si falla antes o durante la escritura, hace rollback de la imagen nueva verificada.
- `deleteNews()` lee el item, persiste el array sin él y limpia su imagen solo si quedó sin referencias.

La URL pública se deriva dentro de `public-news.ts` con el cliente público; `getNewsImagePublicUrl()` sigue siendo exclusivo de las respuestas admin.

## Imágenes

`uploadNewsImageAction` devuelve `path`, `publicUrl` y un `uploadToken` firmado y con vencimiento de una hora. El formulario debe reenviar `uploadedImagePath` junto con `imagePath` y `uploadToken`.

- Si `uploadedImagePath` difiere de `imagePath`, la operación se rechaza con error explícito y se limpia únicamente la imagen verificada por el token.
- Si el token falta o no es válido, la operación se rechaza y **no se borra ningún archivo**.
- El rollback y la limpieza siempre consultan referencias antes de borrar; si la consulta falla, se conserva el archivo.

Las Server Actions revalidan `/` y `/admin/contenido/news` cuando la mutación termina con `ok: true`.

## Pendiente del equipo

No hay `requireSession()` ni `requireRole()`: este CRUD **no es apto para producción** hasta integrar esos controles. El token de upload aún no se vincula a la sesión; cuando exista auth debe hacerlo. Tampoco hay auditoría ni control de concurrencia sobre el read-modify-write del JSONB; dos ediciones simultáneas pueden sobrescribirse.
