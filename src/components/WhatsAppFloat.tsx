"use client";

import { usePathname } from "next/navigation";
import WhatsAppIcon from "./WhatsAppIcon";
import { registrarEvento } from "@/lib/actions";
import { whatsappUrl } from "@/lib/utils";

/**
 * Botón flotante de WhatsApp. Abre WhatsApp directamente con un mensaje
 * profesional ya escrito (sin pedir datos antes): cuanto menos fricción,
 * más gente escribe. La visita queda registrada en segundo plano para
 * las estadísticas, sin bloquear la apertura de WhatsApp.
 */
const MENSAJE =
  "Hola Mario, he entrado en la web de Lo vendo por ti y me gustaría que me ayudaras. " +
  "Estoy interesado/a en:";

export default function WhatsAppFloat() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  const abrir = () => {
    // No bloquea la apertura de WhatsApp aunque falle o tarde.
    void registrarEvento("whatsapp");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3">
      <a
        href={whatsappUrl(MENSAJE)}
        target="_blank"
        rel="noopener"
        onClick={abrir}
        className="hidden rounded-2xl bg-white px-4 py-2 text-left shadow-card ring-1 ring-black/5 transition hover:shadow-lg sm:block"
      >
        <span className="block text-sm font-semibold">¿Hablamos?</span>
        <span className="block text-xs text-muted">Compra o vende tu equipo</span>
      </a>
      <a
        href={whatsappUrl(MENSAJE)}
        target="_blank"
        rel="noopener"
        onClick={abrir}
        aria-label="Contactar por WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
      >
        <WhatsAppIcon className="h-8 w-8" />
      </a>
    </div>
  );
}
