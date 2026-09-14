import Link from "next/link";
import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import { getCategoriasAdmin } from "@/lib/admin/data";
import EquipoNuevoForm from "@/components/admin/EquipoNuevoForm";

export const metadata: Metadata = { title: "Nuevo equipo · Área privada" };
export const dynamic = "force-dynamic";

export default async function NuevoEquipoPage() {
  const categorias = await getCategoriasAdmin();

  return (
    <div className="space-y-6">
      <Link href="/admin/equipos" className="flex items-center gap-1 text-sm text-muted hover:text-brand">
        <ChevronLeft className="h-4 w-4" /> Volver a equipos
      </Link>
      <h1 className="text-2xl font-bold tracking-tight">Nuevo equipo</h1>
      <EquipoNuevoForm categorias={categorias} />
    </div>
  );
}
