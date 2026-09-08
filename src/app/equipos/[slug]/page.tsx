import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Check, Calendar, Clock, Tag } from "lucide-react";
import { fotoUrl, getEquipoBySlug, getEquiposSimilares, isDemo } from "@/lib/data";
import { formatPrecio, SITE_URL } from "@/lib/utils";
import EstadoBadge from "@/components/EstadoBadge";
import Galeria from "@/components/Galeria";
import LoQuieroForm from "@/components/LoQuieroForm";
import EquipoCard from "@/components/EquipoCard";
import RegistrarVisita from "@/components/RegistrarVisita";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/equipos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const equipo = await getEquipoBySlug(slug);
  if (!equipo) return { title: "Equipo no encontrado" };
  const title = `${equipo.nombre} segunda mano${equipo.estado === "vendido" ? " (vendido)" : ""}`;
  const description =
    equipo.descripcion?.slice(0, 155) ??
    `${equipo.nombre} de segunda mano, referencia ${equipo.referencia}. ${formatPrecio(equipo.precio)}.`;
  const img = fotoUrl(equipo.fotos[0]);
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/equipos/${equipo.slug}` },
    openGraph: { title, description, images: img ? [img] : undefined },
  };
}

export default async function EquipoPage({ params }: PageProps<"/equipos/[slug]">) {
  const { slug } = await params;
  const equipo = await getEquipoBySlug(slug);
  if (!equipo) notFound();

  const similares = await getEquiposSimilares(equipo, 3);
  const fotos = equipo.fotos.map((f) => fotoUrl(f)).filter((u): u is string => !!u);
  const incluye = (equipo.incluye ?? "").split("\n").map((s) => s.trim()).filter(Boolean);
  const vendido = equipo.estado === "vendido";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: equipo.nombre,
    sku: equipo.referencia,
    brand: equipo.marca ? { "@type": "Brand", name: equipo.marca } : undefined,
    model: equipo.modelo ?? undefined,
    description: equipo.descripcion ?? undefined,
    image: fotos,
    offers: {
      "@type": "Offer",
      price: equipo.precio ?? undefined,
      priceCurrency: "EUR",
      itemCondition: "https://schema.org/UsedCondition",
      availability: vendido ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      url: `${SITE_URL}/equipos/${equipo.slug}`,
    },
  };

  return (
    <div className="container-lv py-8 lg:py-12">
      {!isDemo && <RegistrarVisita equipoId={equipo.id} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Migas */}
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted">
        <Link href="/" className="hover:text-brand">Inicio</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/equipos" className="hover:text-brand">Equipos</Link>
        {equipo.categoria && (
          <>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/equipos?categoria=${equipo.categoria.slug}`} className="hover:text-brand">
              {equipo.categoria.nombre}
            </Link>
          </>
        )}
        <ChevronRight className="h-4 w-4" />
        <span className="text-ink">{equipo.nombre}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-5">
        {/* Galería */}
        <div className="lg:col-span-3">
          <Galeria fotos={fotos} alt={equipo.nombre} />
          {equipo.video_url && (
            <div className="mt-6">
              <h2 className="mb-3 text-lg font-semibold">Vídeo</h2>
              <a href={equipo.video_url} target="_blank" rel="noopener" className="text-brand underline">
                Ver vídeo del equipo
              </a>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="lg:col-span-2">
          <div className="card sticky top-24 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <EstadoBadge estado={equipo.estado} />
              <span className="text-xs font-medium text-muted">Ref. {equipo.referencia}</span>
            </div>
            <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">{equipo.nombre}</h1>
            {(equipo.marca || equipo.modelo) && (
              <p className="mt-1 text-muted">
                {[equipo.marca, equipo.modelo].filter(Boolean).join(" · ")}
              </p>
            )}
            <p className="mt-5 text-3xl font-extrabold">
              {formatPrecio(equipo.precio)}
              {equipo.precio != null && <span className="ml-2 text-sm font-normal text-muted">IVA no incluido</span>}
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {equipo.anio && (
                <div className="flex items-center gap-2 rounded-xl bg-surface px-3 py-2">
                  <Calendar className="h-4 w-4 text-brand" />
                  <span><dt className="inline text-muted">Año </dt><dd className="inline font-medium">{equipo.anio}</dd></span>
                </div>
              )}
              {equipo.horas_uso != null && (
                <div className="flex items-center gap-2 rounded-xl bg-surface px-3 py-2">
                  <Clock className="h-4 w-4 text-brand" />
                  <span><dt className="inline text-muted">Uso </dt><dd className="inline font-medium">{equipo.horas_uso === 0 ? "Sin uso" : `${equipo.horas_uso.toLocaleString("es-ES")} h`}</dd></span>
                </div>
              )}
              {equipo.categoria && (
                <div className="flex items-center gap-2 rounded-xl bg-surface px-3 py-2">
                  <Tag className="h-4 w-4 text-brand" />
                  <span><dt className="inline text-muted">Tipo </dt><dd className="inline font-medium">{equipo.categoria.nombre}</dd></span>
                </div>
              )}
            </dl>

            <div className="mt-6">
              {vendido && (
                <p className="mb-3 text-sm text-muted">
                  Este equipo ya se ha vendido. Si buscas uno parecido, dínoslo y te avisamos.
                </p>
              )}
              <LoQuieroForm equipo={equipo} />
            </div>
            <p className="mt-4 text-center text-xs text-muted">
              Trato directo con Mario · Te acompañamos en todo el proceso
            </p>
          </div>
        </div>
      </div>

      {/* Descripción + incluye */}
      <div className="mt-12 grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h2 className="text-xl font-bold">Descripción</h2>
          <p className="mt-3 whitespace-pre-line leading-relaxed text-ink/85">
            {equipo.descripcion || "Consulta los detalles de este equipo por WhatsApp."}
          </p>
        </div>
        {incluye.length > 0 && (
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold">Qué incluye</h2>
            <ul className="mt-3 space-y-2">
              {incluye.map((item) => (
                <li key={item} className="flex items-start gap-2 text-ink/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Similares */}
      {similares.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">También te puede interesar</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similares.map((e) => (
              <EquipoCard key={e.id} equipo={e} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
