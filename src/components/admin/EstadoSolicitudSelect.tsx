"use client";

import { useState, useTransition } from "react";
import { actualizarEstadoSolicitud } from "@/lib/admin/actions";
import { ESTADO_SOLICITUD_LABEL, type EstadoSolicitud } from "@/lib/types";

const OPCIONES = Object.keys(ESTADO_SOLICITUD_LABEL) as EstadoSolicitud[];

export default function EstadoSolicitudSelect({ id, estadoActual }: { id: string; estadoActual: EstadoSolicitud }) {
  const [estado, setEstado] = useState(estadoActual);
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={estado}
      disabled={pending}
      onChange={(e) => {
        const nuevo = e.target.value as EstadoSolicitud;
        setEstado(nuevo);
        startTransition(() => {
          actualizarEstadoSolicitud(id, nuevo);
        });
      }}
      className="input w-auto"
    >
      {OPCIONES.map((o) => (
        <option key={o} value={o}>
          {ESTADO_SOLICITUD_LABEL[o]}
        </option>
      ))}
    </select>
  );
}
