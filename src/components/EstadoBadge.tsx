import { ESTADO_LABEL, type EstadoEquipo } from "@/lib/types";
import { cn } from "@/lib/utils";

const STYLES: Record<EstadoEquipo, string> = {
  disponible: "bg-emerald-100 text-emerald-800",
  reservado: "bg-amber-100 text-amber-800",
  vendido: "bg-slate-200 text-slate-700",
};

export default function EstadoBadge({ estado, className }: { estado: EstadoEquipo; className?: string }) {
  return (
    <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", STYLES[estado], className)}>
      {ESTADO_LABEL[estado]}
    </span>
  );
}
