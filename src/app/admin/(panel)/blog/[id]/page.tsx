import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import { getArticuloByIdAdmin } from "@/lib/admin/data";
import ArticuloForm from "@/components/admin/ArticuloForm";
import BorrarBoton from "@/components/admin/BorrarBoton";

export const metadata: Metadata = { title: "Editar artículo · Área privada" };
export const dynamic = "force-dynamic";

export default async function EditarArticuloPage({ params }: PageProps<"/admin/blog/[id]">) {
  const { id } = await params;
  const articulo = await getArticuloByIdAdmin(id);
  if (!articulo) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/admin/blog" className="flex items-center gap-1 text-sm text-muted hover:text-brand">
          <ChevronLeft className="h-4 w-4" /> Volver al blog
        </Link>
        <BorrarBoton tipo="articulo" id={articulo.id} nombre={articulo.titulo} redirigirA="/admin/blog" />
      </div>
      <h1 className="text-2xl font-bold tracking-tight">Editar artículo</h1>
      <ArticuloForm articulo={articulo} />
    </div>
  );
}
