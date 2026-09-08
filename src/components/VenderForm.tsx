"use client";

import { useActionState } from "react";
import Link from "next/link";
import { CheckCircle2, Upload } from "lucide-react";
import { venderEquipo, type ActionResult } from "@/lib/actions";
import type { Categoria } from "@/lib/types";
import ConsentCheckbox from "./ConsentCheckbox";
import Honeypot from "./Honeypot";
import SubmitButton from "./SubmitButton";

export default function VenderForm({ categorias }: { categorias: Categoria[] }) {
  const [state, action] = useActionState<ActionResult | null, FormData>(venderEquipo, null);

  if (state?.ok) {
    return (
      <div className="card p-10 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
        <h2 className="mt-4 text-2xl font-bold">¡Recibido!</h2>
        <p className="mt-2 text-muted">
          Mario revisará la información y las fotografías y se pondrá en contacto contigo lo antes posible.
        </p>
        <Link href="/equipos" className="btn-primary mt-6">Ver equipos</Link>
      </div>
    );
  }

  return (
    <form action={action} className="card relative space-y-6 p-6 sm:p-8" encType="multipart/form-data">
      <Honeypot />

      <fieldset className="space-y-4">
        <legend className="mb-2 text-lg font-bold">Tus datos</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="nombre">Nombre *</label>
            <input id="nombre" name="nombre" required className="input" autoComplete="name" />
          </div>
          <div>
            <label className="label" htmlFor="telefono">Teléfono *</label>
            <input id="telefono" name="telefono" required type="tel" className="input" autoComplete="tel" />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" className="input" autoComplete="email" />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-2 text-lg font-bold">El equipo</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="tipo_equipo">Tipo de equipo *</label>
            <select id="tipo_equipo" name="tipo_equipo" required className="input" defaultValue="">
              <option value="" disabled>Selecciona…</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.nombre}>{c.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="marca">Marca *</label>
            <input id="marca" name="marca" required className="input" placeholder="Roland, Medit, Zirkonzahn…" />
          </div>
          <div>
            <label className="label" htmlFor="modelo">Modelo</label>
            <input id="modelo" name="modelo" className="input" placeholder="DWX-52D" />
          </div>
          <div>
            <label className="label" htmlFor="anio">Año</label>
            <input id="anio" name="anio" type="number" min={1990} max={2100} className="input" />
          </div>
          <div>
            <label className="label" htmlFor="precio_deseado">Precio deseado (€)</label>
            <input id="precio_deseado" name="precio_deseado" type="number" min={0} step={1} className="input" />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="descripcion">Descripción</label>
          <textarea id="descripcion" name="descripcion" rows={4} className="input" placeholder="Estado, horas de uso, accesorios incluidos, motivo de la venta…" />
        </div>
        <div>
          <label className="label" htmlFor="fotos">Fotografías (hasta 8, JPG/PNG/WEBP, máx. 10 MB cada una)</label>
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line px-4 py-8 text-center text-sm text-muted hover:border-brand hover:bg-brand-light/40">
            <Upload className="h-6 w-6" />
            <span>Haz clic para seleccionar las fotos</span>
            <input id="fotos" name="fotos" type="file" accept="image/jpeg,image/png,image/webp" multiple className="sr-only" />
          </label>
        </div>
      </fieldset>

      <ConsentCheckbox />
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      <SubmitButton>Enviar mi equipo</SubmitButton>
    </form>
  );
}
