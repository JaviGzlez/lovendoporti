"use client";

import { useActionState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { buscoEquipo, type ActionResult } from "@/lib/actions";
import type { Categoria } from "@/lib/types";
import ConsentCheckbox from "./ConsentCheckbox";
import Honeypot from "./Honeypot";
import SubmitButton from "./SubmitButton";

export default function BuscoForm({ categorias }: { categorias: Categoria[] }) {
  const [state, action] = useActionState<ActionResult | null, FormData>(buscoEquipo, null);

  if (state?.ok) {
    return (
      <div className="card p-10 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
        <h2 className="mt-4 text-2xl font-bold">¡Anotado!</h2>
        <p className="mt-2 text-muted">
          Guardamos tu búsqueda y te avisaremos en cuanto tengamos un equipo que encaje.
        </p>
        <Link href="/equipos" className="btn-primary mt-6">Ver equipos disponibles</Link>
      </div>
    );
  }

  return (
    <form action={action} className="card relative space-y-6 p-6 sm:p-8">
      <Honeypot />
      <fieldset className="space-y-4">
        <legend className="mb-2 text-lg font-bold">¿Qué buscas?</legend>
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
            <label className="label" htmlFor="marca">Marca</label>
            <input id="marca" name="marca" className="input" placeholder="Cualquiera" />
          </div>
          <div>
            <label className="label" htmlFor="modelo">Modelo</label>
            <input id="modelo" name="modelo" className="input" />
          </div>
          <div>
            <label className="label" htmlFor="presupuesto">Presupuesto aproximado (€)</label>
            <input id="presupuesto" name="presupuesto" type="number" min={0} step={1} className="input" />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="mensaje">Detalles</label>
          <textarea id="mensaje" name="mensaje" rows={3} className="input" placeholder="Cuéntanos qué necesitas y para cuándo." />
        </div>
      </fieldset>

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

      <ConsentCheckbox />
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      <SubmitButton>Enviar búsqueda</SubmitButton>
    </form>
  );
}
