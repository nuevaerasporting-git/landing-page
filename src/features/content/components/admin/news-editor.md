# Editor de Novedades

`NewsEditor` es un Server Component: lee la sección con `getAdminNewsSection()` y pasa solo los DTO al cliente. Si la lectura falla, muestra el error en español en lugar del formulario. No hay guardia de sesión porque la infraestructura de auth sigue pendiente.

`NewsEditorClient` mantiene tres piezas de estado:

- `items`: la fuente de verdad de la UI. Cada action devuelve el array actualizado y se reemplaza con esa respuesta.
- `notice`: mensaje de éxito o error con `role="status"` / `role="alert"`.
- `formMode`: `null`, alta, o edición con el `id` de la noticia. La edición conserva el `id` porque el formulario lo envía como campo oculto.

Todas las mutaciones pasan por `startTransition`, así que `isPending` deshabilita botones y muestra estados de carga. Las actions ya revalidan `/` y `/admin/contenido/news`; el estado local se actualiza con la respuesta para no esperar una navegación.

## Formulario e imagen

`NewsForm` usa inputs controlados para no perder lo escrito cuando una validación del servidor falla. `ImageUploader` se renderiza como **hermano** del `<form>` porque internamente tiene su propio formulario de subida: anidarlo sería HTML inválido.

Después de subir, el formulario guarda tres campos ocultos:

- `imagePath`: la ruta que se persiste en JSONB.
- `uploadedImagePath`: la misma ruta, usada por el servicio para el rollback.
- `uploadToken`: firma de la subida, con vencimiento de una hora.

Los campos de `uploadedImagePath` y `uploadToken` solo se renderizan cuando hubo una subida nueva. Así, editar el texto de una noticia sin reemplazar la imagen no envía valores vacíos que el servicio rechazaría.

Al editar una noticia sin subir una imagen nueva, `imagePath` llega con el valor guardado y `uploadedImagePath` / `uploadToken` quedan vacíos. El servicio no borra nada en ese caso.

`ImageUploader` acepta un `uploadAction` opcional; por defecto sigue llamando a `uploadImage`, por lo que otros usos no se ven afectados. En novedades se le pasa `uploadNewsImageAction` para obtener el token.

## Borrado

`NewsList` muestra cada noticia con una confirmación inline (`role="alertdialog"`) en lugar de `window.confirm`. El foco va al botón "Cancelar" cuando aparece. El formulario de confirmación contiene solo el `id` y no está anidado dentro de otro formulario.
