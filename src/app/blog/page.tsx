import type { Metadata } from "next";
import { getArticulos } from "@/lib/data";
import ArticuloCard from "@/components/ArticuloCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: "Consejos sobre compra, venta, valoración y mantenimiento de maquinaria dental de segunda mano.",
};

export default async function BlogPage() {
  const articulos = await getArticulos();
  return (
    <div className="container-lv py-10 lg:py-14">
      <p className="eyebrow mb-2">Blog</p>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Consejos y novedades</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Todo lo que necesitas saber sobre maquinaria dental: cómo comprar, cuándo vender, valoración y mantenimiento.
      </p>
      {articulos.length ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articulos.map((a) => (
            <ArticuloCard key={a.id} articulo={a} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-muted">Pronto publicaremos los primeros artículos.</p>
      )}
    </div>
  );
}
