"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAdminSupabase, createServerSupabase, supabaseConfigured } from "@/lib/supabase/server";
import type { EstadoEquipo, EstadoSolicitud } from "@/lib/types";

export interface AdminActionResult {
  ok: boolean;
  error?: string;
}

/**
 * Login del panel privado. Solo existen las cuentas de Mario y Javi,
 * creadas a mano desde Supabase (Authentication -> Users).
 */
export async function adminLogin(_: AdminActionResult | null, fd: FormData): Promise<AdminActionResult> {
  if (!supabaseConfigured) return { ok: false, error: "El panel todavía no está configurado (falta Supabase)." };

  const email = String(fd.get("email") ?? "").trim();
  const password = String(fd.get("password") ?? "");
  const next = String(fd.get("next") ?? "/admin");
  if (!email || !password) return { ok: false, error: "Indica el email y la contraseña." };

  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, error: "Email o contraseña incorrectos." };

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function adminLogout() {
  if (!supabaseConfigured) return;
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

/**
 * Actualiza un equipo desde el panel. Si el precio nuevo es menor que el
 * precio actual, el precio actual pasa a "precio_anterior" (se muestra
 * tachado y con la etiqueta "Rebajado"). Si el precio sube por encima del
 * precio_anterior guardado, se quita la etiqueta de rebajado.
 */
export async function actualizarEquipo(_: AdminActionResult | null, fd: FormData): Promise<AdminActionResult> {
  if (!supabaseConfigured) return { ok: false, error: "Supabase no está configurado." };

  const id = String(fd.get("id") ?? "");
  if (!id) return { ok: false, error: "Falta el equipo." };

  const nombre = String(fd.get("nombre") ?? "").trim();
  if (!nombre) return { ok: false, error: "Indica el nombre del equipo." };

  const precioRaw = String(fd.get("precio") ?? "").replace(",", ".").trim();
  const precioNuevo = precioRaw ? Number(precioRaw) : null;
  if (precioRaw && !Number.isFinite(precioNuevo)) return { ok: false, error: "El precio no es válido." };

  const quitarRebaja = fd.get("quitar_rebaja") === "on";
  const estado = String(fd.get("estado") ?? "disponible") as EstadoEquipo;
  const destacado = fd.get("destacado") === "on";
  const nuevo = fd.get("nuevo") === "on";
  const visible = fd.get("visible") === "on";

  const supabase = await createServerSupabase();
  const { data: actual, error: errorLectura } = await supabase
    .from("equipos")
    .select("precio, precio_anterior, estado, vendido_at")
    .eq("id", id)
    .maybeSingle();
  if (errorLectura || !actual) return { ok: false, error: "No se encontró el equipo." };

  let precioAnterior: number | null = actual.precio_anterior;
  if (quitarRebaja) {
    precioAnterior = null;
  } else if (precioNuevo != null && actual.precio != null && precioNuevo < actual.precio) {
    // Baja de precio: guardamos el precio actual como "anterior" para mostrarlo tachado.
    precioAnterior = actual.precio;
  } else if (precioAnterior != null && precioNuevo != null && precioNuevo >= precioAnterior) {
    // Ha vuelto a subir por encima (o igual) del precio anterior: ya no está rebajado.
    precioAnterior = null;
  }

  const vendidoAt =
    estado === "vendido" && actual.estado !== "vendido"
      ? new Date().toISOString()
      : estado !== "vendido"
        ? null
        : actual.vendido_at;

  const { error } = await supabase
    .from("equipos")
    .update({
      nombre,
      marca: String(fd.get("marca") ?? "").trim() || null,
      modelo: String(fd.get("modelo") ?? "").trim() || null,
      precio: precioNuevo,
      precio_anterior: precioAnterior,
      estado,
      destacado,
      nuevo,
      visible,
      vendido_at: vendidoAt,
      descripcion: String(fd.get("descripcion") ?? "").trim() || null,
    })
    .eq("id", id);
  if (error) {
    console.error("Error actualizando equipo", error);
    return { ok: false, error: "No se pudo guardar. Inténtalo de nuevo." };
  }

  revalidatePath("/admin/equipos");
  revalidatePath("/equipos");
  revalidatePath("/");
  return { ok: true };
}

/** Cambia el estado (nuevo/contactado/negociación/cerrado/descartado) de una solicitud. */
export async function actualizarEstadoSolicitud(id: string, estado: EstadoSolicitud) {
  if (!supabaseConfigured) return { ok: false, error: "Supabase no está configurado." };
  const supabase = await createServerSupabase();
  const { error } = await supabase.from("solicitudes").update({ estado }).eq("id", id);
  if (error) return { ok: false, error: "No se pudo actualizar." };
  revalidatePath("/admin/solicitudes");
  revalidatePath(`/admin/solicitudes/${id}`);
  return { ok: true };
}

/** Añade una nota de seguimiento a una solicitud. */
export async function agregarNota(_: AdminActionResult | null, fd: FormData): Promise<AdminActionResult> {
  if (!supabaseConfigured) return { ok: false, error: "Supabase no está configurado." };
  const solicitud_id = String(fd.get("solicitud_id") ?? "");
  const nota = String(fd.get("nota") ?? "").trim();
  if (!solicitud_id || !nota) return { ok: false, error: "Escribe una nota." };

  const supabase = await createServerSupabase();
  const { error } = await supabase.from("solicitud_notas").insert({ solicitud_id, nota });
  if (error) return { ok: false, error: "No se pudo guardar la nota." };

  revalidatePath(`/admin/solicitudes/${solicitud_id}`);
  return { ok: true };
}

/** URL firmada temporal para ver una foto del bucket privado "solicitudes". */
export async function urlFotoSolicitud(path: string): Promise<string | null> {
  if (!supabaseConfigured || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  const admin = createAdminSupabase();
  const { data, error } = await admin.storage.from("solicitudes").createSignedUrl(path, 60 * 60);
  if (error) return null;
  return data.signedUrl;
}
