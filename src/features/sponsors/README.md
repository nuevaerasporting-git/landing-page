# Patrocinadores

El alta y la edición viven en `/admin/patrocinadores`. La portada lee la vista
pública `public_sponsors`, que solo expone los registros con `is_active = true`.

## Flujo de guardado

1. `ImageUploader` sube el logo al bucket `media` con prefijo `sponsors/` y
   devuelve `path` y `publicUrl`. El formulario guarda solo el `path` en estado.
2. La Server Action valida todos los campos en el servidor y escribe en la tabla
   `sponsors` con el cliente administrativo (service key, solo servidor).
3. Si la escritura falla, se intenta borrar el logo recién subido para no dejar
   archivos huérfanos.
4. Si el logo se reemplaza o el patrocinador se elimina, se intenta borrar el
   objeto anterior. Si esa limpieza falla, se registra un aviso y la operación
   principal continúa: el registro ya quedó consistente.
5. Toda mutación revalida `/` y `/admin/patrocinadores`.

La URL pública del logo se deriva del `path` con el cliente público de Storage,
así que no se guarda una URL que podría quedar desactualizada entre entornos.

## Estado actual

El panel todavía no tiene autenticación propia: las acciones de esta feature no
verifican sesión ni rol, igual que el resto del panel de maquetación. La
autorización con `requireSession()` / `requireRole()` se agrega en la Épica 7.
