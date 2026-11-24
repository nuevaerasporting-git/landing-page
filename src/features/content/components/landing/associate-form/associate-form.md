# AssociateForm

Componente de cliente que renderiza el formulario de asociación en la sección "Asociarse" de la landing.

## Responsabilidad

- Capturar datos del visitante (nombre, apellido, email, teléfono, disciplina, mensaje).
- Validar los datos en el servidor mediante la Server Action `buildWhatsAppUrl`.
- Al ser válidos, abrir WhatsApp con un mensaje prearmado usando el número del club.

## Qué se hizo

- Se creó el componente de cliente `AssociateForm` con estado local para los campos del formulario.
- Se agregó la Server Action `buildWhatsAppUrl` en `src/features/content/actions/associate.ts` que valida los datos en el servidor y construye la URL de WhatsApp.
- Se reemplazó el enlace CTA de la sección "Asociarse" por el formulario, manteniendo el contenido editable (título, descripción, nota y label del botón).
- Los inputs usan placeholders cortos ("Nombre", "Apellido", "Email", "Teléfono") para guiar la carga.
- El número de WhatsApp usado es el del club (`5493462504698`).

## Archivos

- `index.tsx`: componente de cliente, estado del formulario y envío.
- `../../actions/associate.ts`: Server Action con validación y construcción de la URL de WhatsApp.

## Notas

- No persiste solicitudes: socios y cuotas quedan fuera de v1.
- El número de WhatsApp queda pendiente de tomarlo de `site_settings` cuando esa lectura esté implementada.
- La validación del cliente es solo UX; la validación real ocurre en el servidor.
