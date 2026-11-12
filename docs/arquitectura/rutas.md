# Estructura de rutas — Sitio público y panel

> Versión 0.1 — borrador para revisión del equipo.
> Define las URLs, la organización de carpetas y qué capa resuelve cada pantalla.

## 1. Principios

- **Next.js 16 App Router.** Las rutas viven en `src/app/`.
- **Route groups** para separar el sitio público del panel: `(public)`, `(auth)` y `(admin)`. Los paréntesis no aparecen en la URL.
- **Server Components por defecto.** El cliente solo se usa cuando hay interacción real.
- **Mutaciones con Server Actions**, ubicadas en la feature correspondiente. No se crean endpoints públicos innecesarios.
- **Guardas en el servidor.** El layout del panel y cada acción verifican sesión y rol. Nunca solo en el cliente.
- **`src/proxy.ts`, no `middleware.ts`.** En Next.js 16 el archivo `middleware` fue renombrado a `proxy` y exporta `proxy()`. Se usa para refrescar la sesión de Supabase en cada request.
- **URLs públicas en español**, cortas y estables.

## 2. Sitio público

| URL | Archivo | Qué muestra | Acceso |
| --- | --- | --- | --- |
| `/` | `src/app/(public)/page.tsx` | Home: hero, presentación, beneficios y CTA de WhatsApp. | Público |
| `/la-disciplina` | `src/app/(public)/la-disciplina/page.tsx` | Qué es la práctica, cómo empezar, seguridad y FAQ. | Público |
| `/socios` | `src/app/(public)/socios/page.tsx` | Beneficios, descuentos y pasos para asociarse. | Público |
| `/contacto` | `src/app/(public)/contacto/page.tsx` | Datos de contacto, ubicación, horarios y WhatsApp. | Público |
| `404` | `src/app/not-found.tsx` | Página no encontrada con volver al inicio. | Público |

Las páginas públicas leen contenido publicado y configuración del sitio. Nunca leen borradores.

## 3. Autenticación

| URL | Archivo | Qué hace | Acceso |
| --- | --- | --- | --- |
| `/admin/login` | `src/app/(auth)/admin/login/page.tsx` | Formulario de acceso con email y contraseña. Si ya hay sesión, redirige a `/admin`. | Solo sin sesión |
| `/auth/callback` | `src/app/auth/callback/route.ts` | Intercambio de código PKCE para recuperación de contraseña o magic link. | Público |

El login vive fuera del layout del panel para no quedar atrapado en la guarda de sesión.

## 4. Panel de administración

| URL | Archivo | Qué hace | Rol |
| --- | --- | --- | --- |
| `/admin` | `src/app/(admin)/admin/page.tsx` | Resumen: cambios sin publicar y últimas acciones. | Editor / Admin |
| `/admin/contenido` | `src/app/(admin)/admin/contenido/page.tsx` | Lista de páginas editables y estado de cada una. | Editor / Admin |
| `/admin/contenido/[page]` | `src/app/(admin)/admin/contenido/[page]/page.tsx` | Bloques de una página, con estado borrador/publicado. | Editor / Admin |
| `/admin/contenido/[page]/[blockKey]` | `src/app/(admin)/admin/contenido/[page]/[blockKey]/page.tsx` | Edición de un bloque: formulario, previsualización y publicar. | Editor / Admin |
| `/admin/configuracion` | `src/app/(admin)/admin/configuracion/page.tsx` | WhatsApp, horarios, dirección, redes y SEO por defecto. | Editor / Admin |
| `/admin/imagenes` | `src/app/(admin)/admin/imagenes/page.tsx` | Subida, listado, reemplazo y borrado de imágenes. | Editor / Admin |
| `/admin/auditoria` | `src/app/(admin)/admin/auditoria/page.tsx` | Registro de acciones del panel. | Solo Admin |

`[page]` acepta `home`, `disciplina`, `socios` y `contacto`. `[blockKey]` es la clave estable del bloque (por ejemplo `home-hero`).

### Por qué estas rutas

- `/admin/contenido/[page]` agrupa por página, que es como piensa el club, no por tabla.
- `/admin/contenido/[page]/[blockKey]` permite editar un bloque sin cargar toda la página.
- La previsualización se resuelve en la misma pantalla de edición, no en una ruta aparte.
- La gestión de usuarios no entra en v1: los roles se asignan desde Supabase.

### Cómo el panel modifica la landing

1. El admin edita un bloque y se guarda en `draft_content`.
2. La previsualización muestra `draft_content` sin afectar el sitio público.
3. Al publicar, el contenido pasa a `content`, se crea una revisión y se registra la acción.
4. El sitio público lee `published_content`, por lo que el cambio aparece en la próxima visita.
5. La acción de publicar revalida la ruta pública afectada. Verificar el comportamiento de cache en la documentación local de Next.js 16 antes de implementarlo.

El panel nunca escribe directo en el HTML de la landing: escribe datos, y la landing se renderiza desde esos datos.

## 5. Árbol de archivos

```
src/
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   ├── not-found.tsx
│   ├── (public)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── la-disciplina/page.tsx
│   │   ├── socios/page.tsx
│   │   └── contacto/page.tsx
│   ├── (auth)/
│   │   ├── layout.tsx
│   │   └── admin/login/page.tsx
│   ├── (admin)/
│   │   ├── layout.tsx
│   │   └── admin/
│   │       ├── page.tsx
│   │       ├── contenido/page.tsx
│   │       ├── contenido/[page]/page.tsx
│   │       ├── contenido/[page]/[blockKey]/page.tsx
│   │       ├── configuracion/page.tsx
│   │       ├── imagenes/page.tsx
│   │       └── auditoria/page.tsx
│   └── auth/callback/route.ts
├── features/
│   ├── auth/
│   ├── content/
│   ├── settings/
│   ├── media/
│   └── audit/
├── shared/
│   ├── supabase/
│   │   ├── browser.ts
│   │   ├── server.ts
│   │   └── proxy.ts
│   ├── ui/
│   ├── lib/
│   └── types/database.types.ts
└── proxy.ts
```

## 6. Qué hace cada feature

| Feature | Responsabilidad |
| --- | --- |
| `auth` | Login, logout, sesión actual, verificación de rol. |
| `content` | Lectura pública de bloques publicados; edición, borrador, publicación, previsualización y revisiones. |
| `settings` | Lectura pública y edición de la configuración global. |
| `media` | Subida validada, metadata y reemplazo de imágenes. |
| `audit` | Registro de acciones del panel. |

Los componentes de bloque (`hero`, `rich_text`, `features`, `steps`, `faq`, `cta`) viven en `features/content/components/blocks/` y se usan tanto en el sitio público como en la previsualización del panel.

## 7. Clientes de Supabase

| Archivo | Uso | Regla |
| --- | --- | --- |
| `shared/supabase/browser.ts` | Componentes cliente | `createBrowserClient` una sola vez por navegador. |
| `shared/supabase/server.ts` | Server Components, Server Actions y Route Handlers | `createServerClient` por request, con cookies de `next/headers`. |
| `shared/supabase/proxy.ts` | Refresco de sesión en `proxy.ts` | No ejecutar código entre crear el cliente y `getUser()`. |

- El **service role / secret key** no se usa en el runtime de la app. Solo para scripts administrativos, si alguna vez hace falta.
- El sitio público lee con la clave pública y RLS; no necesita privilegios extra.
- `getUser()` es la fuente de verdad de la sesión en el servidor. No confiar en `getSession()` para autorizar.

## 8. Reglas de implementación de rutas

- Las páginas no contienen lógica de negocio: delegan en `features/`.
- Las Server Actions verifican sesión, rol y validación de datos, aunque el layout ya haya verificado.
- `params`, `searchParams`, `cookies()` y `headers()` son **asíncronos** en Next.js 16: siempre `await`.
- Cada grupo define `loading.tsx` y `error.tsx` cuando la pantalla consulta datos.
- Las rutas del panel redirigen a `/admin/login?next=<ruta>` si no hay sesión.
- Las rutas de admin responden 404 (no 403) a usuarios sin permiso, para no revelar la existencia de la sección.
- No crear `/api/*` para lecturas que puede resolver un Server Component.
- No indexar el panel: `robots.ts` debe excluir `/admin` y `/auth`.

## 9. Rutas futuras (no v1)

| URL | Cuándo |
| --- | --- |
| `/productos` y `/productos/[slug]` | Épica 13, catálogo. |
| `/admin/productos` | Épica 13, administración del catálogo. |
| `/admin/usuarios` | Cuando el club necesite autogestionar roles. |
| `/novedades` y `/novedades/[slug]` | Solo si el club confirma que quiere publicar novedades. |
