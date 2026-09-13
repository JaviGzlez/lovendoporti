import "server-only";
import { createServerSupabase } from "@/lib/supabase/server";
import type { Categoria, Equipo, Solicitud, SolicitudNota, TipoSolicitud, EstadoSolicitud } from "@/lib/types";

const EQUIPO_SELECT = "*, categoria:categorias(*)";

/** Todos los equipos (incluidos los no visibles), para el listado del panel. */
export async function getEquiposAdmin(): Promise<Equipo[]> {
  const sb = await createServerSupabase();
  const { data } = await sb.from("equipos").select(EQUIPO_SELECT).order("created_at", { ascending: false });
  return (data ?? []) as Equipo[];
}

export async function getEquipoByIdAdmin(id: string): Promise<Equipo | null> {
  const sb = await createServerSupabase();
  const { data } = await sb.from("equipos").select(EQUIPO_SELECT).eq("id", id).maybeSingle();
  return (data as Equipo | null) ?? null;
}

export async function getCategoriasAdmin(): Promise<Categoria[]> {
  const sb = await createServerSupabase();
  const { data } = await sb.from("categorias").select("*").order("orden");
  return (data ?? []) as Categoria[];
}

export interface FiltrosSolicitudes {
  tipo?: TipoSolicitud | "todas";
  estado?: EstadoSolicitud | "todos";
}

const SOLICITUD_SELECT = "*, equipo:equipos(id, referencia, nombre, slug, precio)";

export async function getSolicitudes(filtros: FiltrosSolicitudes = {}): Promise<Solicitud[]> {
  const sb = await createServerSupabase();
  let query = sb.from("solicitudes").select(SOLICITUD_SELECT).order("created_at", { ascending: false });
  if (filtros.tipo && filtros.tipo !== "todas") query = query.eq("tipo", filtros.tipo);
  if (filtros.estado && filtros.estado !== "todos") query = query.eq("estado", filtros.estado);
  const { data } = await query;
  return (data ?? []) as Solicitud[];
}

export async function getSolicitudById(id: string): Promise<Solicitud | null> {
  const sb = await createServerSupabase();
  const { data } = await sb.from("solicitudes").select(SOLICITUD_SELECT).eq("id", id).maybeSingle();
  return (data as Solicitud | null) ?? null;
}

export async function getNotasSolicitud(solicitud_id: string): Promise<SolicitudNota[]> {
  const sb = await createServerSupabase();
  const { data } = await sb
    .from("solicitud_notas")
    .select("*")
    .eq("solicitud_id", solicitud_id)
    .order("created_at", { ascending: false });
  return (data ?? []) as SolicitudNota[];
}

export interface ResumenPanel {
  equiposDisponibles: number;
  equiposReservados: number;
  equiposVendidos: number;
  solicitudesNuevas: number;
  solicitudesPorTipo: Record<TipoSolicitud, number>;
}

export async function getResumenPanel(): Promise<ResumenPanel> {
  const sb = await createServerSupabase();
  const [{ data: equipos }, { data: nuevas }] = await Promise.all([
    sb.from("equipos").select("estado"),
    sb.from("solicitudes").select("tipo").eq("estado", "nuevo"),
  ]);

  const porEstado = { disponible: 0, reservado: 0, vendido: 0 };
  for (const e of equipos ?? []) porEstado[e.estado as keyof typeof porEstado]++;

  const porTipo: Record<TipoSolicitud, number> = { comprar: 0, vender: 0, busco: 0, lo_quiero: 0, contacto: 0 };
  for (const s of nuevas ?? []) porTipo[s.tipo as TipoSolicitud]++;

  return {
    equiposDisponibles: porEstado.disponible,
    equiposReservados: porEstado.reservado,
    equiposVendidos: porEstado.vendido,
    solicitudesNuevas: (nuevas ?? []).length,
    solicitudesPorTipo: porTipo,
  };
}
