import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Quién soy · Mario Zarzuela",
  description: "Mario Zarzuela, la persona detrás de Lo vendo por ti. Años de experiencia en el sector dental al servicio de tu compra o venta.",
};

export default function QuienSoyPage() {
  return (
    <div className="container-lv py-10 lg:py-14">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-brand-light">
          {/* Sustituir por la fotografía real de Mario: /public/mario.jpg */}
          <Image src="/logo-icon.png" alt="Mario Zarzuela" fill className="object-contain p-16" />
        </div>
        <div>
          <p className="eyebrow mb-2">Quién soy</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Hola, soy Mario Zarzuela</h1>
          <div className="prose-lv mt-6">
            <p>
              Llevo años trabajando en el sector dental, conociendo de cerca clínicas y laboratorios, sus equipos
              y sus necesidades. Con el tiempo vi que había muchísima maquinaria en perfecto estado que dejaba de
              usarse, y muchos profesionales que la necesitaban pero no sabían dónde encontrarla con garantías.
            </p>
            <p>
              Así nació <strong>Lo vendo por ti</strong>: un lugar donde cada equipo se revisa, se publica con
              información real y se acompaña durante toda la operación. Sin intermediarios anónimos, con trato
              directo y cercano.
            </p>
            <p>
              Si tienes un equipo que ya no utilizas, o buscas uno concreto, hablamos y lo vemos juntos.
            </p>
          </div>
          <p className="mt-6 font-hand text-3xl text-brand">Tu material dental merece una segunda oportunidad</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/equipos" className="btn-primary">Ver equipos <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/contacto" className="btn-outline">Contactar</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
