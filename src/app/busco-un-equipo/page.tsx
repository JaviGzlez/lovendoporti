import type { Metadata } from "next";
import { getCategorias } from "@/lib/data";
import BuscoForm from "@/components/BuscoForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Busco un equipo dental",
  description: "¿No encuentras la máquina que necesitas? Cuéntanos qué buscas y te avisamos en cuanto la tengamos.",
};

export default async function BuscoPage() {
  const categorias = await getCategorias();
  return (
    <div className="container-lv py-10 lg:py-14">
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="eyebrow mb-2">¿Buscas un equipo concreto?</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Busco un equipo</h1>
          <p className="mt-3 text-muted">
            Cada semana entran equipos nuevos. Si nos dices qué necesitas, lo cruzamos con lo que vaya llegando y te avisamos antes de publicarlo.
          </p>
        </div>
        <div className="lg:col-span-3">
          <BuscoForm categorias={categorias} />
        </div>
      </div>
    </div>
  );
}
