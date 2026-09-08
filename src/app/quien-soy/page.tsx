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
      <div className="grid items-center gap-10 lg:grid-cols-5">
        <div className="relative mx-auto w-64 sm:w-72 lg:col-span-2 lg:w-80">
          <div className="absolute inset-x-4 bottom-0 top-12 rounded-[2rem] bg-gradient-to-b from-brand-light to-brand/20" />
          <Image
            src="/mario.webp"
            alt="Mario Zarzuela, fundador de Lo vendo por ti"
            width={1199}
            height={1312}
            priority
            sizes="320px"
            className="relative h-auto w-full object-contain"
          />
        </div>
        <div className="lg:col-span-3">
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
