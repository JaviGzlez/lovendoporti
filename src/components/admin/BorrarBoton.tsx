"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { borrarEquipo, borrarArticulo } from "@/lib/admin/actions";

export default function BorrarBoton({
  tipo,
  id,
  nombre,
  redirigirA,
}: {
  tipo: "equipo" | "articulo";
  id: string;
  nombre: string;
  redirigirA?: string;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const etiqueta = tipo === "equipo" ? "este equipo" : "este artículo";

  return (
    <div className="inline-block text-left">
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          if (!window.confirm(`¿Seguro que quieres borrar ${etiqueta} («${nombre}»)? No se puede deshacer.`)) return;
          setError(null);
          startTransition(async () => {
            const res = tipo === "equipo" ? await borrarEquipo(id) : await borrarArticulo(id);
            if (!res.ok) {
              setError(res.error ?? "No se pudo borrar.");
              return;
            }
            if (redirigirA) router.push(redirigirA);
            router.refresh();
          });
        }}
        className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:border-red-400 hover:bg-red-50 disabled:opacity-50"
      >
        <Trash2 className="h-3.5 w-3.5" /> {pending ? "Borrando…" : "Borrar"}
      </button>
      {error && <p className="mt-1 max-w-[220px] text-xs text-red-600">{error}</p>}
    </div>
  );
}
