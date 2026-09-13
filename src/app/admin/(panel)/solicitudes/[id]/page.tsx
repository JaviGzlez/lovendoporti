import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft, Phone, Mail, Calendar } from "lucide-react";
import { getSolicitudById, getNotasSolicitud } from "@/lib/admin/data";
import { urlFotoSolicitud } from "@/lib/admin/actions";
import { TIPO_SOLICITUD_LABEL } from "@/lib/types";
import { formatFecha, formatPrecio, whatsappUrlA } from "@/lib/utils";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import EstadoSolicitudSelect from "@/components/admin/EstadoSolicitudSelect";
import NotaForm from "@/components/admin/NotaForm";

export const metadata: Metadata = { title: "Solicitud · Área privada" };
export const dynamic = "force-dynamic";

export default async function AdminSolicitudDetallePage({ params }: PageProps<"/admin/solicitudes/[id]">) {
  const { id } = await params;
  const solicitud = await getSolicitudById(id);
  if (!solicitud) notFound();

  const [notas, fotos] = await Promise.all([
    getNotasSolicitud(id),
    Promise.all(solicitud.fotos.map((f) => urlFotoSolicitud(f))),
  ]);

  return (
    <div className="space-y-6">
      <Link href="/admin/solicitudes" className="flex items-center gap-1 text-sm text-muted hover:text-brand">
        <ChevronLeft className="h-4 w-4" /> Volver a solicitudes
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow mb-1">{TIPO_SOLICITUD_LABEL[solicitud.tipo]}</p>
          <h1 className="text-2xl font-bold tracking-tight">{solicitud.nombre}</h1>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
            <Calendar className="h-3.5 w-3.5" /> {formatFecha(solicitud.created_at)}
          </p>
        </div>
        <EstadoSolicitudSelect id={solicitud.id} estadoActual={solicitud.estado} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card space-y-4 p-6 lg:col-span-2">
          <h2 className="font-bold">Datos</h2>
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted">Teléfono</dt>
              <dd className="font-medium">{solicitud.telefono}</dd>
            </div>
            {solicitud.email && (
              <div>
                <dt className="text-muted">Email</dt>
                <dd className="font-medium">{solicitud.email}</dd>
              </div>
            )}
            {solicitud.equipo && (
              <div>
                <dt className="text-muted">Equipo (ficha)</dt>
                <dd>
                  <Link href={`/equipos/${solicitud.equipo.slug}`} target="_blank" className="font-medium text-brand hover:underline">
                    {solicitud.equipo.nombre} · {formatPrecio(solicitud.equipo.precio)}
                  </Link>
                </dd>
              </div>
            )}
            {solicitud.tipo_equipo && (
              <div>
                <dt className="text-muted">Tipo de equipo</dt>
                <dd className="font-medium">{solicitud.tipo_equipo}</dd>
              </div>
            )}
            {(solicitud.marca || solicitud.modelo) && (
              <div>
                <dt className="text-muted">Marca / modelo</dt>
                <dd className="font-medium">{[solicitud.marca, solicitud.modelo].filter(Boolean).join(" · ")}</dd>
              </div>
            )}
            {solicitud.anio && (
              <div>
                <dt className="text-muted">Año</dt>
                <dd className="font-medium">{solicitud.anio}</dd>
              </div>
            )}
            {solicitud.precio_deseado != null && (
              <div>
                <dt className="text-muted">Precio deseado (vende)</dt>
                <dd className="font-medium">{formatPrecio(solicitud.precio_deseado)}</dd>
              </div>
            )}
            {solicitud.presupuesto != null && (
              <div>
                <dt className="text-muted">Presupuesto (busca)</dt>
                <dd className="font-medium">{formatPrecio(solicitud.presupuesto)}</dd>
              </div>
            )}
            {solicitud.origen && (
              <div>
                <dt className="text-muted">Origen</dt>
                <dd className="font-medium">{solicitud.origen}</dd>
              </div>
            )}
          </dl>

          {solicitud.mensaje && (
            <div>
              <p className="text-sm text-muted">Mensaje</p>
              <p className="mt-1 whitespace-pre-wrap rounded-xl bg-surface p-4 text-sm">{solicitud.mensaje}</p>
            </div>
          )}

          {fotos.length > 0 && (
            <div>
              <p className="mb-2 text-sm text-muted">Fotos enviadas</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {fotos.map((url, i) =>
                  url ? (
                    <a key={i} href={url} target="_blank" rel="noopener">
                      {/* eslint-disable-next-line @next/next/no-img-element -- URL firmada temporal, no apta para el optimizador de Next */}
                      <img src={url} alt={`Foto ${i + 1}`} className="aspect-square w-full rounded-xl object-cover" />
                    </a>
                  ) : null
                )}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3 border-t border-line pt-4">
            <a
              href={whatsappUrlA(solicitud.telefono, `Hola ${solicitud.nombre}, te escribo desde Lo vendo por ti.`)}
              target="_blank"
              rel="noopener"
              className="btn bg-[#25D366] text-white hover:bg-[#1eb85a]"
            >
              <WhatsAppIcon className="h-4 w-4" /> Escribir por WhatsApp
            </a>
            <a href={`tel:${solicitud.telefono}`} className="btn-outline">
              <Phone className="h-4 w-4" /> Llamar
            </a>
            {solicitud.email && (
              <a href={`mailto:${solicitud.email}`} className="btn-outline">
                <Mail className="h-4 w-4" /> Email
              </a>
            )}
          </div>
        </div>

        <div className="card space-y-4 p-6">
          <h2 className="font-bold">Notas de seguimiento</h2>
          <NotaForm solicitudId={solicitud.id} />
          {notas.length === 0 ? (
            <p className="text-sm text-muted">Todavía no hay notas.</p>
          ) : (
            <ul className="space-y-3">
              {notas.map((n) => (
                <li key={n.id} className="rounded-xl bg-surface p-3 text-sm">
                  <p className="whitespace-pre-wrap">{n.nota}</p>
                  <p className="mt-1.5 text-xs text-muted">{formatFecha(n.created_at)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
