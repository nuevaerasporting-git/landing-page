# Documentación del proyecto — Sitio institucional Silcom

> Versión 0.1 — borrador para revisión del equipo.
> Esta documentación es la fuente de verdad para trabajar con IA en el proyecto.

## Qué estamos construyendo

Sitio web dinámico para el club de María Teresa (Santa Fe) con:

- Información sobre cómo practicar la disciplina.
- Beneficios y descuentos para socios.
- Cómo asociarse (contacto por WhatsApp).
- Panel de administración para editar el contenido.
- Manual de uso del panel para personas sin perfil técnico.
- A futuro: catálogo de productos.

El sitio público lo lee cualquier visitante. El panel lo usan pocas personas del club, con permisos acotados.

**Stack:** Next.js 16 (App Router) + Supabase (base de datos, autenticación y storage) + Tailwind CSS.

## Puesta en marcha

```bash
pnpm install
cp .env.example .env.local
# completar las claves de Supabase en .env.local
pnpm dev
```

`.env.local` no se commitea. Las claves reales se comparten por un canal privado, nunca por el repo ni por el chat de IA.

## Mapa de la documentación

| Documento | Para qué sirve | Cuándo leerlo |
| --- | --- | --- |
| [Reglas de diseño](./reglas-ia/01-diseno.md) | Cómo usar IA para definir la identidad visual, las pantallas y el sistema de diseño. | Antes de pedir mockups, componentes o estilos. |
| [Reglas de programación](./reglas-ia/02-programacion.md) | Cómo usar IA para escribir código sin romper la arquitectura ni la seguridad. | Antes de escribir cualquier línea de código. |
| [Reglas de testeo](./reglas-ia/03-testeo.md) | Cómo usar IA para probar el sitio y el panel. | Antes de dar una tarea por terminada. |
| [Épicas del proyecto](./producto/epicas.md) | Los objetivos grandes del producto, su alcance y su orden. | Antes de planificar tareas o issues. |
| [Estructura de rutas](./arquitectura/rutas.md) | URLs, route groups, features y capa que resuelve cada pantalla. | Antes de crear una página o ruta. |
| [Base de datos](./arquitectura/base-de-datos.md) | Tablas, relaciones, RLS, storage y forma del contenido. | Antes de tocar datos o escribir migraciones. |

## Reglas de oro (aplican a todo el equipo)

1. **La IA propone, la persona decide.** Ninguna entrega se acepta sin que una persona la haya leído y entendido.
2. **Sin contexto no hay buena salida.** Todo pedido debe indicar objetivo, archivos o pantallas involucradas, restricciones y criterio de aceptación.
3. **Una tarea por vez, un cambio por PR.** Pedidos grandes generan cambios grandes, difíciles de revisar y de revertir.
4. **Si no podés explicar lo que hace el código, no se mergea.** "Funciona" no alcanza.
5. **Nunca pegar datos sensibles en el chat de IA**: credenciales, claves, datos de socios, teléfonos reales, accesos del hosting.
6. **Todo cambio se valida** con `pnpm lint` y `pnpm build`, y con tests cuando corresponda.
7. **Mobile-first y accesibilidad no son opcionales.** Se revisan en diseño, en código y en testeo.
8. **El contenido institucional no se inventa.** Horarios, precios, beneficios, dirección y contactos los valida el club.
9. **Idioma:** el sitio, los textos y la documentación van en español. El código, los nombres de variables y los commits van en inglés.

## Flujo de trabajo con IA (5 pasos)

1. **Elegir una tarea chica y acotada.** Debe existir un issue o una épica con criterio de aceptación.
2. **Preparar el contexto.** Abrir `AGENTS.md`, el documento de reglas que corresponda y los archivos que se van a tocar.
3. **Pedir un plan antes del código.** La IA explica qué va a cambiar y por qué. Se aprueba o se corrige el plan.
4. **Revisar el resultado con ojo humano.** Leer el diff completo, no solo el resumen de la IA.
5. **Validar y cerrar.** Lint, build, tests y revisión de otra persona antes de mergear.

## Qué NO se delega a la IA

- Decisiones de marca e identidad del club.
- Precios, descuentos, beneficios y reglas de membresía.
- Datos de contacto, dirección y horarios reales.
- Quién puede entrar al panel y con qué permisos.
- Aprobación final de un cambio.

## Glosario mínimo

| Término | Significado |
| --- | --- |
| **Prompt** | El pedido que se le escribe a la IA. |
| **Contexto** | Información que la IA necesita para no inventar: archivos, reglas, ejemplos. |
| **Diff** | La diferencia exacta entre el código anterior y el nuevo. |
| **PR (Pull Request)** | Propuesta de cambio que otra persona revisa antes de mergear. |
| **Criterio de aceptación** | Condición verificable que define cuándo una tarea está terminada. |
| **Definition of Done** | Checklist común que todo cambio debe cumplir. |

## Definition of Done del proyecto

Un cambio está terminado cuando:

- [ ] Cumple el criterio de aceptación de la tarea.
- [ ] Pasa `pnpm lint` y `pnpm build`.
- [ ] Tiene tests cuando agrega lógica o flujos críticos.
- [ ] Funciona en mobile (360 px) y en desktop.
- [ ] Cumple accesibilidad básica: contraste, foco visible, labels y navegación por teclado.
- [ ] No expone datos sensibles ni permisos indebidos.
- [ ] Otra persona lo revisó y lo entiende.
- [ ] La documentación o el manual de uso se actualizaron si hacía falta.
