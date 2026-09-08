/**
 * Datos de ejemplo que se muestran cuando todavía no hay Supabase configurado
 * (sin .env.local). Permiten ver la web funcionando desde el primer minuto.
 */
import type { Articulo, Categoria, Equipo } from "./types";

export const demoCategorias: Categoria[] = [
  { id: 1, slug: "fresadoras", nombre: "Fresadoras", icono: "Cog", orden: 1 },
  { id: 2, slug: "escaneres", nombre: "Escáneres", icono: "ScanLine", orden: 2 },
  { id: 3, slug: "hornos", nombre: "Hornos", icono: "Flame", orden: 3 },
  { id: 4, slug: "impresion-3d", nombre: "Impresión 3D", icono: "Printer", orden: 4 },
  { id: 5, slug: "aspiracion", nombre: "Aspiración", icono: "Wind", orden: 5 },
  { id: 6, slug: "microscopios", nombre: "Microscopios", icono: "Microscope", orden: 6 },
  { id: 7, slug: "equipamiento", nombre: "Equipamiento", icono: "Wrench", orden: 7 },
  { id: 8, slug: "otros", nombre: "Otros", icono: "MoreHorizontal", orden: 8 },
];

const daysAgo = (d: number) => new Date(Date.now() - d * 864e5).toISOString();

const base = {
  video_url: null,
  fotos: [] as string[],
  visible: true,
  vendido_at: null,
};

export const demoEquipos: Equipo[] = [
  {
    ...base,
    id: "d1",
    referencia: "LVP-0001",
    slug: "roland-dwx-52d-plus",
    nombre: "Roland DWX-52D Plus",
    marca: "Roland",
    modelo: "DWX-52D Plus",
    categoria_id: 1,
    precio: 19995,
    estado: "disponible",
    anio: 2025,
    horas_uso: 650,
    descripcion:
      "Fresadora dental de 5 ejes en excelente estado, revisada y calibrada. Procedente de laboratorio con mantenimiento al día.",
    incluye: "Fresadora\nCambiador automático de 15 herramientas\nJuego de fresas nuevas\nCompresor\nManual y formación inicial",
    destacado: true,
    created_at: daysAgo(2),
  },
  {
    ...base,
    id: "d2",
    referencia: "LVP-0002",
    slug: "medit-t700",
    nombre: "Medit T700",
    marca: "Medit",
    modelo: "T700",
    categoria_id: 2,
    precio: 4995,
    estado: "reservado",
    anio: 2023,
    horas_uso: null,
    descripcion: "Escáner de laboratorio de alta velocidad con brazo articulado. Excelente estado.",
    incluye: "Escáner\nPlato de calibración\nLicencia software Medit Link",
    destacado: true,
    created_at: daysAgo(5),
  },
  {
    ...base,
    id: "d3",
    referencia: "LVP-0003",
    slug: "zirkonofen-600-v4",
    nombre: "Zirkonofen 600/V4",
    marca: "Zirkonzahn",
    modelo: "Zirkonofen 600/V4",
    categoria_id: 3,
    precio: 8500,
    estado: "disponible",
    anio: 2024,
    horas_uso: 0,
    descripcion: "Horno de sinterizado de zirconio sin uso, embalaje original.",
    incluye: "Horno\nBandeja de sinterizado\nPerlas de circonio",
    destacado: true,
    created_at: daysAgo(8),
  },
  {
    ...base,
    id: "d4",
    referencia: "LVP-0004",
    slug: "asiga-max-uv-385",
    nombre: "Asiga Max UV 385",
    marca: "Asiga",
    modelo: "Max UV 385",
    categoria_id: 4,
    precio: 4600,
    estado: "disponible",
    anio: 2023,
    horas_uso: null,
    descripcion: "Impresora 3D DLP de alta precisión para laboratorio dental. Excelente estado.",
    incluye: "Impresora\n2 plataformas de impresión\nCubeta de resina",
    destacado: true,
    created_at: daysAgo(12),
  },
  {
    ...base,
    id: "d5",
    referencia: "LVP-0005",
    slug: "zeiss-opmi-pico",
    nombre: "Zeiss OPMI Pico",
    marca: "Zeiss",
    modelo: "OPMI Pico",
    categoria_id: 6,
    precio: 6900,
    estado: "vendido",
    anio: 2019,
    horas_uso: null,
    descripcion: "Microscopio quirúrgico dental con soporte de suelo.",
    incluye: "Microscopio\nSoporte de suelo\nCámara integrada",
    destacado: false,
    vendido_at: daysAgo(12),
    created_at: daysAgo(40),
  },
];

export const demoArticulos: Articulo[] = [
  {
    id: "a1",
    slug: "que-tener-en-cuenta-al-comprar-fresadora-dental-segunda-mano",
    titulo: "¿Qué tener en cuenta al comprar una fresadora dental de segunda mano?",
    extracto: "Horas de uso, mantenimiento, husillo y calibración: las claves para acertar.",
    contenido:
      "## Horas de uso\n\nLas horas de husillo son el dato más importante para valorar una fresadora usada. Un husillo tiene una vida útil aproximada y sustituirlo tiene un coste que debes conocer antes de comprar.\n\n## Mantenimiento\n\nPide el historial de mantenimiento y las últimas calibraciones. Un equipo bien cuidado se nota en los detalles.\n\n## Herramientas y accesorios\n\nComprueba qué se incluye: cambiador de herramientas, compresor, aspiración y software.",
    portada: null,
    publicado: true,
    publicado_at: daysAgo(3),
  },
  {
    id: "a2",
    slug: "como-mantener-tu-escaner-dental-en-perfecto-estado",
    titulo: "Cómo mantener tu escáner dental en perfecto estado",
    extracto: "Consejos sencillos para alargar la vida útil de tu escáner de laboratorio.",
    contenido:
      "## Limpieza\n\nUtiliza siempre paños de microfibra y evita productos abrasivos sobre las ópticas.\n\n## Calibración\n\nCalibra el equipo con la frecuencia que recomienda el fabricante.",
    portada: null,
    publicado: true,
    publicado_at: daysAgo(11),
  },
  {
    id: "a3",
    slug: "ventajas-de-la-impresion-3d-en-el-laboratorio-dental",
    titulo: "Ventajas de la impresión 3D en el laboratorio dental",
    extracto: "Por qué cada vez más laboratorios incorporan impresoras 3D a su flujo digital.",
    contenido:
      "## Velocidad\n\nModelos, férulas y guías quirúrgicas en cuestión de horas.\n\n## Coste\n\nEl precio de las impresoras de segunda mano permite dar el salto al flujo digital con una inversión contenida.",
    portada: null,
    publicado: true,
    publicado_at: daysAgo(19),
  },
];
