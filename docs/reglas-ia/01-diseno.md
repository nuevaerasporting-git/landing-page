# Reglas de diseño con IA

> Versión 0.1 — borrador para revisión del equipo.
> Aplica a cualquier pedido de diseño: identidad visual, pantallas, componentes, estilos y copy de interfaz.

## 1. Principios

1. **La identidad se define antes que los píxeles.** No se le pide a la IA "una landing linda" sin haber definido tono, audiencia y referencias.
2. **Sistema antes que pantallas.** Primero se definen tokens y componentes; después se arman las páginas con esas piezas.
3. **Mobile-first.** Todo se diseña y revisa primero en 360 px y luego se escala a tablet y desktop.
4. **Accesible por defecto.** Contraste, foco visible, tamaños táctiles y textos legibles no son un paso final.
5. **Contenido real, no lorem ipsum.** Los textos institucionales los aporta el club. La IA puede proponer borradores, nunca inventar datos.
6. **La IA no decide la marca.** Puede proponer variantes; la elección es humana y se documenta.
7. **La pantalla de login avisa.** Debe mostrar estado de error, mensaje de rate limit cuando corresponde y un control para mostrar/ocultar la contraseña.

## 2. Contexto visual del proyecto

Antes de generar cualquier pantalla, tener a mano:

- **Qué es:** club de práctica de disciplina deportiva en María Teresa, Santa Fe.
- **Audiencia:** personas de la zona que quieren empezar, socios actuales y futuros socios.
- **Tono:** institucional, cercano y confiable. No es una marca de lujo ni una app de gaming.
- **Objetivo principal del sitio:** explicar la actividad, mostrar beneficios para socios y facilitar el contacto por WhatsApp.
- **Restricción de contenido:** sin fotos profesionales al inicio; usar fotos reales del club cuando existan o placeholders claramente marcados.

## 3. Dirección visual (mínimos del proyecto)

| Elemento | Regla |
| --- | --- |
| Paleta | Sobria y de alto contraste. Definir 1 color principal, 1 de acento y neutrales. Nada de degradados violeta genéricos. |
| Tipografía | Máximo 2 familias. Priorizar legibilidad y buen rendimiento. |
| Espaciado | Escala fija (4/8/12/16/24/32/48/64). No inventar valores sueltos. |
| Radios y sombras | Pocos valores, definidos como tokens. |
| Iconografía | Una sola familia de íconos. No mezclar estilos. |
| Imágenes | Reales o placeholder marcado. Nunca fotos de stock que simulen ser del club. |
| Animaciones | Solo si explican un cambio de estado. Nada decorativo que distraiga. |

## 4. Cómo pedirle diseño a la IA

### Como armar el prompt 

```
Usar chatgpt (mejor que gemini para esta parte), mostrarle una screenshot del instagram del objetivo para el cual van a armar la web. 
Decirle para que es la web (en este caso "Esta web es una web institucional para un club deportivo", pero puede ser cualquier cosa), pedirle que identifique paleta de colres (o en caso de tenerla agregarla manualmente al prompt), pedirle las secciones que se requieran y que agregue secciones que crea necesarias. Y agregar detalles que crean necesarios
```

### Ejemplo suponiendo que se agrego la screen del instagram
Armame un documento de diseño que tenga todo lo necesario para crear una web institucional para el club deportivo "nueva era sporting club" y que mi IA pueda seguir para armar la web. Usa como guia estetica y de identidad el instagram que te mostre. Identifica paleta de colores y secciones necesarias. Las secciones que se identificaron son estas:

Hero: *describir el hero*
Seccion de precios e info relevante para el que quiere asociarse: *describir seccion*
Seccion de noticias: *Describir seccion*
Seccion de sponsors: *describir seccion*

La web tiene que ser responsive, corta de scrollear y el documento tiene que ser un .md para que sea mas facil de reconocer por mi IA personal.


