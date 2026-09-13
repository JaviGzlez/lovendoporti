import Link from "next/link";
import type { Metadata } from "next";
import { Package, Inbox, ArrowRight } from "lucide-react";
import { getResumenPanel } from "@/lib/admin/data";
import { TIPO_SOLICITUD_LABEL } from "@/lib/types";

export const metadata: Metadata = { title: "Resumen · Área privada" };
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const resumen = await getResumenPanel();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Resumen</h1>
        <p className="mt-1 text-muted">Un vistazo rápido al catálogo y a las solicitudes.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card p-6">
          <p className="text-sm text-muted">Equipos disponibles</p>
          <p className="mt-1 text-3xl font-bold">{resumen.equiposDisponibles}</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-muted">Reservados</p>
          <p className="mt-1 text-3xl font-bold">{resumen.equiposReservados}</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-muted">Vendidos</p>
          <p className="mt-1 text-3xl font-bold">{resumen.equiposVendidos}</p>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">
            Solicitudes nuevas
            {resumen.solicitudesNuevas > 0 && (
              <span className="ml-2 rounded-full bg-brand px-2.5 py-0.5 text-sm font-semibold text-white">
                {resumen.solicitudesNuevas}
              </span>
            )}
          </h2>
          <Link href="/admin/solicitudes" className="flex items-center gap-1 text-sm font-medium text-brand hover:underline">
            Ver todas <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        {resumen.solicitudesNuevas === 0 ? (
          <p className="mt-4 text-sm text-muted">No hay solicitudes nuevas pendientes de revisar.</p>
        ) : (
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {(Object.entries(resumen.solicitudesPorTipo) as [keyof typeof TIPO_SOLICITUD_LABEL, number][])
              .filter(([, n]) => n > 0)
              .map(([tipo, n]) => (
                <li key={tipo}>
                  <Link
                    href={`/admin/solicitudes?tipo=${tipo}`}
                    className="flex items-center justify-between rounded-xl bg-surface px-4 py-3 text-sm hover:bg-brand-light"
                  >
                    <span>{TIPO_SOLICITUD_LABEL[tipo]}</span>
                    <span className="font-semibold">{n}</span>
                  </Link>
                </li>
              ))}
          </ul>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/admin/equipos" className="card flex items-center gap-4 p-6 transition hover:-translate-y-0.5 hover:shadow-lg">
          <Package className="h-9 w-9 text-brand" />
          <div>
            <p className="font-semibold">Gestionar equipos</p>
            <p className="text-sm text-muted">Precios, destacados, novedades y estado.</p>
          </div>
        </Link>
        <Link href="/admin/solicitudes" className="card flex items-center gap-4 p-6 transition hover:-translate-y-0.5 hover:shadow-lg">
          <Inbox className="h-9 w-9 text-brand" />
          <div>
            <p className="font-semibold">Ver solicitudes</p>
            <p className="text-sm text-muted">Formularios de compra, venta y contacto.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
