"use client";

import { useActionState, useEffect } from "react";
import WhatsAppIcon from "./WhatsAppIcon";
import { enviarContacto, type ActionResult } from "@/lib/actions";
import ConsentCheckbox from "./ConsentCheckbox";
import Honeypot from "./Honeypot";
import SubmitButton from "./SubmitButton";

export default function ContactoForm() {
  const [state, action] = useActionState<ActionResult | null, FormData>(enviarContacto, null);

  useEffect(() => {
    if (state?.ok && state.whatsapp) window.open(state.whatsapp, "_blank", "noopener");
  }, [state]);

  if (state?.ok) {
    return (
      <div className="card p-8 text-center">
        <h2 className="text-2xl font-bold">¡Mensaje recibido!</h2>
        <p className="mt-2 text-muted">
          Te hemos abierto WhatsApp para seguir la conversación. Si no se ha abierto,{" "}
          <a href={state.whatsapp} target="_blank" rel="noopener" className="text-brand underline">pulsa aquí</a>.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="card relative space-y-4 p-6 sm:p-8">
      <Honeypot />
      <input type="hidden" name="tipo" value="contacto" />
      <input type="hidden" name="origen" value="contacto" />
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
      <div>
        <label className="label" htmlFor="mensaje">Mensaje *</label>
        <textarea id="mensaje" name="mensaje" required rows={4} className="input" />
      </div>
      <ConsentCheckbox />
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      <SubmitButton className="btn w-full bg-[#25D366] text-white hover:bg-[#1eb85a]">
        <WhatsAppIcon className="h-5 w-5" /> Enviar y continuar por WhatsApp
      </SubmitButton>
    </form>
  );
}
