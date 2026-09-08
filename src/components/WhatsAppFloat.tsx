"use client";

import { useActionState, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { enviarContacto, type ActionResult } from "@/lib/actions";
import ConsentCheckbox from "./ConsentCheckbox";
import Honeypot from "./Honeypot";
import SubmitButton from "./SubmitButton";

/**
 * Botón flotante de WhatsApp. Antes de abrir WhatsApp pide nombre/teléfono
 * y guarda el contacto en la base de datos para no perderlo.
 */
export default function WhatsAppFloat() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [state, action] = useActionState<ActionResult | null, FormData>(enviarContacto, null);

  useEffect(() => {
    if (state?.ok && state.whatsapp) window.open(state.whatsapp, "_blank", "noopener");
  }, [state]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      {/* Etiqueta + botón */}
      <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3">
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="hidden rounded-2xl bg-white px-4 py-2 text-left shadow-card ring-1 ring-black/5 sm:block"
          >
            <span className="block text-sm font-semibold">¿Hablamos?</span>
            <span className="block text-xs text-muted">Compra o vende tu equipo</span>
          </button>
        )}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Contactar por WhatsApp"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
        >
          {open ? <X className="h-6 w-6" /> : <WhatsAppIcon className="h-8 w-8" />}
        </button>
      </div>

      {/* Panel con formulario previo */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[calc(100vw-2.5rem)] max-w-sm rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-black/5">
          {state?.ok ? (
            <div className="text-sm">
              <p className="font-semibold">¡Recibido! Te hemos abierto WhatsApp con el mensaje preparado.</p>
              <p className="mt-1 text-muted">
                Si no se ha abierto,{" "}
                <a href={state.whatsapp} target="_blank" rel="noopener" className="text-brand underline">pulsa aquí</a>.
              </p>
            </div>
          ) : (
          <>
          <h3 className="text-lg font-bold">Hablemos por WhatsApp</h3>
          <p className="mb-4 text-sm text-muted">Déjanos tus datos y te abrimos WhatsApp con el mensaje preparado.</p>
          <form action={action} className="relative space-y-3">
            <Honeypot />
            <input type="hidden" name="origen" value={`whatsapp-flotante:${pathname}`} />
            <div className="grid grid-cols-2 gap-2">
              <label className="cursor-pointer">
                <input type="radio" name="intencion" value="comprar" defaultChecked className="peer sr-only" />
                <span className="block rounded-xl border border-line py-2 text-center text-sm font-medium peer-checked:border-brand peer-checked:bg-brand-light peer-checked:text-brand">
                  Quiero comprar
                </span>
              </label>
              <label className="cursor-pointer">
                <input type="radio" name="intencion" value="vender" className="peer sr-only" />
                <span className="block rounded-xl border border-line py-2 text-center text-sm font-medium peer-checked:border-brand peer-checked:bg-brand-light peer-checked:text-brand">
                  Quiero vender
                </span>
              </label>
            </div>
            <input name="nombre" required placeholder="Nombre *" className="input" autoComplete="name" />
            <input name="telefono" required type="tel" placeholder="Teléfono *" className="input" autoComplete="tel" />
            <input name="email" type="email" placeholder="Email (opcional)" className="input" autoComplete="email" />
            <textarea name="mensaje" rows={2} placeholder="¿En qué te ayudamos?" className="input" />
            <ConsentCheckbox />
            {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
            <SubmitButton className="btn w-full bg-[#25D366] text-white hover:bg-[#1eb85a]">
              <WhatsAppIcon className="h-5 w-5" /> Continuar a WhatsApp
            </SubmitButton>
          </form>
          </>
          )}
        </div>
      )}
    </>
  );
}
