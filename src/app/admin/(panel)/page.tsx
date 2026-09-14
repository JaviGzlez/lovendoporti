import Link from "next/link";
import type { Metadata } from "next";
import { Package, Inbox, Newspaper, TrendingUp, ArrowRight } from "lucide-react";
import { getResumenPanel } from "@/lib/admin/data";
import { TIPO_SOLICITUD_LABEL } from "@/lib/types";
import { formatPrecio } from "@/lib/utils";

export const metadata: Metadata = { title: "Resumen · Área privada" };
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const resumen = await getResumenPanel();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Resumen</h1>
        <p className="mt-1 text-muted">Un vistazo rápido al catálogo, las solicitudes y las ventas.</p>
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
          <h2 className="text-lg font-bold">Ventas de este mes</h2>
          <Link href="/admin/ventas" className="flex items-center gap-1 text-sm font-medium text-brand hover:underline">
            Ver histórico <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-4 flex flex-wrap gap-8">
          <div>
            <p className="text-sm text-muted">Equipos vendidos</p>
            <p className="text-2xl font-bold">{resumen.ventasDelMes.numVentas}</p>
          </div>
          <div>
            <p className="text-sm text-muted">Facturado</p>
            <p className="text-2xl font-bold">{formatPrecio(resumen.ventasDelMes.totalFacturado)}</p>
          </div>
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/equipos" className="card flex items-center gap-4 p-6 transition hover:-translate-y-0.5 hover:shadow-lg">
          <Package className="h-9 w-9 text-brand" />
          <div>
            <p className="font-semibold">Equipos</p>
            <p className="text-sm text-muted">Precios, destacados, alta y baja.</p>
          </div>
        </Link>
        <Link href="/admin/solicitudes" className="card flex items-center gap-4 p-6 transition hover:-translate-y-0.5 hover:shadow-lg">
          <Inbox className="h-9 w-9 text-brand" />
          <div>
            <p className="font-semibold">Solicitudes</p>
            <p className="text-sm text-muted">Formularios de compra, venta y contacto.</p>
          </div>
        </Link>
        <Link href="/admin/blog" className="card flex items-center gap-4 p-6 transition hover:-translate-y-0.5 hover:shadow-lg">
          <Newspaper className="h-9 w-9 text-brand" />
          <div>
            <p className="font-semibold">Blog</p>
            <p className="text-sm text-muted">Escribe y publica artículos.</p>
          </div>
        </Link>
        <Link href="/admin/ventas" className="card flex items-center gap-4 p-6 transition hover:-translate-y-0.5 hover:shadow-lg">
          <TrendingUp className="h-9 w-9 text-brand" />
          <div>
            <p className="font-semibold">Ventas</p>
            <p className="text-sm text-muted">Resumen mes a mes.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
