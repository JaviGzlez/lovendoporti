-- =====================================================================
--  LO VENDO POR TI · Esquema de base de datos (Supabase / Postgres)
--  Ejecutar completo en: Supabase -> SQL Editor -> New query -> Run
-- =====================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- Tipos
-- ---------------------------------------------------------------------
create type estado_equipo as enum ('disponible', 'reservado', 'vendido');
create type tipo_solicitud as enum ('comprar', 'vender', 'busco', 'lo_quiero', 'contacto');
create type estado_solicitud as enum ('nuevo', 'contactado', 'negociacion', 'cerrado', 'descartado');
create type tipo_evento as enum ('visita', 'lo_quiero', 'whatsapp');

-- ---------------------------------------------------------------------
-- Utilidades
-- ---------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- Secuencia para la referencia automática LVP-0001, LVP-0002...
create sequence if not exists equipos_ref_seq start 1;

create or replace function next_referencia()
returns text language sql as $$
  select 'LVP-' || lpad(nextval('equipos_ref_seq')::text, 4, '0');
$$;

-- ---------------------------------------------------------------------
-- Categorías
-- ---------------------------------------------------------------------
create table categorias (
  id        serial primary key,
  slug      text not null unique,
  nombre    text not null,
  icono     text,            -- nombre de icono lucide (ver src/components/CategoryIcon.tsx)
  orden     int  not null default 0
);

insert into categorias (slug, nombre, icono, orden) values
  ('fresadoras',    'Fresadoras',    'Cog',         1),
  ('escaneres',     'Escáneres',     'ScanLine',    2),
  ('hornos',        'Hornos',        'Flame',       3),
  ('impresion-3d',  'Impresión 3D',  'Printer',     4),
  ('aspiracion',    'Aspiración',    'Wind',        5),
  ('microscopios',  'Microscopios',  'Microscope',  6),
  ('equipamiento',  'Equipamiento',  'Wrench',      7),
  ('otros',         'Otros',         'MoreHorizontal', 8);

-- ---------------------------------------------------------------------
-- Equipos (catálogo)
-- ---------------------------------------------------------------------
create table equipos (
  id            uuid primary key default gen_random_uuid(),
  referencia    text not null unique default next_referencia(),
  slug          text not null unique,
  nombre        text not null,
  marca         text,
  modelo        text,
  categoria_id  int references categorias(id),
  precio        numeric(10,2),
  estado        estado_equipo not null default 'disponible',
  anio          int,
  horas_uso     int,
  descripcion   text,
  incluye       text,          -- "Qué incluye" (una línea por elemento)
  video_url     text,
  fotos         text[] not null default '{}',  -- rutas dentro del bucket "equipos"
  destacado     boolean not null default false,
  visible       boolean not null default true,
  vendido_at    timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create trigger equipos_updated_at before update on equipos
  for each row execute function set_updated_at();

create index equipos_estado_idx on equipos (estado);
create index equipos_categoria_idx on equipos (categoria_id);
create index equipos_created_idx on equipos (created_at desc);

-- ---------------------------------------------------------------------
-- Solicitudes (mini CRM): comprar / vender / busco / lo quiero / contacto
-- ---------------------------------------------------------------------
create table solicitudes (
  id             uuid primary key default gen_random_uuid(),
  tipo           tipo_solicitud not null,
  estado         estado_solicitud not null default 'nuevo',
  nombre         text not null,
  telefono       text not null,
  email          text,
  mensaje        text,
  equipo_id      uuid references equipos(id) on delete set null, -- "Lo quiero"
  -- Campos de "Vender mi equipo" y "Busco un equipo"
  tipo_equipo    text,
  marca          text,
  modelo         text,
  anio           int,
  precio_deseado numeric(10,2),  -- vender
  presupuesto    numeric(10,2),  -- busco
  fotos          text[] not null default '{}',  -- rutas dentro del bucket "solicitudes"
  consentimiento boolean not null default false,
  origen         text,            -- página desde la que se envió
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create trigger solicitudes_updated_at before update on solicitudes
  for each row execute function set_updated_at();

create index solicitudes_estado_idx on solicitudes (estado);
create index solicitudes_created_idx on solicitudes (created_at desc);

-- Historial de notas / seguimiento de cada solicitud
create table solicitud_notas (
  id            uuid primary key default gen_random_uuid(),
  solicitud_id  uuid not null references solicitudes(id) on delete cascade,
  nota          text not null,
  created_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Ventas: registro al marcar un equipo como vendido
-- ---------------------------------------------------------------------
create table ventas (
  id            uuid primary key default gen_random_uuid(),
  equipo_id     uuid not null references equipos(id),
  solicitud_id  uuid references solicitudes(id) on delete set null,
  fecha         date not null default current_date,
  precio_final  numeric(10,2) not null,   -- volumen vendido
  ingreso       numeric(10,2) not null default 0, -- comisión / ingreso real de LVPT
  notas         text,
  created_at    timestamptz not null default now()
);

create index ventas_fecha_idx on ventas (fecha desc);

-- ---------------------------------------------------------------------
-- Blog
-- ---------------------------------------------------------------------
create table articulos (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  titulo        text not null,
  extracto      text,
  contenido     text,            -- Markdown
  portada       text,            -- ruta dentro del bucket "blog"
  publicado     boolean not null default false,
  publicado_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create trigger articulos_updated_at before update on articulos
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------
-- Eventos (estadísticas básicas)
-- ---------------------------------------------------------------------
create table eventos (
  id          bigserial primary key,
  tipo        tipo_evento not null,
  equipo_id   uuid references equipos(id) on delete cascade,
  created_at  timestamptz not null default now()
);

create index eventos_equipo_idx on eventos (equipo_id, tipo);

-- ---------------------------------------------------------------------
-- Vista de estadísticas por equipo (para el panel)
-- ---------------------------------------------------------------------
create or replace view equipo_stats as
select
  e.id,
  e.referencia,
  e.nombre,
  e.estado,
  count(*) filter (where ev.tipo = 'visita')   as visitas,
  count(*) filter (where ev.tipo = 'lo_quiero') as clics_lo_quiero,
  count(*) filter (where ev.tipo = 'whatsapp')  as contactos_whatsapp
from equipos e
left join eventos ev on ev.equipo_id = e.id
group by e.id;

-- =====================================================================
-- SEGURIDAD (RLS)
--   · Público (anon): leer catálogo visible, categorías y artículos
--     publicados; insertar solicitudes y eventos.
--   · Administrador (authenticated): todo.
-- =====================================================================
alter table categorias      enable row level security;
alter table equipos         enable row level security;
alter table solicitudes     enable row level security;
alter table solicitud_notas enable row level security;
alter table ventas          enable row level security;
alter table articulos       enable row level security;
alter table eventos         enable row level security;

-- Lectura pública
create policy "categorias publicas" on categorias for select using (true);
create policy "equipos visibles" on equipos for select using (visible = true);
create policy "articulos publicados" on articulos for select using (publicado = true);

-- Escritura pública limitada
create policy "crear solicitud" on solicitudes for insert
  with check (estado = 'nuevo' and consentimiento = true);
create policy "registrar evento" on eventos for insert with check (true);

-- Administrador (cualquier usuario autenticado; solo Mario tendrá cuenta)
create policy "admin categorias"  on categorias      for all to authenticated using (true) with check (true);
create policy "admin equipos"     on equipos         for all to authenticated using (true) with check (true);
create policy "admin solicitudes" on solicitudes     for all to authenticated using (true) with check (true);
create policy "admin notas"       on solicitud_notas for all to authenticated using (true) with check (true);
create policy "admin ventas"      on ventas          for all to authenticated using (true) with check (true);
create policy "admin articulos"   on articulos       for all to authenticated using (true) with check (true);
create policy "admin eventos"     on eventos         for all to authenticated using (true) with check (true);

-- =====================================================================
-- STORAGE
--   equipos      -> público (fotos de fichas, las sube el admin)
--   blog         -> público (portadas de artículos)
--   solicitudes  -> privado (fotos que suben los vendedores desde la web;
--                   se suben desde el servidor con la service role key)
-- =====================================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types) values
  ('equipos',     'equipos',     true,  10485760, array['image/jpeg','image/png','image/webp']),
  ('blog',        'blog',        true,  10485760, array['image/jpeg','image/png','image/webp']),
  ('solicitudes', 'solicitudes', false, 10485760, array['image/jpeg','image/png','image/webp']);

create policy "leer fotos publicas" on storage.objects for select
  using (bucket_id in ('equipos', 'blog'));

create policy "admin storage" on storage.objects for all to authenticated
  using (bucket_id in ('equipos', 'blog', 'solicitudes'))
  with check (bucket_id in ('equipos', 'blog', 'solicitudes'));
