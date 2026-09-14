"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Save, CheckCircle2, ExternalLink } from "lucide-react";
import { actualizarEquipo, type AdminActionResult } from "@/lib/admin/actions";
import type { Equipo } from "@/lib/types";
import { formatPrecio } from "@/lib/utils";
import SubmitButton from "@/components/SubmitButton";
import BorrarBoton from "@/components/admin/BorrarBoton";

/** Versión para componentes cliente de fotoUrl() (que es server-only). */
function fotoUrlCliente(path: string, bucket: "equipos" | "blog") {
  if (path.startsWith("http") || path.startsWith("/")) return path;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return base ? `${base}/storage/v1/object/public/${bucket}/${path}` : "";
}

export default function EquipoEditForm({ equipo }: { equipo: Equipo }) {
  const [state, action] = useActionState<AdminActionResult | null, FormData>(actualizarEquipo, null);
  const rebajado = equipo.precio_anterior != null && equipo.precio_anterior > (equipo.precio ?? 0);

  return (
    <form action={action} className="card space-y-6 p-6 sm:p-8">
      <input type="hidden" name="id" value={equipo.id} />

      {state?.ok && (
        <p className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <CheckCircle2 className="h-4 w-4" /> Cambios guardados.
        </p>
      )}
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label" htmlFor="nombre">Nombre</label>
          <input id="nombre" name="nombre" defaultValue={equipo.nombre} required className="input" />
        </div>
        <div>
          <label className="label" htmlFor="marca">Marca</label>
          <input id="marca" name="marca" defaultValue={equipo.marca ?? ""} className="input" />
        </div>
        <div>
          <label className="label" htmlFor="modelo">Modelo</label>
          <input id="modelo" name="modelo" defaultValue={equipo.modelo ?? ""} className="input" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="precio">Precio (€)</label>
          <input id="precio" name="precio" type="text" inputMode="decimal" defaultValue={equipo.precio ?? ""} className="input" placeholder="Dejar vacío para «Consultar»" />
          <p className="mt-1.5 text-xs text-muted">
            Si pones un precio menor que el actual ({formatPrecio(equipo.precio)}), la ficha mostrará el precio
            anterior tachado y la etiqueta «Rebajado» automáticamente.
          </p>
        </div>
        <div>
          <label className="label" htmlFor="estado">Estado</label>
          <select id="estado" name="estado" defaultValue={equipo.estado} className="input">
            <option value="disponible">Disponible</option>
            <option value="reservado">Reservado</option>
            <option value="vendido">Vendido</option>
          </select>
        </div>
      </div>

      {rebajado && (
        <label className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
          <input type="checkbox" name="quitar_rebaja" className="h-4 w-4 rounded border-line accent-red-600" />
          Quitar la etiqueta «Rebajado» (precio anterior: {formatPrecio(equipo.precio_anterior)}) sin cambiar el precio actual.
        </label>
      )}

      <div className="grid gap-3 sm:grid-cols-3">
        <label className="flex items-center gap-2 rounded-xl border border-line px-4 py-3 text-sm">
          <input type="checkbox" name="destacado" defaultChecked={equipo.destacado} className="h-4 w-4 rounded border-line accent-brand" />
          Destacado
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-line px-4 py-3 text-sm">
          <input type="checkbox" name="nuevo" defaultChecked={equipo.nuevo} className="h-4 w-4 rounded border-line accent-brand" />
          Etiqueta «Nuevo»
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-line px-4 py-3 text-sm">
          <input type="checkbox" name="visible" defaultChecked={equipo.visible} className="h-4 w-4 rounded border-line accent-brand" />
          Visible en la web
        </label>
      </div>

      <div>
        <label className="label" htmlFor="descripcion">Descripción</label>
        <textarea id="descripcion" name="descripcion" rows={5} defaultValue={equipo.descripcion ?? ""} className="input" />
      </div>

      <div>
        <label className="label">Fotos</label>
        {equipo.fotos.length > 0 && (
          <div className="mb-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {equipo.fotos.map((f) => (
              <label key={f} className="group relative block overflow-hidden rounded-xl border border-line">
                {/* eslint-disable-next-line @next/next/no-img-element -- ruta de Storage, no apta para next/image sin configurar el dominio */}
                <img src={fotoUrlCliente(f, "equipos")} alt="" className="aspect-square w-full object-cover" />
                <span className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-black/60 px-2 py-1 text-xs text-white">
                  <input type="checkbox" name="fotos_quitar" value={f} className="h-3.5 w-3.5" /> Quitar
                </span>
              </label>
            ))}
          </div>
        )}
        <input id="fotos_nuevas" name="fotos_nuevas" type="file" accept="image/*" multiple className="input" />
        <p className="mt-1.5 text-xs text-muted">
          Añade fotos nuevas o marca «Quitar» en las que ya no quieras. Si una foto de iPhone da error, cámbiala
          a JPG (Ajustes → Cámara → Formatos → «Más compatible») y prueba otra vez.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
        <Link
          href={`/equipos/${equipo.slug}`}
          target="_blank"
          className="flex items-center gap-1.5 text-sm text-muted hover:text-brand"
        >
          Ver ficha pública <ExternalLink className="h-3.5 w-3.5" />
        </Link>
        <div className="flex items-center gap-3">
          <BorrarBoton tipo="equipo" id={equipo.id} nombre={equipo.nombre} redirigirA="/admin/equipos" />
          <SubmitButton className="btn-primary">
            <Save className="h-4 w-4" /> Guardar cambios
          </SubmitButton>
        </div>
      </div>
    </form>
  );
}
