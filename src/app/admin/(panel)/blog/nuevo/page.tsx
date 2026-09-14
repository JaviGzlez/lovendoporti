import Link from "next/link";
import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import ArticuloForm from "@/components/admin/ArticuloForm";

export const metadata: Metadata = { title: "Nuevo artículo · Área privada" };
export const dynamic = "force-dynamic";

export default function NuevoArticuloPage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/blog" className="flex items-center gap-1 text-sm text-muted hover:text-brand">
        <ChevronLeft className="h-4 w-4" /> Volver al blog
      </Link>
      <h1 className="text-2xl font-bold tracking-tight">Nuevo artículo</h1>
      <ArticuloForm />
    </div>
  );
}
