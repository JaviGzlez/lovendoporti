import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { fotoUrl, getArticuloBySlug, getArticulos } from "@/lib/data";
import { formatFecha, SITE_URL } from "@/lib/utils";
import { renderMarkdown } from "@/lib/markdown";
import ArticuloCard from "@/components/ArticuloCard";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticuloBySlug(slug);
  if (!a) return { title: "Artículo no encontrado" };
  const img = fotoUrl(a.portada, "blog");
  return {
    title: a.titulo,
    description: a.extracto ?? undefined,
    alternates: { canonical: `${SITE_URL}/blog/${a.slug}` },
    openGraph: { type: "article", title: a.titulo, description: a.extracto ?? undefined, images: img ? [img] : undefined },
  };
}

export default async function ArticuloPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const articulo = await getArticuloBySlug(slug);
  if (!articulo) notFound();
  const otros = (await getArticulos(4)).filter((a) => a.id !== articulo.id).slice(0, 3);
  const portada = fotoUrl(articulo.portada, "blog");

  return (
    <article className="container-lv max-w-3xl py-10 lg:py-14">
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted">
        <Link href="/" className="hover:text-brand">Inicio</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/blog" className="hover:text-brand">Blog</Link>
      </nav>
      <p className="text-sm text-muted">{formatFecha(articulo.publicado_at)}</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{articulo.titulo}</h1>
      {articulo.extracto && <p className="mt-4 text-lg text-muted">{articulo.extracto}</p>}
      {portada && (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl bg-surface">
          <Image src={portada} alt="" fill sizes="768px" className="object-cover" priority />
        </div>
      )}
      <div className="prose-lv mt-8" dangerouslySetInnerHTML={{ __html: renderMarkdown(articulo.contenido ?? "") }} />

      <div className="card mt-12 flex flex-col items-start gap-3 bg-brand-light/60 p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-semibold">¿Buscas un equipo o quieres vender el tuyo?</p>
        <Link href="/contacto" className="btn-primary">Hablemos</Link>
      </div>

      {otros.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Más artículos</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {otros.map((a) => <ArticuloCard key={a.id} articulo={a} />)}
          </div>
        </section>
      )}
    </article>
  );
}
