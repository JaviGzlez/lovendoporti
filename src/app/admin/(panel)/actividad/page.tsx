import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { createServerSupabase } from "@/lib/supabase/server";
import { esAdminPrincipal } from "@/lib/admin/auth";
import { getEventosAdmin } from "@/lib/admin/data";
import { formatFecha } from "@/lib/utils";

export const metadata: Metadata = { title: "Actividad · Área privada" };
export const dynamic = "force-dynamic";

const ACCION_LABEL: Record<string, string> = { crear: "creó", editar: "editó", borrar: "borró" };
const ENTIDAD_LABEL: Record<string, string> = { equipo: "el equipo", articulo: "el artículo", solicitud: "la solicitud de" };

export default async function ActividadPage() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // Defensa extra además de la RLS de la base de datos: si alguien que no es
  // Javi llega a esta URL, se le manda de vuelta al resumen.
  if (!esAdminPrincipal(user?.email)) redirect("/admin");

  const eventos = await getEventosAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <ShieldCheck className="h-6 w-6 text-brand" /> Actividad
        </h1>
        <p className="mt-1 text-muted">Lo que se crea, edita o borra en el panel. Solo tú puedes ver esta página.</p>
      </div>

      {eventos.length === 0 ? (
        <p className="card p-6 text-sm text-muted">Todavía no hay actividad registrada.</p>
      ) : (
        <ul className="space-y-2">
          {eventos.map((e) => (
            <li key={e.id} className="card flex flex-wrap items-center justify-between gap-2 p-4 text-sm">
              <span>
                <span className="font-medium">{e.actor_email}</span> {ACCION_LABEL[e.accion] ?? e.accion}{" "}
                {ENTIDAD_LABEL[e.entidad] ?? e.entidad}{" "}
                <span className="font-medium">«{e.entidad_nombre ?? "—"}»</span>
                {e.detalle && <span className="text-muted"> — {e.detalle}</span>}
              </span>
              <span className="whitespace-nowrap text-xs text-muted">{formatFecha(e.created_at)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
