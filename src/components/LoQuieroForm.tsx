"use client";

import { useActionState, useEffect, useState } from "react";
import { Search } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { loQuiero, type ActionResult } from "@/lib/actions";
import type { Equipo } from "@/lib/types";
import { formatPrecio } from "@/lib/utils";
import ConsentCheckbox from "./ConsentCheckbox";
import Honeypot from "./Honeypot";
import SubmitButton from "./SubmitButton";

/**
 * Botón "Lo quiero" (o "Busco uno similar" si está vendido).
 * Pide nombre y teléfono, guarda la solicitud ligada al equipo y abre WhatsApp
 * con referencia, equipo y precio.
 */
export default function LoQuieroForm({ equipo }: { equipo: Equipo }) {
  const vendido = equipo.estado === "vendido";
  const [open, setOpen] = useState(false);
  const [state, action] = useActionState<ActionResult | null, FormData>(loQuiero, null);

  useEffect(() => {
    if (state?.ok && state.whatsapp) window.open(state.whatsapp, "_blank", "noopener");
  }, [state]);

  if (state?.ok) {
    return (
      <div className="rounded-2xl bg-emerald-50 p-5 text-sm text-emerald-900">
        <p className="font-semibold">¡Recibido! Te hemos abierto WhatsApp con el mensaje preparado.</p>
        <p className="mt-1">Si no se ha abierto,{" "}
          <a href={state.whatsapp} target="_blank" rel="noopener" className="underline">pulsa aquí</a>.
        </p>
      </div>
    );
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className={vendido ? "btn-dark w-full" : "btn-primary w-full"}>
        {vendido ? <Search className="h-4 w-4" /> : <WhatsAppIcon className="h-5 w-5" />}
        {vendido ? "Busco uno similar" : "Lo quiero"}
      </button>
    );
  }

  return (
    <form action={action} className="relative space-y-3 rounded-2xl border border-line bg-surface p-4">
      <Honeypot />
      <input type="hidden" name="equipo_id" value={equipo.id} />
      <input type="hidden" name="referencia" value={equipo.referencia} />
      <input type="hidden" name="equipo_nombre" value={vendido ? `similar a ${equipo.nombre}` : equipo.nombre} />
      <input type="hidden" name="precio" value={equipo.precio != null ? formatPrecio(equipo.precio) : ""} />
      <p className="text-sm font-medium">
        {vendido ? "Dinos cómo contactarte y te avisamos si entra uno similar." : "Déjanos tus datos y te abrimos WhatsApp con la referencia."}
      </p>
      <input name="nombre" required placeholder="Nombre *" className="input" autoComplete="name" />
      <input name="telefono" required type="tel" placeholder="Teléfono *" className="input" autoComplete="tel" />
      <input name="email" type="email" placeholder="Email (opcional)" className="input" autoComplete="email" />
      <textarea name="mensaje" rows={2} placeholder="Mensaje (opcional)" className="input" />
      <ConsentCheckbox />
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      <SubmitButton className="btn w-full bg-[#25D366] text-white hover:bg-[#1eb85a]">
        <WhatsAppIcon className="h-5 w-5" /> Continuar a WhatsApp
      </SubmitButton>
    </form>
  );
}
