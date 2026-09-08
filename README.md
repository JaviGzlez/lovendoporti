# Lo vendo por ti · Web + portal de gestión

Marketplace controlado de maquinaria dental de segunda mano (Mario Zarzuela).
Stack: **Next.js 16 (App Router) + TypeScript + Tailwind v4 + Supabase**.

## Arrancar en local

```bash
npm install
npm run dev        # http://localhost:3000
```

Sin `.env.local` la web funciona en **modo demo** con datos de ejemplo (`src/lib/demo-data.ts`):
los formularios validan y muestran el mensaje de éxito, pero no guardan nada (lo imprimen en consola).

## Configurar Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com) (región EU, p. ej. Frankfurt).
2. En **SQL Editor** ejecuta `supabase/schema.sql` completo (tablas, RLS, buckets de storage).
3. Opcional: ejecuta `supabase/seed.sql` para tener equipos y artículos de ejemplo.
4. En **Authentication → Users** crea el usuario de Mario (email + contraseña). Es el único acceso al panel.
5. Copia `.env.example` a `.env.local` y rellena las claves de **Project Settings → API**
   y el número de WhatsApp de Mario.

## Estructura

```
supabase/schema.sql        Esquema completo (ejecutar en Supabase)
supabase/seed.sql          Datos de ejemplo
src/proxy.ts               Refresca sesión y protege /admin (antiguo middleware)
src/lib/supabase/          Clientes (servidor, navegador, service role)
src/lib/data.ts            Lectura del catálogo/blog (con fallback demo)
src/lib/actions.ts         Server Actions: contacto, lo quiero, vender, busco, eventos
src/lib/types.ts           Tipos
src/app/                   Páginas públicas + /admin (placeholder)
src/components/            UI
```

### Páginas públicas (fase 1 — hecho)

| Ruta | Qué hace |
|---|---|
| `/` | Hero, categorías, destacados, últimas incorporaciones, CTAs vender/busco, blog, quién soy, vendidos |
| `/equipos` | Catálogo con buscador, filtro por categoría, estado y orden |
| `/equipos/[slug]` | Ficha: galería, referencia LVP-xxxx, precio, estado, qué incluye, **Lo quiero** → guarda solicitud + abre WhatsApp. Si está vendido: **Busco uno similar**. JSON-LD Product para SEO |
| `/vender-mi-equipo` | Formulario con subida de fotos (bucket privado `solicitudes`) |
| `/busco-un-equipo` | Formulario que entra en el mini CRM como tipo `busco` |
| `/blog`, `/blog/[slug]` | Artículos en Markdown guardados en Supabase |
| `/quien-soy`, `/contacto`, `/aviso-legal`, `/privacidad` | Páginas estáticas |
| Botón WhatsApp flotante | Formulario previo (comprar/vender) → guarda contacto → abre WhatsApp |
| `sitemap.xml`, `robots.txt` | Generados automáticamente |

### Pendiente (fase 2 — panel privado `/admin`)

- Login (Supabase Auth) — el `proxy.ts` ya redirige a `/admin/login`.
- Dashboard: publicados / disponibles / reservados / vendidos, volumen del mes, ingresos.
- Alta y edición de equipos (fotos al bucket `equipos`, destacar, ocultar, cambiar estado).
- Marcar como vendido → registro en `ventas` (fecha, precio final, comisión, notas).
- Mini CRM de `solicitudes` con estados, notas e historial, filtros por periodo.
- Editor de artículos del blog.
- Estadísticas (vista `equipo_stats`).

## Antes de publicar

- Rellenar NIF/domicilio en `aviso-legal` y `privacidad` y revisarlos con un asesor.
- Poner la foto real de Mario en `public/mario.jpg` y usarla en `quien-soy` y la home.
- URLs reales de redes sociales en `Footer.tsx`.
- Email de contacto real (`hola@lovendoporti.es` es provisional).
- `NEXT_PUBLIC_SITE_URL` con el dominio definitivo.
