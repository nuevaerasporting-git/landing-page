# CRUD de Actividades — capa de servicios

## Persistencia

El contenido se guarda en `site_configurations.sections` (JSONB), en la fila cuyo `domain` es `SITE_DOMAIN ?? "localhost:3000"`. No hay tabla `sections` ni una fila por card: crear, editar y borrar una actividad significa reemplazar el array `activities.items` completo.

Las cards antiguas del seed no tienen `id`, `schedule`, `image` ni `cta`. `normalizeCard` las adapta al leer: `id` derivado del índice (`legacy-0`, …), horarios vacíos, sin imagen y el CTA de la cabecera como fallback. Ese `id` se conserva al editarlas; las cards creadas desde el panel reciben un UUID.

El cliente nunca envía `publicUrl`. Envía `path`, el servidor valida el formato `activities/<uuid>.<ext>` y deriva la URL con `storage.getPublicUrl(path)`. Así un POST directo no puede inyectar URLs arbitrarias.

## Ciclo de una imagen

1. La subida se hace con `uploadActivityImageAction`, que delega en la action existente `uploadImage` y devuelve `{ path, publicUrl }`.
2. El formulario guarda el `path` en la card. La action de guardado vuelve a leer el JSONB desde la DB, arma el nuevo payload y recién después escribe.
3. Si el `update` falla, `rollbackUpload(path)` borra el archivo recién subido. La imagen anterior no se toca.
4. Si el `update` sale bien y se reemplazó o quitó una imagen, `removeIfUnreferenced` busca ese `path` y su `publicUrl` en **todas** las filas y **todas** las claves del JSONB. Solo borra del bucket si nadie más lo referencia.
5. Si no se puede consultar Supabase para el chequeo, la función devuelve `referenced = true` y no borra: es preferible dejar un archivo huérfano antes que romper otra sección.

## Orden de las operaciones

- **Alta / edición con imagen nueva:** validar → subir → leer DB → escribir DB → rollback si falla → limpiar imagen vieja si quedó libre → revalidar.
- **Borrado de card:** validar → leer DB → escribir DB sin la card → limpiar su imagen si quedó libre → revalidar. Si la escritura falla, el archivo permanece.

## Riesgo conocido (v1)

El chequeo de referencias ocurre después de la escritura y no es atómico frente a dos administradores editando al mismo tiempo. Se acepta para v1; una solución futura sería una RPC que haga DB y Storage en una sola transacción lógica.
