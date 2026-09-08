import type { Metadata } from "next";
import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { getCategorias, getEquipos, type FiltrosCatalogo } from "@/lib/data";
import EquipoCard from "@/components/EquipoCard";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Equipos dentales de segunda mano",
  description:
    "Catálogo de fresadoras, escáneres, hornos, impresoras 3D y más maquinaria dental de segunda mano revisada.",
};

const ESTADOS = [
  { value: "todos", label: "Todos" },
  { value: "disponible", label: "Disponibles" },
  { value: "reservado", label: "Reservados" },
  { value: "vendido", label: "Vendidos" },
] as const;

export default async function EquiposPage({ searchParams }: PageProps<"/equipos">) {
  const sp = await searchParams;
  const get = (k: string) => (Array.isArray(sp[k]) ? sp[k]?.[0] : sp[k]) as string | undefined;

  const filtros: FiltrosCatalogo = {
    q: get("q") || undefined,
    categoria: get("categoria") || undefined,
    estado: (get("estado") as FiltrosCatalogo["estado"]) || "todos",
    orden: (get("orden") as FiltrosCatalogo["orden"]) || "recientes",
  };

  const [categorias, equipos] = await Promise.all([getCategorias(), getEquipos(filtros)]);
  const catActual = categorias.find((c) => c.slug === filtros.categoria);

  const buildHref = (patch: Partial<Record<string, string | undefined>>) => {
    const p = new URLSearchParams();
    const merged = { ...filtros, ...patch };
    if (merged.q) p.set("q", merged.q);
    if (merged.categoria) p.set("categoria", merged.categoria);
    if (merged.estado && merged.estado !== "todos") p.set("estado", merged.estado);
    if (merged.orden && merged.orden !== "recientes") p.set("orden", merged.orden);
    const s = p.toString();
    return s ? `/equipos?${s}` : "/equipos";
  };

  return (
    <div className="container-lv py-10 lg:py-14">
      <div className="mb-8">
        <p className="eyebrow mb-2">Catálogo</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {catActual ? catActual.nombre : "Equipos dentales de segunda mano"}
        </h1>
        <p className="mt-2 text-muted">
          Cada equipo está revisado y publicado con información real. ¿No encuentras lo que buscas?{" "}
          <Link href="/busco-un-equipo" className="text-brand underline">
            Cuéntanoslo
          </Link>
          .
        </p>
      </div>

      {/* Buscador */}
      <form action="/equipos" className="mb-6 flex gap-2">
        {filtros.categoria && <input type="hidden" name="categoria" value={filtros.categoria} />}
        {filtros.estado !== "todos" && <input type="hidden" name="estado" value={filtros.estado} />}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            name="q"
            defaultValue={filtros.q}
            placeholder="Buscar por marca, modelo o referencia (ej. Roland DWX-52D)"
            className="input pl-11"
          />
        </div>
        <button className="btn-primary">Buscar</button>
      </form>

      {/* Categorías */}
      <div className="mb-4 flex flex-wrap gap-2">
        <Link
          href={buildHref({ categoria: undefined })}
          className={cn("rounded-full border px-4 py-1.5 text-sm", !filtros.categoria ? "border-ink bg-ink text-white" : "border-line hover:border-ink")}
        >
          Todas
        </Link>
        {categorias.map((c) => (
          <Link
            key={c.id}
            href={buildHref({ categoria: c.slug })}
            className={cn("rounded-full border px-4 py-1.5 text-sm", filtros.categoria === c.slug ? "border-ink bg-ink text-white" : "border-line hover:border-ink")}
          >
            {c.nombre}
          </Link>
        ))}
      </div>

      {/* Estado + orden */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-6">
        <div className="flex flex-wrap gap-1 text-sm">
          {ESTADOS.map((e) => (
            <Link
              key={e.value}
              href={buildHref({ estado: e.value })}
              className={cn("rounded-lg px-3 py-1.5", filtros.estado === e.value ? "bg-brand-light font-semibold text-brand" : "text-muted hover:text-ink")}
            >
              {e.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted">
          <SlidersHorizontal className="h-4 w-4" />
          <Link href={buildHref({ orden: "recientes" })} className={cn("hover:text-ink", filtros.orden === "recientes" && "font-semibold text-ink")}>Recientes</Link>
          <span>·</span>
          <Link href={buildHref({ orden: "precio-asc" })} className={cn("hover:text-ink", filtros.orden === "precio-asc" && "font-semibold text-ink")}>Precio ↑</Link>
          <span>·</span>
          <Link href={buildHref({ orden: "precio-desc" })} className={cn("hover:text-ink", filtros.orden === "precio-desc" && "font-semibold text-ink")}>Precio ↓</Link>
        </div>
      </div>

      {equipos.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {equipos.map((e) => (
            <EquipoCard key={e.id} equipo={e} />
          ))}
        </div>
      ) : (
        <div className="card p-12 text-center">
          <p className="text-lg font-semibold">No hay equipos con esos filtros.</p>
          <p className="mt-2 text-muted">
            Dinos qué buscas y te avisamos en cuanto entre uno.
          </p>
          <Link href="/busco-un-equipo" className="btn-primary mt-6">
            Busco un equipo
          </Link>
        </div>
      )}
    </div>
  );
}
