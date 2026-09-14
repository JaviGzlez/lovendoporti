-- =====================================================================
-- Migración 002: tabla de actividad interna (auditoría de Mario/Javi)
--   Ejecutar UNA sola vez en: Supabase -> SQL Editor -> New query -> Run
--   (usa "if not exists" / "drop policy if exists", así que no pasa nada
--   si por error se ejecuta dos veces)
-- =====================================================================

create table if not exists admin_eventos (
  id             uuid primary key default gen_random_uuid(),
  actor_email    text not null,
  accion         text not null,   -- 'crear' | 'editar' | 'borrar'
  entidad        text not null,   -- 'equipo' | 'articulo'
  entidad_id     uuid,
  entidad_nombre text,
  detalle        text,
  created_at     timestamptz not null default now()
);

create index if not exists admin_eventos_created_idx on admin_eventos (created_at desc);

alter table admin_eventos enable row level security;

drop policy if exists "admin_eventos insertar" on admin_eventos;
create policy "admin_eventos insertar" on admin_eventos for insert to authenticated with check (true);

drop policy if exists "admin_eventos leer" on admin_eventos;
create policy "admin_eventos leer" on admin_eventos for select to authenticated
  using (lower(auth.jwt() ->> 'email') = 'javi@lovendoportidental.es');
