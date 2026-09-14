import "server-only";
import sharp from "sharp";
import type { createServerSupabase } from "@/lib/supabase/server";

export interface SubidaResultado {
  paths: string[];
  error?: string;
}

/**
 * Sube una o varias fotos a un bucket de Supabase Storage (equipos o blog),
 * convirtiéndolas antes a WebP (pesan menos y evitamos líos de formato).
 * Si alguna foto no se puede leer (p. ej. un HEIC de iPhone que la librería
 * no soporta), se para ahí y se devuelve un mensaje claro para el usuario.
 */
export async function subirFotos(
  supabase: Awaited<ReturnType<typeof createServerSupabase>>,
  bucket: "equipos" | "blog",
  carpeta: string,
  archivos: File[]
): Promise<SubidaResultado> {
  const paths: string[] = [];

  for (const archivo of archivos) {
    if (!archivo || archivo.size === 0) continue;

    let buffer: Buffer;
    try {
      const original = Buffer.from(await archivo.arrayBuffer());
      buffer = await sharp(original).rotate().resize(1600, 1600, { fit: "inside", withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
    } catch {
      return {
        paths,
        error:
          `No se pudo leer la foto "${archivo.name}". Prueba a exportarla como JPG o PNG (en iPhone: ` +
          `Ajustes → Cámara → Formatos → «Más compatible», o compártela por WhatsApp contigo mismo y usa esa ` +
          `copia) y vuelve a intentarlo.`,
      };
    }

    const nombre = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.webp`;
    const path = `${carpeta}/${nombre}`;
    const { error } = await supabase.storage.from(bucket).upload(path, buffer, {
      contentType: "image/webp",
      upsert: false,
    });
    if (error) {
      return { paths, error: `No se pudo subir "${archivo.name}": ${error.message}` };
    }
    paths.push(path);
  }

  return { paths };
}

/** Extrae del FormData los archivos reales subidos en un campo (ignora huecos vacíos). */
export function archivosDe(fd: FormData, campo: string): File[] {
  return fd.getAll(campo).filter((f): f is File => f instanceof File && f.size > 0);
}
