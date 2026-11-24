# Editor de Actividades

`ActivitiesEditor` es un Server Component: lee la sección con `getActivitiesSection()` y pasa el DTO al cliente. Si la lectura falla, muestra un aviso en español en lugar del formulario. El guard de sesión se enchufará acá cuando exista `requireRole` (ver el `TODO(auth)` del archivo).

`ActivitiesEditorClient` mantiene tres piezas de estado:

- `current`: la sección completa que devuelve la última action. Es la fuente de verdad de la UI; después de cada guardado se reemplaza con el DTO mapeado por el servidor.
- `notice`: mensaje de éxito o error con `role="status"` / `role="alert"`.
- `isCreating`: muestra un formulario vacío para alta sin mezclarlo con las cards guardadas.

Todas las escrituras pasan por `startTransition`, así que `isPending` deshabilita botones y campos mientras la action termina. Las actions ya revalidan `/` y la ruta del editor; el estado local se actualiza con la respuesta para no esperar una navegación.

## Formularios

`ActivitiesHeaderForm` edita los textos que hoy consume la landing. `ActivityCardForm` se usa tanto para alta como para edición: el `id` ausente indica alta. Los campos de texto son no controlados (`defaultValue`) para conservar lo escrito si una validación falla; la imagen sí es estado controlado porque el servidor necesita `path`, `alt` y el flag `removeImage`.

El botón «Eliminar» es una confirmación en dos pasos: aparece un `alertdialog` inline con foco inicial en «Confirmar». No se usa `window.confirm` para que el flujo sea consistente en mobile y navegable por teclado.

## Subida de imágenes

`ImageUploader` acepta `uploadAction` y `onRemove` opcionales. Acá se le pasa `uploadActivityImageAction`, que envuelve la action genérica de media y fija `section = "activities"`. El `publicUrl` que devuelve se usa solo para la preview; el valor persistido es el `path`, que el servidor valida y vuelve a derivar. El prop `value` acepta `null` como «sin imagen» y tiene prioridad sobre la preview interna, así que al quitarla no queda una vista previa fantasma.
