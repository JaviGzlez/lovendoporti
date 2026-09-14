"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Save, Plus, CheckCircle2, ExternalLink } from "lucide-react";
import { crearArticulo, actualizarArticulo, type AdminActionResult } from "@/lib/admin/actions";
import type { Articulo } from "@/lib/types";
import SubmitButton from "@/components/SubmitButton";

export default function ArticuloForm({ articulo }: { articulo?: Articulo }) {
  const accion = articulo ? actualizarArticulo : crearArticulo;
  const [state, action] = useActionState<AdminActionResult | null, FormData>(accion, null);

  return (
    <form action={action} className="card space-y-6 p-6 sm:p-8">
      {articulo && <input type="hidden" name="id" value={articulo.id} />}

      {state?.ok && (
        <p className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <CheckCircle2 className="h-4 w-4" /> Cambios guardados.
        </p>
      )}
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <div>
        <label className="label" htmlFor="titulo">Título</label>
        <input id="titulo" name="titulo" required defaultValue={articulo?.titulo ?? ""} className="input" />
      </div>
      <div>
        <label className="label" htmlFor="extracto">Extracto (resumen corto para las tarjetas)</label>
        <textarea id="extracto" name="extracto" rows={2} defaultValue={articulo?.extracto ?? ""} className="input" />
      </div>
      <div>
        <label className="label" htmlFor="portada">Portada (ruta de la imagen)</label>
        <input
          id="portada"
          name="portada"
          defaultValue={articulo?.portada ?? ""}
          className="input"
          placeholder="/equipos/mi-foto.webp"
        />
        <p className="mt-1.5 text-xs text-muted">Si no tienes imagen todavía, déjalo en blanco.</p>
      </div>
      <div>
        <label className="label" htmlFor="contenido">Contenido (formato Markdown)</label>
        <textarea
          id="contenido"
          name="contenido"
          rows={16}
          defaultValue={articulo?.contenido ?? ""}
          className="input font-mono text-sm"
        />
        <p className="mt-1.5 text-xs text-muted">
          Puedes usar ## para títulos, líneas que empiecen por - para listas, y **texto** para negrita. Si
          prefieres, pídeme que te escriba el artículo entero y lo pegas aquí.
        </p>
      </div>
      <label className="flex items-center gap-2 rounded-xl border border-line px-4 py-3 text-sm">
        <input
          type="checkbox"
          name="publicado"
          defaultChecked={articulo?.publicado ?? false}
          className="h-4 w-4 rounded border-line accent-brand"
        />
        Publicado (visible en la web)
      </label>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
        {articulo ? (
          <Link
            href={`/blog/${articulo.slug}`}
            target="_blank"
            className="flex items-center gap-1.5 text-sm text-muted hover:text-brand"
          >
            Ver artículo público <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        ) : (
          <span />
        )}
        <SubmitButton className="btn-primary">
          {articulo ? (
            <>
              <Save className="h-4 w-4" /> Guardar cambios
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" /> Crear artículo
            </>
          )}
        </SubmitButton>
      </div>
    </form>
  );
}
