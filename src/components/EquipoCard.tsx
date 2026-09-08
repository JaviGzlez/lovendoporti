import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Equipo } from "@/lib/types";
import { formatPrecio } from "@/lib/utils";
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
  return (
    <Link href={`/equipos/${equipo.slug}`} className="card group flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative">
        <EquipoFoto path={equipo.fotos[0]} alt={equipo.nombre} className="aspect-[4/3]" />
        <EstadoBadge estado={equipo.estado} className="absolute bottom-3 left-3 shadow-sm ring-1 ring-black/5" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-semibold leading-snug">{equipo.nombre}</h3>
        <p className="text-sm text-muted">{subtitulo(equipo)}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold">{formatPrecio(equipo.precio)}</span>
          <ArrowRight className="h-5 w-5 text-ink/60 transition group-hover:translate-x-1 group-hover:text-brand" />
        </div>
      </div>
    </Link>
  );
}
