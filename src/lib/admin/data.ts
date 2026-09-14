import "server-only";
import { createServerSupabase } from "@/lib/supabase/server";
import type {
  Articulo,
  AdminEvento,
  Categoria,
  Equipo,
  Solicitud,
  SolicitudNota,
  TipoSolicitud,
  EstadoSolicitud,
} from "@/lib/types";

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
  ventasDelMes: { numVentas: number; totalFacturado: number };
}

export async function getResumenPanel(): Promise<ResumenPanel> {
  const sb = await createServerSupabase();
  const [{ data: equipos }, { data: nuevas }, ventasDelMes] = await Promise.all([
    sb.from("equipos").select("estado"),
    sb.from("solicitudes").select("tipo").eq("estado", "nuevo"),
    getVentasDelMesActual(),
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
    ventasDelMes,
  };
}

// ---------------------------------------------------------------------------
// Blog (panel)
// ---------------------------------------------------------------------------
export async function getArticulosAdmin(): Promise<Articulo[]> {
  const sb = await createServerSupabase();
  const { data } = await sb.from("articulos").select("*").order("created_at", { ascending: false });
  return (data ?? []) as Articulo[];
}

export async function getArticuloByIdAdmin(id: string): Promise<Articulo | null> {
  const sb = await createServerSupabase();
  const { data } = await sb.from("articulos").select("*").eq("id", id).maybeSingle();
  return (data as Articulo | null) ?? null;
}

// ---------------------------------------------------------------------------
// Ventas
// ---------------------------------------------------------------------------
export interface ResumenVentaMes {
  mes: string; // "2026-01"
  etiqueta: string; // "Enero 2026"
  numVentas: number;
  totalFacturado: number;
  totalIngreso: number;
}

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

export async function getVentasPorMes(): Promise<ResumenVentaMes[]> {
  const sb = await createServerSupabase();
  const { data } = await sb.from("ventas").select("fecha, precio_final, ingreso");

  const porMes = new Map<string, ResumenVentaMes>();
  for (const v of data ?? []) {
    const mes = String(v.fecha).slice(0, 7); // "YYYY-MM"
    const [anio, mesNum] = mes.split("-");
    const etiqueta = `${MESES[Number(mesNum) - 1] ?? mes} ${anio}`;
    const actual = porMes.get(mes) ?? { mes, etiqueta, numVentas: 0, totalFacturado: 0, totalIngreso: 0 };
    actual.numVentas += 1;
    actual.totalFacturado += Number(v.precio_final ?? 0);
    actual.totalIngreso += Number(v.ingreso ?? 0);
    porMes.set(mes, actual);
  }
  return Array.from(porMes.values()).sort((a, b) => b.mes.localeCompare(a.mes));
}

export async function getVentasDelMesActual(): Promise<{ numVentas: number; totalFacturado: number }> {
  const mesActual = new Date().toISOString().slice(0, 7);
  const meses = await getVentasPorMes();
  const actual = meses.find((m) => m.mes === mesActual);
  return { numVentas: actual?.numVentas ?? 0, totalFacturado: actual?.totalFacturado ?? 0 };
}

// ---------------------------------------------------------------------------
// Actividad (historial de creación/edición/borrado) — solo lo ve Javi.
// La propia base de datos (RLS) ya impide que Mario lea esta tabla aunque
// alguien intentara acceder directamente a esta función.
// ---------------------------------------------------------------------------
export async function getEventosAdmin(limit = 200): Promise<AdminEvento[]> {
  const sb = await createServerSupabase();
  const { data } = await sb
    .from("admin_eventos")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data ?? []) as AdminEvento[];
}
