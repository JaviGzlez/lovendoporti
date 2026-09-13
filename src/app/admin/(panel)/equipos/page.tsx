import Link from "next/link";
import type { Metadata } from "next";
import { Pencil, Plus } from "lucide-react";
import { getEquiposAdmin } from "@/lib/admin/data";
import { formatPrecio } from "@/lib/utils";
import EstadoBadge from "@/components/EstadoBadge";

export const metadata: Metadata = { title: "Equipos · Área privada" };
export const dynamic = "force-dynamic";

export default async function AdminEquiposPage() {
  const equipos = await getEquiposAdmin();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Equipos</h1>
          <p className="mt-1 text-muted">{equipos.length} equipos en el catálogo.</p>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-surface text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">Ref.</th>
                <th className="px-4 py-3">Equipo</th>
                <th className="px-4 py-3">Precio</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Etiquetas</th>
                <th className="px-4 py-3">Visible</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {equipos.map((e) => {
                const rebajado = e.precio_anterior != null && e.precio_anterior > (e.precio ?? 0);
                return (
                  <tr key={e.id} className="border-b border-line last:border-0 hover:bg-surface/60">
                    <td className="px-4 py-3 font-mono text-xs text-muted">{e.referencia}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{e.nombre}</p>
                      <p className="text-xs text-muted">{[e.marca, e.modelo].filter(Boolean).join(" · ")}</p>
                    </td>
                    <td className="px-4 py-3">
                      {rebajado && (
                        <span className="mr-1.5 text-xs text-muted line-through">{formatPrecio(e.precio_anterior)}</span>
                      )}
                      <span className={rebajado ? "font-semibold text-red-600" : ""}>{formatPrecio(e.precio)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <EstadoBadge estado={e.estado} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {e.destacado && (
                          <span className="rounded-full bg-brand-light px-2 py-0.5 text-xs font-medium text-brand">Destacado</span>
                        )}
                        {e.nuevo && (
                          <span className="rounded-full bg-brand px-2 py-0.5 text-xs font-medium text-white">Nuevo</span>
                        )}
                        {rebajado && (
                          <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">Rebajado</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {e.visible ? (
                        <span className="text-emerald-700">Sí</span>
                      ) : (
                        <span className="text-muted">Oculto</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/equipos/${e.id}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium hover:border-brand hover:text-brand"
                      >
                        <Pencil className="h-3.5 w-3.5" /> Editar
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="flex items-start gap-2 rounded-xl bg-brand-light/60 p-4 text-sm text-ink/80">
        <Plus className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
        Para añadir un equipo nuevo al catálogo (con sus fotos), de momento pídemelo y lo subo yo. Más adelante
        podemos añadir aquí también el alta con subida de fotos si os interesa.
      </p>
    </div>
  );
}
