"use server";

import { createAdminSupabase, createPublicSupabase, supabaseConfigured } from "./supabase/server";
import type { NuevaSolicitud, TipoSolicitud } from "./types";
import { whatsappUrl } from "./utils";

export interface ActionResult {
  ok: boolean;
  error?: string;
  whatsapp?: string;
}

const MAX_FOTOS = 8;
const MAX_FOTO_BYTES = 10 * 1024 * 1024;

const str = (fd: FormData, k: string) => {
  const v = fd.get(k);
  return typeof v === "string" && v.trim() ? v.trim() : null;
};
const num = (fd: FormData, k: string) => {
  const v = str(fd, k);
  if (!v) return null;
  const n = Number(v.replace(",", "."));
  return Number.isFinite(n) ? n : null;
};

function validar(fd: FormData) {
  const nombre = str(fd, "nombre");
  const telefono = str(fd, "telefono");
  const email = str(fd, "email");
  const consentimiento = fd.get("consentimiento") === "on";
  // Honeypot anti-spam: campo oculto que los humanos no rellenan
  if (str(fd, "website")) return { error: "Solicitud no válida." };
  if (!nombre || nombre.length < 2) return { error: "Indica tu nombre." };
  if (!telefono || telefono.replace(/\D/g, "").length < 9) return { error: "Indica un teléfono válido." };
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "El email no es válido." };
  if (!consentimiento) return { error: "Debes aceptar la política de privacidad." };
  return { nombre, telefono, email, consentimiento };
}

async function guardarSolicitud(s: NuevaSolicitud): Promise<{ id: string | null; error?: string }> {
  if (!supabaseConfigured) {
    console.log("[DEMO] Solicitud recibida (no se guarda: Supabase sin configurar):", s);
    return { id: null };
  }
  const sb = createPublicSupabase();
  const { data, error } = await sb.from("solicitudes").insert(s).select("id").single();
  if (error) {
    console.error("Error guardando solicitud", error);
    return { id: null, error: "No se pudo guardar la solicitud. Inténtalo de nuevo." };
  }
  return { id: data.id as string };
}

/** Registra un evento de estadísticas (visita, clic en Lo quiero, WhatsApp). */
export async function registrarEvento(tipo: "visita" | "lo_quiero" | "whatsapp", equipo_id?: string | null) {
  if (!supabaseConfigured) return;
  try {
    const sb = createPublicSupabase();
    await sb.from("eventos").insert({ tipo, equipo_id: equipo_id ?? null });
  } catch (e) {
    console.error("Error registrando evento", e);
  }
}

/**
 * Formulario del WhatsApp flotante / contacto: guarda el contacto y devuelve la URL de WhatsApp.
 */
export async function enviarContacto(_: ActionResult | null, fd: FormData): Promise<ActionResult> {
  const v = validar(fd);
  if ("error" in v) return { ok: false, error: v.error };

  const intencion = str(fd, "intencion") === "vender" ? "vender" : "comprar";
  const tipo: TipoSolicitud = str(fd, "tipo") === "contacto" ? "contacto" : intencion;
  const mensaje = str(fd, "mensaje");

  const { error } = await guardarSolicitud({
    tipo,
    nombre: v.nombre,
    telefono: v.telefono,
    email: v.email,
    mensaje,
    consentimiento: true,
    origen: str(fd, "origen") ?? "whatsapp-flotante",
  });
  if (error) return { ok: false, error };

  await registrarEvento("whatsapp");

  const texto =
    `Hola Mario, soy ${v.nombre}. ` +
    (tipo === "vender" ? "Quiero vender un equipo. " : tipo === "comprar" ? "Quiero comprar un equipo. " : "") +
    (mensaje ? `\n\n${mensaje}` : "") +
    `\n\nMi teléfono: ${v.telefono}`;

  return { ok: true, whatsapp: whatsappUrl(texto) };
}

/**
 * Botón "Lo quiero" de una ficha: guarda la solicitud ligada al equipo y devuelve la URL de WhatsApp.
 */
export async function loQuiero(_: ActionResult | null, fd: FormData): Promise<ActionResult> {
  const v = validar(fd);
  if ("error" in v) return { ok: false, error: v.error };

  const equipo_id = str(fd, "equipo_id");
  const referencia = str(fd, "referencia") ?? "";
  const equipoNombre = str(fd, "equipo_nombre") ?? "";
  const precio = str(fd, "precio") ?? "";
  const mensaje = str(fd, "mensaje");

  const { error } = await guardarSolicitud({
    tipo: "lo_quiero",
    nombre: v.nombre,
    telefono: v.telefono,
    email: v.email,
    mensaje,
    equipo_id: supabaseConfigured ? equipo_id : null,
    consentimiento: true,
    origen: `ficha:${referencia}`,
  });
  if (error) return { ok: false, error };

  await registrarEvento("lo_quiero", supabaseConfigured ? equipo_id : null);

  const texto =
    `Hola Mario, me interesa el equipo ${equipoNombre} (ref. ${referencia})` +
    (precio ? ` publicado por ${precio}` : "") +
    `.` +
    (mensaje ? `\n\n${mensaje}` : "") +
    `\n\nSoy ${v.nombre}, mi teléfono: ${v.telefono}`;

  return { ok: true, whatsapp: whatsappUrl(texto) };
}

/**
 * Vender mi equipo: guarda los datos y sube las fotos al bucket privado "solicitudes".
 */
export async function venderEquipo(_: ActionResult | null, fd: FormData): Promise<ActionResult> {
  const v = validar(fd);
  if ("error" in v) return { ok: false, error: v.error };

  const tipo_equipo = str(fd, "tipo_equipo");
  const marca = str(fd, "marca");
  if (!tipo_equipo) return { ok: false, error: "Indica el tipo de equipo." };
  if (!marca) return { ok: false, error: "Indica la marca." };

  const archivos = fd.getAll("fotos").filter((f): f is File => f instanceof File && f.size > 0);
  if (archivos.length > MAX_FOTOS) return { ok: false, error: `Máximo ${MAX_FOTOS} fotografías.` };
  for (const f of archivos) {
    if (f.size > MAX_FOTO_BYTES) return { ok: false, error: `La foto "${f.name}" supera los 10 MB.` };
    if (!/^image\/(jpeg|png|webp)$/.test(f.type)) return { ok: false, error: `"${f.name}" no es una imagen válida (JPG, PNG o WEBP).` };
  }

  // Subida de fotos (solo con Supabase configurado). Bucket privado, carpeta por solicitud.
  const fotos: string[] = [];
  if (supabaseConfigured && archivos.length && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const admin = createAdminSupabase();
    const carpeta = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    for (const [i, f] of archivos.entries()) {
      const ext = f.type === "image/png" ? "png" : f.type === "image/webp" ? "webp" : "jpg";
      const path = `${carpeta}/${i + 1}.${ext}`;
      const { error } = await admin.storage.from("solicitudes").upload(path, f, { contentType: f.type });
      if (error) {
        console.error("Error subiendo foto", error);
        return { ok: false, error: "No se pudieron subir las fotografías. Inténtalo de nuevo." };
      }
      fotos.push(path);
    }
  }

  const { error } = await guardarSolicitud({
    tipo: "vender",
    nombre: v.nombre,
    telefono: v.telefono,
    email: v.email,
    tipo_equipo,
    marca,
    modelo: str(fd, "modelo"),
    anio: num(fd, "anio"),
    precio_deseado: num(fd, "precio_deseado"),
    mensaje: str(fd, "descripcion"),
    fotos,
    consentimiento: true,
    origen: "vender-mi-equipo",
  });
  if (error) return { ok: false, error };

  return { ok: true };
}

/**
 * Busco un equipo: entra en el mini CRM para cruzar con futuras altas.
 */
export async function buscoEquipo(_: ActionResult | null, fd: FormData): Promise<ActionResult> {
  const v = validar(fd);
  if ("error" in v) return { ok: false, error: v.error };

  const tipo_equipo = str(fd, "tipo_equipo");
  if (!tipo_equipo) return { ok: false, error: "Indica qué equipo buscas." };

  const { error } = await guardarSolicitud({
    tipo: "busco",
    nombre: v.nombre,
    telefono: v.telefono,
    email: v.email,
    tipo_equipo,
    marca: str(fd, "marca"),
    modelo: str(fd, "modelo"),
    presupuesto: num(fd, "presupuesto"),
    mensaje: str(fd, "mensaje"),
    consentimiento: true,
    origen: "busco-un-equipo",
  });
  if (error) return { ok: false, error };

  return { ok: true };
}
