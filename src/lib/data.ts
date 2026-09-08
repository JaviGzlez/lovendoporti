import "server-only";
import { createPublicSupabase, supabaseConfigured } from "./supabase/server";
import { demoArticulos, demoCategorias, demoEquipos } from "./demo-data";
import type { Articulo, Categoria, Equipo, EstadoEquipo } from "./types";

export const isDemo = !supabaseConfigured;

export interface FiltrosCatalogo {
  q?: string;
  categoria?: string; // slug
  estado?: EstadoEquipo | "todos";
  orden?: "recientes" | "precio-asc" | "precio-desc";
}

function withCategoria(e: Equipo, cats: Categoria[]): Equipo {
  return { ...e, categoria: cats.find((c) => c.id === e.categoria_id) ?? null };
}

// ---------------------------------------------------------------------------
// Categorías
// ---------------------------------------------------------------------------
export async function getCategorias(): Promise<Categoria[]> {
  if (isDemo) return demoCategorias;
  const sb = createPublicSupabase();
  const { data } = await sb.from("categorias").select("*").order("orden");
  return (data ?? []) as Categoria[];
}

// ---------------------------------------------------------------------------
// Equipos
// ---------------------------------------------------------------------------
const EQUIPO_SELECT = "*, categoria:categorias(*)";

export async function getEquipos(filtros: FiltrosCatalogo = {}): Promise<Equipo[]> {
  const { q, categoria, estado = "todos", orden = "recientes" } = filtros;

  if (isDemo) {
    const cats = demoCategorias;
    let list = demoEquipos.map((e) => withCategoria(e, cats));
    if (categoria) list = list.filter((e) => e.categoria?.slug === categoria);
    if (estado !== "todos") list = list.filter((e) => e.estado === estado);
    if (q) {
      const s = q.toLowerCase();
      list = list.filter((e) =>
        [e.nombre, e.marca, e.modelo, e.referencia].join(" ").toLowerCase().includes(s)
      );
    }
    return sortEquipos(list, orden);
  }

  const sb = createPublicSupabase();
  let query = sb.from("equipos").select(EQUIPO_SELECT).eq("visible", true);
  if (estado !== "todos") query = query.eq("estado", estado);
  if (q) {
    const like = `%${q.replace(/[%_]/g, "")}%`;
    query = query.or(
      `nombre.ilike.${like},marca.ilike.${like},modelo.ilike.${like},referencia.ilike.${like}`
    );
  }
  if (categoria) {
    const cats = await getCategorias();
    const cat = cats.find((c) => c.slug === categoria);
    if (cat) query = query.eq("categoria_id", cat.id);
  }
  if (orden === "precio-asc") query = query.order("precio", { ascending: true, nullsFirst: false });
  else if (orden === "precio-desc") query = query.order("precio", { ascending: false });
  else query = query.order("created_at", { ascending: false });

  const { data } = await query;
  return (data ?? []) as Equipo[];
}

function sortEquipos(list: Equipo[], orden: FiltrosCatalogo["orden"]) {
  const copy = [...list];
  if (orden === "precio-asc") copy.sort((a, b) => (a.precio ?? 0) - (b.precio ?? 0));
  else if (orden === "precio-desc") copy.sort((a, b) => (b.precio ?? 0) - (a.precio ?? 0));
  else copy.sort((a, b) => b.created_at.localeCompare(a.created_at));
  return copy;
}

export async function getEquipoBySlug(slug: string): Promise<Equipo | null> {
  if (isDemo) {
    const e = demoEquipos.find((x) => x.slug === slug);
    return e ? withCategoria(e, demoCategorias) : null;
  }
  const sb = createPublicSupabase();
  const { data } = await sb
    .from("equipos")
    .select(EQUIPO_SELECT)
    .eq("slug", slug)
    .eq("visible", true)
    .maybeSingle();
  return (data as Equipo | null) ?? null;
}

export async function getEquiposDestacados(limit = 4) {
  const all = await getEquipos({ estado: "todos" });
  const destacados = all.filter((e) => e.destacado && e.estado !== "vendido");
  return destacados.slice(0, limit);
}

export async function getUltimosEquipos(limit = 4) {
  const all = await getEquipos({ estado: "disponible" });
  return all.slice(0, limit);
}

export async function getEquiposVendidos(limit = 4) {
  const all = await getEquipos({ estado: "vendido" });
  return all
    .sort((a, b) => (b.vendido_at ?? "").localeCompare(a.vendido_at ?? ""))
    .slice(0, limit);
}

export async function getEquiposSimilares(equipo: Equipo, limit = 3) {
  const all = await getEquipos({ estado: "disponible" });
  return all
    .filter((e) => e.id !== equipo.id)
    .sort((a, b) => {
      const sa = a.categoria_id === equipo.categoria_id ? 1 : 0;
      const sb = b.categoria_id === equipo.categoria_id ? 1 : 0;
      return sb - sa;
    })
    .slice(0, limit);
}

// ---------------------------------------------------------------------------
// Blog
// ---------------------------------------------------------------------------
export async function getArticulos(limit?: number): Promise<Articulo[]> {
  if (isDemo) return limit ? demoArticulos.slice(0, limit) : demoArticulos;
  const sb = createPublicSupabase();
  let q = sb
    .from("articulos")
    .select("*")
    .eq("publicado", true)
    .order("publicado_at", { ascending: false });
  if (limit) q = q.limit(limit);
  const { data } = await q;
  return (data ?? []) as Articulo[];
}

export async function getArticuloBySlug(slug: string): Promise<Articulo | null> {
  if (isDemo) return demoArticulos.find((a) => a.slug === slug) ?? null;
  const sb = createPublicSupabase();
  const { data } = await sb
    .from("articulos")
    .select("*")
    .eq("slug", slug)
    .eq("publicado", true)
    .maybeSingle();
  return (data as Articulo | null) ?? null;
}

// ---------------------------------------------------------------------------
// Fotos: convierte una ruta del bucket en URL pública
// ---------------------------------------------------------------------------
export function fotoUrl(path: string | null | undefined, bucket = "equipos"): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  return `${base}/storage/v1/object/public/${bucket}/${path}`;
}
