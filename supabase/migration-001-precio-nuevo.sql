-- =====================================================================
--  Migración: añade "precio anterior" (para mostrar Rebajado) y la
--  etiqueta "Nuevo" a los equipos.
--  Solo hace falta ejecutar esto si el proyecto de Supabase ya existía
--  de antes (es decir, si ya habías ejecutado schema.sql previamente).
--  Si es un proyecto recién creado, con ejecutar schema.sql completo
--  ya es suficiente y este archivo no hace falta.
-- =====================================================================

alter table equipos add column if not exists precio_anterior numeric(10,2);
alter table equipos add column if not exists nuevo boolean not null default false;
