import Link from "next/link";
import type { Metadata } from "next";
import { Pencil, Plus } from "lucide-react";
import { getArticulosAdmin } from "@/lib/admin/data";
import { formatFecha } from "@/lib/utils";
import BorrarBoton from "@/components/admin/BorrarBoton";

export const metadata: Metadata = { title: "Blog · Área privada" };
export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const articulos = await getArticulosAdmin();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog</h1>
          <p className="mt-1 text-muted">{articulos.length} artículos.</p>
        </div>
        <Link href="/admin/blog/nuevo" className="btn-primary">
          <Plus className="h-4 w-4" /> Nuevo artículo
        </Link>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-surface text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3" />
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {articulos.map((a) => (
                <tr key={a.id} className="border-b border-line last:border-0 hover:bg-surface/60">
                  <td className="px-4 py-3 font-medium">{a.titulo}</td>
                  <td className="px-4 py-3">
                    {a.publicado ? (
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                        Publicado
                      </span>
                    ) : (
                      <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-muted">
                        Borrador
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted">{formatFecha(a.publicado_at)}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/blog/${a.id}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium hover:border-brand hover:text-brand"
                    >
                      <Pencil className="h-3.5 w-3.5" /> Editar
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <BorrarBoton tipo="articulo" id={a.id} nombre={a.titulo} />
                  </td>
                </tr>
              ))}
              {articulos.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted">
                    Todavía no hay artículos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
