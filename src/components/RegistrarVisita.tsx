"use client";

import { useEffect } from "react";
import { registrarEvento } from "@/lib/actions";

/** Registra una visita a la ficha (estadísticas básicas). */
export default function RegistrarVisita({ equipoId }: { equipoId: string }) {
  useEffect(() => {
    registrarEvento("visita", equipoId);
  }, [equipoId]);
  return null;
}
