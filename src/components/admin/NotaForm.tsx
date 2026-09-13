"use client";

import { useActionState, useRef } from "react";
import { agregarNota, type AdminActionResult } from "@/lib/admin/actions";
import SubmitButton from "@/components/SubmitButton";

export default function NotaForm({ solicitudId }: { solicitudId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action] = useActionState<AdminActionResult | null, FormData>(async (prev, fd) => {
    const res = await agregarNota(prev, fd);
    if (res.ok) formRef.current?.reset();
    return res;
  }, null);

  return (
    <form ref={formRef} action={action} className="space-y-2">
      <input type="hidden" name="solicitud_id" value={solicitudId} />
      <textarea
        name="nota"
        required
        rows={2}
        placeholder="Añadir una nota (p. ej. «Llamado, interesado, vuelvo a contactar el lunes»)"
        className="input"
      />
      {state?.error && <p className="text-xs text-red-600">{state.error}</p>}
      <SubmitButton className="btn-outline w-full text-sm">Añadir nota</SubmitButton>
    </form>
  );
}
