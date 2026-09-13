import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Equipo } from "@/lib/types";
import { cn, formatPrecio } from "@/lib/utils";
import EstadoBadge from "./EstadoBadge";
import EquipoFoto from "./EquipoFoto";

function subtitulo(e: Equipo) {
  const partes: string[] = [];
  if (e.horas_uso != null) partes.push(e.horas_uso === 0 ? "Sin uso" : `${e.horas_uso.toLocaleString("es-ES")} horas`);
  if (e.anio) partes.push(`Año ${e.anio}`);
  if (!partes.length && e.categoria) partes.push(e.categoria.nombre);
  return partes.join(" · ");
}

export default function EquipoCard({ equipo }: { equipo: Equipo }) {
  const rebajado = equipo.precio_anterior != null && equipo.precio_anterior > (equipo.precio ?? 0);
  return (
    <Link href={`/equipos/${equipo.slug}`} className="card group flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative">
        <EquipoFoto path={equipo.fotos[0]} alt={equipo.nombre} className="aspect-[4/3]" />
        <EstadoBadge estado={equipo.estado} className="absolute bottom-3 left-3 shadow-sm ring-1 ring-black/5" />
        <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5">
          {equipo.nuevo && (
            <span className="rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white shadow-sm">Nuevo</span>
          )}
          {rebajado && (
            <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">Rebajado</span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-semibold leading-snug">{equipo.nombre}</h3>
        <p className="text-sm text-muted">{subtitulo(equipo)}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="flex items-baseline gap-2">
            {rebajado && (
              <span className="text-sm text-muted line-through">{formatPrecio(equipo.precio_anterior)}</span>
            )}
            <span className={cn("text-lg font-bold", rebajado && "text-red-600")}>{formatPrecio(equipo.precio)}</span>
          </span>
          <ArrowRight className="h-5 w-5 text-ink/60 transition group-hover:translate-x-1 group-hover:text-brand" />
        </div>
      </div>
    </Link>
  );
}
