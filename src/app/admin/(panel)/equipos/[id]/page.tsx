import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import { getEquipoByIdAdmin } from "@/lib/admin/data";
import EquipoEditForm from "@/components/admin/EquipoEditForm";

export const metadata: Metadata = { title: "Editar equipo · Área privada" };
export const dynamic = "force-dynamic";

export default async function AdminEquipoEditPage({ params }: PageProps<"/admin/equipos/[id]">) {
  const { id } = await params;
  const equipo = await getEquipoByIdAdmin(id);
  if (!equipo) notFound();

  return (
    <div className="space-y-6">
      <Link href="/admin/equipos" className="flex items-center gap-1 text-sm text-muted hover:text-brand">
        <ChevronLeft className="h-4 w-4" /> Volver a equipos
      </Link>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{equipo.nombre}</h1>
        <p className="mt-1 font-mono text-sm text-muted">{equipo.referencia}</p>
      </div>
      <EquipoEditForm equipo={equipo} />
    </div>
  );
}
