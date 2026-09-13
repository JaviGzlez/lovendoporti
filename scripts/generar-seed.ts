/**
 * Genera supabase/seed-real.sql a partir de los datos que ya están en el
 * código (demo-data.ts / articulos.ts), para que al conectar Supabase el
 * catálogo y el blog reales no se pierdan (en vez de quedar vacíos o con
 * los datos de ejemplo antiguos de seed.sql).
 *
 * Uso: npx tsx scripts/generar-seed.ts > supabase/seed-real.sql
 */
import { demoEquipos } from "../src/lib/demo-data";
import { articulosDemo } from "../src/lib/articulos";

function sqlStr(v: string | null | undefined): string {
  if (v == null) return "null";
  return `'${v.replace(/'/g, "''")}'`;
}
function sqlDollar(v: string | null | undefined): string {
  if (v == null) return "null";
  return `$lvpt$${v}$lvpt$`;
}
function sqlNum(v: number | null | undefined): string {
  return v == null ? "null" : String(v);
}
function sqlBool(v: boolean): string {
  return v ? "true" : "false";
}
function sqlArr(v: string[]): string {
  if (!v.length) return "'{}'";
  return `array[${v.map((x) => sqlStr(x)).join(", ")}]`;
}

const lines: string[] = [];
lines.push("-- Generado automáticamente por scripts/generar-seed.ts. No editar a mano.");
lines.push("-- Carga el catálogo y el blog reales (los mismos que se ven en la web en modo demo).");
lines.push("");

for (const e of demoEquipos) {
  lines.push(
    `insert into equipos (slug, nombre, marca, modelo, categoria_id, precio, precio_anterior, estado, anio, horas_uso, descripcion, incluye, fotos, destacado, nuevo, visible, created_at) values (` +
      [
        sqlStr(e.slug),
        sqlStr(e.nombre),
        sqlStr(e.marca),
        sqlStr(e.modelo),
        sqlNum(e.categoria_id),
        sqlNum(e.precio),
        sqlNum(e.precio_anterior),
        sqlStr(e.estado),
        sqlNum(e.anio),
        sqlNum(e.horas_uso),
        sqlStr(e.descripcion),
        sqlStr(e.incluye),
        sqlArr(e.fotos),
        sqlBool(e.destacado),
        sqlBool(e.nuevo),
        sqlBool(e.visible),
        `'${e.created_at}'`,
      ].join(", ") +
      `);`
  );
}

lines.push("");

for (const a of articulosDemo) {
  lines.push(
    `insert into articulos (slug, titulo, extracto, contenido, portada, publicado, publicado_at) values (` +
      [
        sqlStr(a.slug),
        sqlStr(a.titulo),
        sqlStr(a.extracto),
        sqlDollar(a.contenido),
        sqlStr(a.portada),
        sqlBool(a.publicado),
        `'${a.publicado_at}'`,
      ].join(", ") +
      `);`
  );
}

console.log(lines.join("\n"));
