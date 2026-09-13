"use client";

import { useActionState } from "react";
import { LogIn } from "lucide-react";
import { adminLogin, type AdminActionResult } from "@/lib/admin/actions";
import SubmitButton from "@/components/SubmitButton";

export default function LoginForm({ next }: { next: string }) {
  const [state, action] = useActionState<AdminActionResult | null, FormData>(adminLogin, null);

  return (
    <form action={action} className="card space-y-4 p-6 sm:p-8">
      <input type="hidden" name="next" value={next} />
      <div>
        <label className="label" htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="username" className="input" />
      </div>
      <div>
        <label className="label" htmlFor="password">Contraseña</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className="input" />
      </div>
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      <SubmitButton className="btn-primary w-full">
        <LogIn className="h-4 w-4" /> Entrar
      </SubmitButton>
    </form>
  );
}
