import type { Metadata } from "next";
import { Camera, ClipboardCheck, Handshake } from "lucide-react";
import { getCategorias } from "@/lib/data";
import VenderForm from "@/components/VenderForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Vender mi equipo dental",
  description:
    "¿Tienes una fresadora, escáner, horno o impresora 3D que ya no utilizas? Envíanos los datos y lo ponemos delante de profesionales interesados.",
};

const PASOS = [
  { icon: ClipboardCheck, title: "Nos cuentas qué tienes", text: "Rellena el formulario con los datos del equipo y sube unas fotos." },
  { icon: Camera, title: "Lo revisamos y publicamos", text: "Mario revisa la información, prepara la ficha y la publica en el catálogo." },
  { icon: Handshake, title: "Te acompañamos en la venta", text: "Gestionamos los contactos y te ayudamos hasta cerrar la operación." },
];

export default async function VenderPage() {
  const categorias = await getCategorias();
  return (
    <div className="container-lv py-10 lg:py-14">
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="eyebrow mb-2">¿Tienes un equipo que ya no utilizas?</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Vender mi equipo</h1>
          <p className="mt-3 text-muted">
            Tú no publicas nada: nos envías la información, la revisamos y nosotros nos encargamos de todo lo demás.
          </p>
          <ol className="mt-8 space-y-6">
            {PASOS.map((p, i) => (
              <li key={p.title} className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand">
                  <p.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">{i + 1}. {p.title}</p>
                  <p className="text-sm text-muted">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="lg:col-span-3">
          <VenderForm categorias={categorias} />
        </div>
      </div>
    </div>
  );
}
