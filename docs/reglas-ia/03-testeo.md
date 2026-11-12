# Reglas de testeo con IA

> Versión 0.1 — borrador para revisión del equipo.
> Aplica a pruebas automáticas y a la verificación manual del sitio y del panel.

## 1. Principio base

**El humano define qué se prueba; la IA ayuda a escribirlo y ejecutarlo.**

Un test vale por el caso que cubre, no por la cantidad de líneas. La IA no decide qué es importante para el club: eso sale del criterio de aceptación de cada tarea.

> Nota: el proyecto todavía no tiene framework de tests configurado. Antes de la primera tarea de testeo hay que definirlo y documentarlo. La recomendación inicial es Vitest para unitarias/integración y Playwright para los flujos del panel.

## 2. De criterio de aceptación a test

Todo test nace de una condición verificable. Si la tarea no tiene criterio de aceptación claro, primero se escribe el criterio.

| Criterio de aceptación | Test que lo cubre |
| --- | --- |
| Un visitante ve la información de la disciplina. | Smoke/E2E de la home pública. |
| Un visitante puede contactar por WhatsApp. | Test de que el enlace apunta al número configurado. |
| Un admin puede iniciar sesión y editar una novedad. | E2E del flujo completo del panel. |
| Un usuario sin permisos no accede al panel. | Integración de autorización del lado del servidor. |
| Un formulario rechaza datos inválidos. | Unitarias de validación + integración del endpoint. |
| El contenido editado se refleja en el sitio público. | Integración o E2E de publicación. |

## 3. Qué testear en este proyecto

### Unitarias

- Validaciones y utilidades (fechas, texto, formatos).
- Mappers entre persistencia y DTOs.
- Reglas de negocio puras.

### Integración

- Route Handlers o Server Actions: validación, autorización y respuesta.
- Repositorios contra una base de prueba.
- Casos de error: datos inválidos, sin sesión, sin permisos, recurso inexistente.

### End-to-end (los flujos que no pueden fallar)

1. Un visitante navega la home y llega al contacto por WhatsApp.
2. Un administrador inicia sesión.
3. Un administrador crea o edita contenido y lo publica.
4. Ese contenido aparece en el sitio público.
5. Un usuario sin permisos no puede entrar al panel.

### Lo que no se testea con automatización

- Estética y criterio visual (se revisa con el checklist de diseño).
- Contenido institucional correcto (lo valida el club).
- Usabilidad del manual del panel (se valida con una persona real usándolo).

## 4. Reglas para tests escritos con IA

- **Testear comportamiento, no implementación.** El test no debe romperse porque se renombró una función interna.
- **Un test, una razón de falla.** Nombres descriptivos: `rechaza_el_login_sin_permisos_de_admin`.
- **Debe fallar primero.** Antes de dar por bueno un test, verificar que falla por la razón correcta cuando el comportamiento no existe.
- **Sin sobre-mockeo.** Mockear solo lo externo (red, servicios, tiempo). Si se mockea todo, el test no prueba nada.
- **Deterministas.** Sin dependencias de hora real, orden aleatorio o red. Si se usa fecha, se fija.
- **Datos de prueba ficticios.** Nunca datos reales de socios, teléfonos ni credenciales.
- **Sin snapshots gigantes** que nadie revisa.
- **Nada de tests que siempre pasan** o que se saltean sin justificación.
- **La IA no "arregla" un test bajando la exigencia.** Si un test falla, se investiga el código o el criterio, no se relaja la aserción.

## 5. Cómo pedir tests a la IA

### Plantilla de pedido

```
Objetivo: cubrir [comportamiento] del módulo [X]
Contexto: leer docs/reglas-ia/03-testeo.md, [archivos] y el criterio de aceptación de la tarea
Casos obligatorios:
  - [caso feliz]
  - [caso inválido]
  - [caso sin permisos, si aplica]
Restricciones: comportamiento, no implementación; datos ficticios; deterministas
Validación: pnpm test (o el comando definido)
```

### Ejemplo malo

> "Escribí tests para todo el panel."

Problema: no define casos, prioridades ni criterios. Genera tests de relleno que dan falsa seguridad.

### Ejemplo bueno

> "Escribí tests de integración para la acción que publica una novedad. Casos: con sesión de admin válida publica y devuelve éxito; sin sesión devuelve no autorizado; con datos inválidos devuelve error de validación y no guarda. Leé docs/reglas-ia/03-testeo.md y el criterio de aceptación de la tarea."

## 6. QA manual del panel

Además de los tests, antes de entregar el panel se prueba a mano:

- [ ] Login con credenciales válidas y con credenciales inválidas.
- [ ] Cerrar sesión y verificar que no se pueda volver atrás.
- [ ] Un usuario sin permisos no ve ni accede a rutas restringidas.
- [ ] Crear, editar y publicar contenido; verificar el resultado en el sitio público.
- [ ] Estado vacío y estado con datos.
- [ ] Carga de imagen válida y archivo inválido (tipo y tamaño).
- [ ] Mensajes de error claros y en español.
- [ ] Recargar la página sin perder el estado esperado.
- [ ] Uso completo desde el celular.
- [ ] Navegación solo con teclado.

## 7. Accesibilidad y responsive en la verificación

- [ ] Contraste AA en textos y botones.
- [ ] Foco visible y orden lógico de tabulación.
- [ ] Labels asociados a los campos.
- [ ] Errores anunciados y asociados al campo correspondiente.
- [ ] Imágenes con texto alternativo cuando aportan información.
- [ ] Sin scroll horizontal en 360 px.

## 8. Cobertura

La cobertura es una señal, no un objetivo. **Se prioriza por riesgo:**

1. Seguridad del panel y permisos.
2. Publicación y edición de contenido.
3. Contacto por WhatsApp.
4. Resto del sitio.

Un 100 % de cobertura con tests triviales es peor que un 60 % que cubre los flujos críticos.

## 9. Errores típicos que hay que detectar

- Tests que pasan siempre o que no verifican nada.
- Tests acoplados a detalles internos que se rompen con cualquier refactor.
- Mockear la base, la sesión y la validación en el mismo test.
- Probar solo el caso feliz.
- Datos reales en fixtures.
- Tests que se saltean "temporalmente" y quedan así para siempre.
- Declarar una tarea terminada sin ejecutar la suite completa.
