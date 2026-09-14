import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerSupabase, supabaseConfigured } from "@/lib/supabase/server";
import { esAdminPrincipal } from "@/lib/admin/auth";
import AdminNav from "@/components/admin/AdminNav";

export const metadata: Metadata = { robots: { index: false, follow: false } };

/**
 * Layout del panel privado (todo lo que hay dentro de /admin excepto /admin/login).
 * proxy.ts ya redirige a /admin/login si no hay sesión, pero comprobamos aquí
 * también por si el middleware no llega a ejecutarse (p. ej. export estático).
 */
export default async function AdminPanelLayout({ children }: LayoutProps<"/admin">) {
  if (!supabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface px-4 text-center">
        <div className="card max-w-md p-8">
          <h1 className="text-xl font-bold">El panel aún no está conectado</h1>
          <p className="mt-2 text-sm text-muted">
            Falta configurar Supabase (base de datos) para poder usar el panel privado.
          </p>
        </div>
      </div>
    );
  }

  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-surface">
      <AdminNav email={user.email ?? ""} isAdminPrincipal={esAdminPrincipal(user.email)} />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
