import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";
import { supabaseConfigured } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Acceder · Área privada", robots: { index: false } };

export default async function AdminLoginPage({ searchParams }: PageProps<"/admin/login">) {
  const { next } = await searchParams;
  const nextPath = typeof next === "string" ? next : "/admin";

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="block text-lg font-bold tracking-tight text-brand">Lo vendo por ti</span>
          <span className="block text-sm text-muted">Área privada</span>
        </div>
        {supabaseConfigured ? (
          <LoginForm next={nextPath} />
        ) : (
          <div className="card p-6 text-center text-sm text-muted">
            El panel todavía no está conectado a la base de datos. Configura Supabase para poder entrar.
          </div>
        )}
      </div>
    </div>
  );
}
