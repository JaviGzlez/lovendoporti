import type { MetadataRoute } from "next";
import { getArticulos, getEquipos } from "@/lib/data";
import { SITE_URL } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [equipos, articulos] = await Promise.all([getEquipos({ estado: "todos" }), getArticulos()]);
  const fijas = ["", "/equipos", "/vender-mi-equipo", "/busco-un-equipo", "/blog", "/quien-soy", "/contacto"].map(
    (p) => ({ url: `${SITE_URL}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })
  );
  return [
    ...fijas,
    ...equipos.map((e) => ({ url: `${SITE_URL}/equipos/${e.slug}`, lastModified: e.created_at, priority: 0.8 })),
    ...articulos.map((a) => ({ url: `${SITE_URL}/blog/${a.slug}`, lastModified: a.publicado_at ?? undefined, priority: 0.6 })),
  ];
}
