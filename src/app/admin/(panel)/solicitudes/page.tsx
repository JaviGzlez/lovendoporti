import Link from "next/link";
import type { Metadata } from "next";
import { getSolicitudes } from "@/lib/admin/data";
import { TIPO_SOLICITUD_LABEL, ESTADO_SOLICITUD_LABEL, type EstadoSolicitud, type TipoSolicitud } from "@/lib/types";
import { cn, formatFecha, whatsappUrlA } from "@/lib/utils";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export const metadata: Metadata = { title: "Solicitudes · Área privada" };
export const dynamic = "force-dynamic";

const TIPOS: (TipoSolicitud | "todas")[] = ["todas", "busco", "vender", "lo_quiero", "comprar", "contacto"];
const ESTADOS: (EstadoSolicitud | "todos")[] = ["todos", "nuevo", "contactado", "negociacion", "cerrado", "descartado"];

const ESTADO_STYLES: Record<EstadoSolicitud, string> = {
  nuevo: "bg-brand text-white",
  contactado: "bg-amber-100 text-amber-800",
  negociacion: "bg-blue-100 text-blue-800",
  cerrado: "bg-emerald-100 text-emerald-800",
  descartado: "bg-slate-200 text-slate-600",
};

export default async function AdminSolicitudesPage({ searchParams }: PageProps<"/admin/solicitudes">) {
  const sp = await searchParams;
  const tipo = (typeof sp.tipo === "string" ? sp.tipo : "todas") as TipoSolicitud | "todas";
  const estado = (typeof sp.estado === "string" ? sp.estado : "todos") as EstadoSolicitud | "todos";

  const solicitudes = await getSolicitudes({ tipo, estado });

  const hrefFiltro = (t: typeof tipo, e: typeof estado) => {
    const params = new URLSearchParams();
    if (t !== "todas") params.set("tipo", t);
    if (e !== "todos") params.set("estado", e);
    const qs = params.toString();
    return `/admin/solicitudes${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Solicitudes</h1>
        <p className="mt-1 text-muted">Formularios recibidos desde la web: vender, busco, contacto y &quot;lo quiero&quot;.</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {TIPOS.map((t) => (
          <Link
            key={t}
            href={hrefFiltro(t, estado)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition",
              tipo === t ? "bg-brand text-white" : "bg-white text-ink/70 ring-1 ring-line hover:ring-brand"
            )}
          >
            {t === "todas" ? "Todas" : TIPO_SOLICITUD_LABEL[t]}
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {ESTADOS.map((e) => (
          <Link
            key={e}
            href={hrefFiltro(tipo, e)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition",
              estado === e ? "bg-ink text-white" : "bg-white text-ink/60 ring-1 ring-line hover:ring-ink"
            )}
          >
            {e === "todos" ? "Todos los estados" : ESTADO_SOLICITUD_LABEL[e]}
          </Link>
        ))}
      </div>

      {solicitudes.length === 0 ? (
        <div className="card p-8 text-center text-sm text-muted">No hay solicitudes con este filtro.</div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line bg-surface text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Tipo</th>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Detalle</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {solicitudes.map((s) => (
                  <tr key={s.id} className="border-b border-line last:border-0 hover:bg-surface/60">
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-muted">{formatFecha(s.created_at)}</td>
                    <td className="px-4 py-3">{TIPO_SOLICITUD_LABEL[s.tipo]}</td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/solicitudes/${s.id}`} className="font-medium hover:text-brand">
                        {s.nombre}
                      </Link>
                      <p className="text-xs text-muted">{s.telefono}</p>
                    </td>
                    <td className="px-4 py-3 text-ink/80">
                      {s.equipo?.nombre ||
                        [s.marca, s.modelo].filter(Boolean).join(" ") ||
                        s.tipo_equipo ||
                        "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", ESTADO_STYLES[s.estado])}>
                        {ESTADO_SOLICITUD_LABEL[s.estado]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <a
                        href={whatsappUrlA(s.telefono, `Hola ${s.nombre}, te escribo desde Lo vendo por ti.`)}
                        target="_blank"
                        rel="noopener"
                        className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium hover:border-brand hover:text-brand"
                      >
                        <WhatsAppIcon variant="green" className="h-3.5 w-3.5" /> WhatsApp
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
