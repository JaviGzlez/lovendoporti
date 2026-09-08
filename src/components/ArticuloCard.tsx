import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Newspaper } from "lucide-react";
import type { Articulo } from "@/lib/types";
import { fotoUrl } from "@/lib/data";
import { formatFecha } from "@/lib/utils";

export default function ArticuloCard({ articulo }: { articulo: Articulo }) {
  const url = fotoUrl(articulo.portada, "blog");
  return (
    <Link href={`/blog/${articulo.slug}`} className="card group flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-[16/10] bg-surface">
        {url ? (
          <Image src={url} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-line">
            <Newspaper className="h-12 w-12" strokeWidth={1} />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-xs text-muted">{formatFecha(articulo.publicado_at)}</p>
        <h3 className="font-semibold leading-snug group-hover:text-brand">{articulo.titulo}</h3>
        <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-brand">
          Leer artículo <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
