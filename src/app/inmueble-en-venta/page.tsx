import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download, MapPin, Ruler, DoorOpen, Sun, Banknote } from "lucide-react";
import { whatsappUrl, SITE_URL } from "@/lib/utils";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export const metadata: Metadata = {
  title: "Local comercial en venta · Calle Aurora, El Puerto de Santa María",
  description:
    "Inmueble de 274 m² útiles en pleno centro de El Puerto de Santa María, acondicionado como clínica dental. 8 gabinetes, patio privado de 22 m². 585.000 €.",
  alternates: { canonical: `${SITE_URL}/inmueble-en-venta` },
};

const MENSAJE_WHATSAPP =
  "Hola Mario, he visto el anuncio del local de Calle Aurora, 3 en El Puerto de Santa María y me gustaría más información.";

const DATOS = [
  { icon: Ruler, label: "Superficie útil", valor: "274,12 m²" },
  { icon: Ruler, label: "Superficie construida", valor: "315,23 m²" },
  { icon: DoorOpen, label: "Gabinetes", valor: "8 (con preinstalación)" },
  { icon: Sun, label: "Patio privado", valor: "22 m² (uso exclusivo)" },
  { icon: MapPin, label: "Ubicación", valor: "Calle Aurora, 3 · El Puerto de Santa María (Cádiz)" },
  { icon: Banknote, label: "Precio de venta", valor: "585.000 €" },
];

const GALERIA = [
  { src: "/inmueble-en-venta/recepcion-1.webp", alt: "Recepción principal" },
  { src: "/inmueble-en-venta/sala-espera.webp", alt: "Sala de espera luminosa" },
  { src: "/inmueble-en-venta/pasillo.webp", alt: "Pasillo distribuidor" },
  { src: "/inmueble-en-venta/gabinete-1.webp", alt: "Gabinete equipado" },
  { src: "/inmueble-en-venta/gabinete-2.webp", alt: "Gabinete equipado" },
  { src: "/inmueble-en-venta/gabinete-3.webp", alt: "Gabinete equipado" },
  { src: "/inmueble-en-venta/archivo.webp", alt: "Archivo y almacenamiento" },
  { src: "/inmueble-en-venta/calle-aurora.webp", alt: "Vista de Calle Aurora" },
];

export default function InmuebleEnVentaPage() {
  return (
    <div className="container-lv py-10 lg:py-14">
      <p className="eyebrow mb-2">Oportunidad especial · fuera del catálogo de equipos</p>
      <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
        Oportunidad única en el centro de El Puerto de Santa María
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        No es solo una clínica dental. Es un espacio de gran formato, listo para empezar un nuevo proyecto:
        clínica dental, centro médico, clínica estética o cualquier proyecto sanitario privado.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a href={whatsappUrl(MENSAJE_WHATSAPP)} target="_blank" rel="noopener" className="btn bg-[#25D366] text-white hover:bg-[#1eb85a]">
          <WhatsAppIcon className="h-4 w-4" /> Escribir a Mario por WhatsApp
        </a>
        <a href="/documentos/dossier-calle-aurora-3.pdf" target="_blank" rel="noopener" className="btn-outline">
          <Download className="h-4 w-4" /> Descargar dossier completo (PDF)
        </a>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-5 lg:items-start">
        <div className="lg:col-span-3">
          <div className="grid gap-3 sm:grid-cols-2">
            {DATOS.map((d) => (
              <div key={d.label} className="card flex items-center gap-3 p-4">
                <d.icon className="h-6 w-6 shrink-0 text-brand" />
                <div>
                  <p className="text-xs text-muted">{d.label}</p>
                  <p className="font-semibold">{d.valor}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="card mt-6 p-6">
            <h2 className="text-lg font-bold">Un activo singular por superficie, ubicación y versatilidad</h2>
            <p className="mt-3 text-ink/80">
              Propiedad de gran superficie en Calle Aurora, dentro del centro urbano de El Puerto de Santa María.
              Reforma integral realizada en 2017, con estancias amplias y buena compartimentación: dos recepciones,
              siete gabinetes, dos salas de estar/espera, vestuario, baño, despacho, almacén y otras dependencias
              auxiliares.
            </p>
            <ul className="mt-4 space-y-1.5 text-ink/80">
              <li>• Ubicación céntrica, con servicios y comunicaciones urbanas en el entorno inmediato.</li>
              <li>• Buen estado de conservación y acondicionamiento técnico completo.</li>
              <li>• Uso exclusivo de los patios existentes sobre el local comercial, no computados en la superficie útil.</li>
              <li>• Ideal para clínica dental, centro médico, clínica estética o proyecto sanitario privado.</li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="card overflow-hidden p-0">
            <Image
              src="/inmueble-en-venta/cartel.webp"
              alt="Clínica dental en venta — Puerto de Santa María"
              width={1200}
              height={1200}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight">Fotos del inmueble</h2>
        <p className="mt-1 text-muted">Espacios amplios y luminosos, actualmente acondicionados como clínica dental.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GALERIA.map((foto) => (
            <div key={foto.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface">
              <Image src={foto.src} alt={foto.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-8 lg:grid-cols-5 lg:items-center">
        <div className="lg:col-span-3">
          <div className="relative aspect-[14/9] overflow-hidden rounded-2xl border border-line bg-white">
            <Image src="/inmueble-en-venta/plano.webp" alt="Plano del inmueble" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-contain" />
          </div>
          <p className="mt-2 text-sm text-muted">Croquis del inmueble incluido en el informe de valoración.</p>
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-lg font-bold">Posibilidades del espacio</h2>
          <ul className="mt-3 space-y-1.5 text-ink/80">
            <li>• Continuidad como activo profesional o sanitario, previa verificación de licencias y autorizaciones.</li>
            <li>• Reconversión a vivienda de gran superficie, con proyecto de redistribución y actualización de cocina y baños.</li>
            <li>• Sede corporativa, despacho colectivo o centro de servicios, condicionado a compatibilidad urbanística.</li>
            <li>• Inversión patrimonial en una ubicación céntrica y consolidada.</li>
          </ul>
        </div>
      </section>

      <div className="card mt-14 flex flex-col items-start gap-4 bg-brand-light/60 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">¿Te interesa o conoces a alguien que busque un espacio así?</p>
          <p className="mt-1 text-sm text-muted">Información y visitas bajo cita previa. Mario Zarzuela · 629 51 96 74.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={whatsappUrl(MENSAJE_WHATSAPP)} target="_blank" rel="noopener" className="btn bg-[#25D366] text-white hover:bg-[#1eb85a]">
            <WhatsAppIcon className="h-4 w-4" /> Escribir por WhatsApp
          </a>
          <a href="/documentos/dossier-calle-aurora-3.pdf" target="_blank" rel="noopener" className="btn-outline bg-white">
            <Download className="h-4 w-4" /> Descargar dossier
          </a>
        </div>
      </div>

      <p className="mt-6 text-xs text-muted">
        Este anuncio resume la información y la tasación aportadas por la propiedad y no sustituye una revisión
        registral, urbanística, técnica o jurídica independiente. Cualquier cambio de uso deberá estudiarse
        técnicamente y tramitar las licencias y autorizaciones que procedan. <Link href="/aviso-legal" className="underline hover:text-brand">Aviso legal</Link>.
      </p>
    </div>
  );
}
