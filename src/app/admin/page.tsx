import type { Metadata } from "next";
import Link from "next/link";
import { Lock } from "lucide-react";

export const metadata: Metadata = { title: "Área privada", robots: { index: false } };

/** Placeholder del panel de administración (se construye en la siguiente fase). */
export default function AdminPage() {
  return (
    <div className="container-lv flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <Lock className="h-10 w-10 text-brand" />
      <h1 className="mt-4 text-2xl font-bold">Área privada</h1>
      <p className="mt-2 max-w-md text-muted">
        El panel de administración (equipos, solicitudes, ventas y estadísticas) se construye en la siguiente fase.
      </p>
      <Link href="/" className="btn-outline mt-6">Volver al inicio</Link>
    </div>
  );
}
