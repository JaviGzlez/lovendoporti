"use client";

import { useActionState } from "react";
import { Plus } from "lucide-react";
import { crearEquipo, type AdminActionResult } from "@/lib/admin/actions";
import type { Categoria } from "@/lib/types";
import SubmitButton from "@/components/SubmitButton";

export default function EquipoNuevoForm({ categorias }: { categorias: Categoria[] }) {
  const [state, action] = useActionState<AdminActionResult | null, FormData>(crearEquipo, null);

  return (
    <form action={action} className="card space-y-6 p-6 sm:p-8">
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label" htmlFor="nombre">Nombre</label>
          <input id="nombre" name="nombre" required className="input" placeholder="Ej. Fresadora Roland DWX-52DCi" />
        </div>
        <div>
          <label className="label" htmlFor="marca">Marca</label>
          <input id="marca" name="marca" className="input" />
        </div>
        <div>
          <label className="label" htmlFor="modelo">Modelo</label>
          <input id="modelo" name="modelo" className="input" />
        </div>
        <div>
          <label className="label" htmlFor="categoria_id">Categoría</label>
          <select id="categoria_id" name="categoria_id" className="input" defaultValue="">
            <option value="">Sin categoría</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
          <p className="mt-1.5 text-xs text-muted">Decide en qué filtro del catálogo aparece (Fresadoras, Hornos, etc.).</p>
        </div>
        <div>
          <label className="label" htmlFor="precio">Precio (€)</label>
          <input id="precio" name="precio" type="text" inputMode="decimal" className="input" placeholder="Dejar vacío para «Consultar»" />
        </div>
        <div>
          <label className="label" htmlFor="anio">Año</label>
          <input id="anio" name="anio" type="number" className="input" />
        </div>
        <div>
          <label className="label" htmlFor="horas_uso">Horas de uso</label>
          <input id="horas_uso" name="horas_uso" type="number" className="input" />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="descripcion">Descripción</label>
        <textarea id="descripcion" name="descripcion" rows={4} className="input" />
      </div>
      <div>
        <label className="label" htmlFor="incluye">Qué incluye (una línea por elemento)</label>
        <textarea id="incluye" name="incluye" rows={3} className="input" />
      </div>
      <div>
        <label className="label" htmlFor="fotos_nuevas">Fotos (puedes elegir varias a la vez)</label>
        <input id="fotos_nuevas" name="fotos_nuevas" type="file" accept="image/*" multiple className="input" />
        <p className="mt-1.5 text-xs text-muted">
          Se suben y se ajustan solas. Si usas iPhone y alguna foto da error, en Ajustes → Cámara → Formatos
          elige «Más compatible» y vuelve a intentarlo (o compártela por WhatsApp contigo mismo y sube esa copia).
          Si todavía no tienes fotos, déjalo en blanco y publica el equipo igual.
        </p>
      </div>
      <div>
        <label className="label" htmlFor="fotos">¿Ya tienes fotos subidas en otro sitio? (opcional, avanzado)</label>
        <textarea id="fotos" name="fotos" rows={2} className="input" placeholder="/equipos/mi-foto.webp" />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <label className="flex items-center gap-2 rounded-xl border border-line px-4 py-3 text-sm">
          <input type="checkbox" name="destacado" className="h-4 w-4 rounded border-line accent-brand" />
          Destacado
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-line px-4 py-3 text-sm">
          <input type="checkbox" name="nuevo" className="h-4 w-4 rounded border-line accent-brand" />
          Etiqueta «Nuevo»
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-line px-4 py-3 text-sm">
          <input type="checkbox" name="visible" defaultChecked className="h-4 w-4 rounded border-line accent-brand" />
          Visible en la web
        </label>
      </div>

      <div className="flex justify-end border-t border-line pt-5">
        <SubmitButton className="btn-primary">
          <Plus className="h-4 w-4" /> Crear equipo
        </SubmitButton>
      </div>
    </form>
  );
}
