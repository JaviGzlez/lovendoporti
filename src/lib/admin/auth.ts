/**
 * Identidad del "admin principal" (Javi). Se usa solo para decidir qué se le
 * muestra a quién dentro del panel (p. ej. el historial de actividad no lo ve
 * Mario) — el acceso real a los datos ya lo protege Supabase (RLS) usando
 * este mismo email.
 */
export const ADMIN_PRINCIPAL_EMAIL = "javi@lovendoportidental.es";

export function esAdminPrincipal(email: string | null | undefined): boolean {
  return (email ?? "").trim().toLowerCase() === ADMIN_PRINCIPAL_EMAIL;
}
