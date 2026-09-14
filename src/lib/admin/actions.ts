"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAdminSupabase, createServerSupabase, supabaseConfigured } from "@/lib/supabase/server";
import { slugify, formatPrecio } from "@/lib/utils";
import { subirFotos, archivosDe } from "@/lib/admin/storage";
import type { EstadoEquipo, EstadoSolicitud, AccionEvento, EntidadEvento } from "@/lib/types";
import { ESTADO_LABEL } from "@/lib/types";

export interface AdminActionResult {
  ok: boolean;
  error?: string;
}

/** Genera un slug único para una tabla (equipos o articulos) a partir de un texto. */
async function slugUnico(
  supabase: Awaited<ReturnType<typeof createServerSupabase>>,
  tabla: "equipos" | "articulos",
  texto: string
): Promise<string> {
  const base = slugify(texto) || "sin-titulo";
  let slug = base;
  for (let i = 2; i < 50; i++) {
    const { data } = await supabase.from(tabla).select("id").eq("slug", slug).maybeSingle();
    if (!data) break;
    slug = `${base}-${i}`;
  }
  return slug;
}

/** Deja constancia en el historial de actividad de quién ha creado/editado/borrado algo. */
async function registrarEvento(
  supabase: Awaited<ReturnType<typeof createServerSupabase>>,
  accion: AccionEvento,
  entidad: EntidadEvento,
  entidad_id: string | null,
  entidad_nombre: string | null,
  detalle?: string | null
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { error } = await supabase.from("admin_eventos").insert({
    actor_email: user?.email ?? "desconocido",
    accion,
    entidad,
    entidad_id,
    entidad_nombre,
    detalle: detalle ?? null,
  });
  // No hacemos que falle la acción principal por esto, pero si la tabla no
  // existe o RLS lo bloquea queremos verlo en los logs de Vercel.
  if (error) console.error("No se pudo registrar el evento de actividad", error);
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
    .select("precio, precio_anterior, estado, vendido_at, slug, fotos, destacado, nuevo, visible")
    .eq("id", id)
    .maybeSingle();
  if (errorLectura || !actual) return { ok: false, error: "No se encontró el equipo." };

  const fotosQuitar = fd.getAll("fotos_quitar").map(String);
  let fotos: string[] = (actual.fotos ?? []).filter((f: string) => !fotosQuitar.includes(f));
  const fotosNuevas = archivosDe(fd, "fotos_nuevas");
  if (fotosNuevas.length) {
    const subida = await subirFotos(supabase, "equipos", actual.slug, fotosNuevas);
    fotos = [...fotos, ...subida.paths];
    if (subida.error) return { ok: false, error: subida.error };
  }

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
      fotos,
    })
    .eq("id", id);
  if (error) {
    console.error("Error actualizando equipo", error);
    return { ok: false, error: "No se pudo guardar. Inténtalo de nuevo." };
  }

  // Se acaba de marcar como vendido (no lo estaba antes): queda registrado en "Ventas".
  if (estado === "vendido" && actual.estado !== "vendido") {
    await supabase.from("ventas").insert({
      equipo_id: id,
      precio_final: precioNuevo ?? actual.precio ?? 0,
      ingreso: 0,
    });
  }

  const cambios: string[] = [];
  if (precioNuevo !== actual.precio) {
    cambios.push(`Precio: ${formatPrecio(actual.precio)} → ${formatPrecio(precioNuevo)}`);
  }
  if (estado !== actual.estado) {
    cambios.push(`Estado: ${ESTADO_LABEL[actual.estado as EstadoEquipo]} → ${ESTADO_LABEL[estado]}`);
  }
  if (destacado !== actual.destacado) cambios.push(destacado ? "Marcado como destacado" : "Quitado de destacados");
  if (nuevo !== actual.nuevo) cambios.push(nuevo ? "Etiqueta «Nuevo» añadida" : "Etiqueta «Nuevo» quitada");
  if (visible !== actual.visible) cambios.push(visible ? "Vuelto a visible en la web" : "Ocultado de la web");
  if (fotosQuitar.length) cambios.push(`${fotosQuitar.length} foto(s) quitada(s)`);
  if (fotosNuevas.length) cambios.push(`${fotosNuevas.length} foto(s) añadida(s)`);

  await registrarEvento(supabase, "editar", "equipo", id, nombre, cambios.join(" · ") || null);

  revalidatePath("/admin/equipos");
  revalidatePath("/equipos");
  revalidatePath("/");
  revalidatePath("/admin/ventas");
  revalidatePath("/admin");
  return { ok: true };
}

/** Crea un equipo nuevo desde el panel (sin fotos todavía: se pueden añadir después). */
export async function crearEquipo(_: AdminActionResult | null, fd: FormData): Promise<AdminActionResult> {
  if (!supabaseConfigured) return { ok: false, error: "Supabase no está configurado." };

  const nombre = String(fd.get("nombre") ?? "").trim();
  if (!nombre) return { ok: false, error: "Indica el nombre del equipo." };

  const precioRaw = String(fd.get("precio") ?? "").replace(",", ".").trim();
  const precio = precioRaw ? Number(precioRaw) : null;
  if (precioRaw && !Number.isFinite(precio)) return { ok: false, error: "El precio no es válido." };

  const categoriaIdRaw = String(fd.get("categoria_id") ?? "").trim();
  const categoria_id = categoriaIdRaw ? Number(categoriaIdRaw) : null;

  const anioRaw = String(fd.get("anio") ?? "").trim();
  const anio = anioRaw ? Number(anioRaw) : null;

  const horasRaw = String(fd.get("horas_uso") ?? "").trim();
  const horas_uso = horasRaw ? Number(horasRaw) : null;

  const fotosManual = String(fd.get("fotos") ?? "")
    .split("\n")
    .map((f) => f.trim())
    .filter(Boolean);

  const supabase = await createServerSupabase();
  const slug = await slugUnico(supabase, "equipos", nombre);

  let fotos = [...fotosManual];
  const fotosNuevas = archivosDe(fd, "fotos_nuevas");
  if (fotosNuevas.length) {
    const subida = await subirFotos(supabase, "equipos", slug, fotosNuevas);
    fotos = [...fotos, ...subida.paths];
    if (subida.error) return { ok: false, error: subida.error };
  }

  const { data: nuevo, error } = await supabase
    .from("equipos")
    .insert({
      nombre,
      slug,
      marca: String(fd.get("marca") ?? "").trim() || null,
      modelo: String(fd.get("modelo") ?? "").trim() || null,
      categoria_id,
      precio,
      anio,
      horas_uso,
      descripcion: String(fd.get("descripcion") ?? "").trim() || null,
      incluye: String(fd.get("incluye") ?? "").trim() || null,
      fotos,
      destacado: fd.get("destacado") === "on",
      nuevo: fd.get("nuevo") === "on",
      visible: fd.get("visible") === "on",
    })
    .select("id")
    .single();

  if (error || !nuevo) {
    console.error("Error creando equipo", error);
    return { ok: false, error: "No se pudo crear el equipo." };
  }

  const detalleCreacion = [
    [String(fd.get("marca") ?? "").trim(), String(fd.get("modelo") ?? "").trim()].filter(Boolean).join(" "),
    `Precio: ${formatPrecio(precio)}`,
    fotos.length ? `${fotos.length} foto(s)` : "sin fotos",
  ]
    .filter(Boolean)
    .join(" · ");
  await registrarEvento(supabase, "crear", "equipo", nuevo.id, nombre, detalleCreacion);

  revalidatePath("/admin/equipos");
  revalidatePath("/equipos");
  revalidatePath("/");
  redirect(`/admin/equipos/${nuevo.id}`);
}

/** Borra un equipo del catálogo. Si tiene ventas registradas, falla a propósito (mejor marcarlo oculto). */
export async function borrarEquipo(id: string): Promise<AdminActionResult> {
  if (!supabaseConfigured) return { ok: false, error: "Supabase no está configurado." };
  const supabase = await createServerSupabase();

  const { data: equipo } = await supabase.from("equipos").select("nombre").eq("id", id).maybeSingle();

  const { error } = await supabase.from("equipos").delete().eq("id", id);
  if (error) {
    console.error("Error borrando equipo", error);
    const mensaje =
      error.code === "23503"
        ? "No se puede borrar: este equipo tiene una venta registrada. Márcalo como «no visible» en su lugar."
        : "No se pudo borrar el equipo.";
    return { ok: false, error: mensaje };
  }

  await registrarEvento(supabase, "borrar", "equipo", id, equipo?.nombre ?? null);

  revalidatePath("/admin/equipos");
  revalidatePath("/equipos");
  revalidatePath("/");
  return { ok: true };
}

/** Crea un artículo nuevo del blog. */
export async function crearArticulo(_: AdminActionResult | null, fd: FormData): Promise<AdminActionResult> {
  if (!supabaseConfigured) return { ok: false, error: "Supabase no está configurado." };

  const titulo = String(fd.get("titulo") ?? "").trim();
  if (!titulo) return { ok: false, error: "Indica el título." };

  const publicado = fd.get("publicado") === "on";
  const supabase = await createServerSupabase();
  const slug = await slugUnico(supabase, "articulos", titulo);

  let portada = String(fd.get("portada") ?? "").trim() || null;
  const [archivoPortada] = archivosDe(fd, "portada_nueva");
  if (archivoPortada) {
    const subida = await subirFotos(supabase, "blog", slug, [archivoPortada]);
    if (subida.error) return { ok: false, error: subida.error };
    portada = subida.paths[0] ?? portada;
  }

  const { data: nuevo, error } = await supabase
    .from("articulos")
    .insert({
      titulo,
      slug,
      extracto: String(fd.get("extracto") ?? "").trim() || null,
      contenido: String(fd.get("contenido") ?? "").trim() || null,
      portada,
      publicado,
      publicado_at: publicado ? new Date().toISOString() : null,
    })
    .select("id")
    .single();

  if (error || !nuevo) {
    console.error("Error creando artículo", error);
    return { ok: false, error: "No se pudo crear el artículo." };
  }

  await registrarEvento(supabase, "crear", "articulo", nuevo.id, titulo, publicado ? "Publicado" : "Guardado como borrador");

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect(`/admin/blog/${nuevo.id}`);
}

/** Actualiza un artículo existente del blog. */
export async function actualizarArticulo(_: AdminActionResult | null, fd: FormData): Promise<AdminActionResult> {
  if (!supabaseConfigured) return { ok: false, error: "Supabase no está configurado." };

  const id = String(fd.get("id") ?? "");
  if (!id) return { ok: false, error: "Falta el artículo." };

  const titulo = String(fd.get("titulo") ?? "").trim();
  if (!titulo) return { ok: false, error: "Indica el título." };

  const publicado = fd.get("publicado") === "on";
  const supabase = await createServerSupabase();

  const { data: actual } = await supabase
    .from("articulos")
    .select("publicado_at, slug, publicado, titulo")
    .eq("id", id)
    .maybeSingle();

  const publicado_at = publicado ? (actual?.publicado_at ?? new Date().toISOString()) : null;

  let portada = String(fd.get("portada") ?? "").trim() || null;
  const [archivoPortada] = archivosDe(fd, "portada_nueva");
  if (archivoPortada) {
    const subida = await subirFotos(supabase, "blog", actual?.slug ?? id, [archivoPortada]);
    if (subida.error) return { ok: false, error: subida.error };
    portada = subida.paths[0] ?? portada;
  }

  const { error } = await supabase
    .from("articulos")
    .update({
      titulo,
      extracto: String(fd.get("extracto") ?? "").trim() || null,
      contenido: String(fd.get("contenido") ?? "").trim() || null,
      portada,
      publicado,
      publicado_at,
    })
    .eq("id", id);

  if (error) {
    console.error("Error actualizando artículo", error);
    return { ok: false, error: "No se pudo guardar." };
  }

  const cambiosArticulo: string[] = [];
  if (actual?.titulo && actual.titulo !== titulo) cambiosArticulo.push(`Título: "${actual.titulo}" → "${titulo}"`);
  if (actual && actual.publicado !== publicado) cambiosArticulo.push(publicado ? "Publicado" : "Pasado a borrador");
  if (archivoPortada) cambiosArticulo.push("Portada cambiada");
  await registrarEvento(supabase, "editar", "articulo", id, titulo, cambiosArticulo.join(" · ") || null);

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return { ok: true };
}

/** Borra un artículo del blog. */
export async function borrarArticulo(id: string): Promise<AdminActionResult> {
  if (!supabaseConfigured) return { ok: false, error: "Supabase no está configurado." };
  const supabase = await createServerSupabase();

  const { data: articulo } = await supabase.from("articulos").select("titulo").eq("id", id).maybeSingle();

  const { error } = await supabase.from("articulos").delete().eq("id", id);
  if (error) {
    console.error("Error borrando artículo", error);
    return { ok: false, error: "No se pudo borrar el artículo." };
  }

  await registrarEvento(supabase, "borrar", "articulo", id, articulo?.titulo ?? null);

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return { ok: true };
}

/** Cambia el estado (nuevo/contactado/negociación/cerrado/descartado) de una solicitud. */
export async function actualizarEstadoSolicitud(id: string, estado: EstadoSolicitud) {
  if (!supabaseConfigured) return { ok: false, error: "Supabase no está configurado." };
  const supabase = await createServerSupabase();

  const { data: solicitud } = await supabase.from("solicitudes").select("nombre").eq("id", id).maybeSingle();

  const { error } = await supabase.from("solicitudes").update({ estado }).eq("id", id);
  if (error) return { ok: false, error: "No se pudo actualizar." };

  await registrarEvento(supabase, "editar", "solicitud", id, solicitud?.nombre ?? null, `Estado → ${estado}`);

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

  const { data: solicitud } = await supabase.from("solicitudes").select("nombre").eq("id", solicitud_id).maybeSingle();
  await registrarEvento(supabase, "editar", "solicitud", solicitud_id, solicitud?.nombre ?? null, `Nota: ${nota}`);

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
