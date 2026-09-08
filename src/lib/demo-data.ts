/**
 * Datos de ejemplo que se muestran cuando todavía no hay Supabase configurado
 * (sin .env.local). Fotos en /public/equipos (recortes provisionales de las
 * publicaciones de Instagram; sustituir por fotos originales cuando se tengan).
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

type Seed = {
  slug: string;
  nombre: string;
  marca: string;
  modelo: string;
  cat: number;
  precio: number | null;
  desc: string;
  incluye?: string;
  anio?: number;
  horas?: number;
  estado?: Equipo["estado"];
  destacado?: boolean;
  dias: number;
};

const SEED: Seed[] = [
  {
    slug: "roland-dwx-52dci",
    nombre: "Fresadora Roland DWX-52DCi con mueble y aspiración",
    marca: "Roland",
    modelo: "DWX-52DCi",
    cat: 1,
    precio: 24900,
    desc: "Fresadora dental de 5 ejes con cambiador automático de discos. Incluye mueble con aspiración BOFA DentalPRO integrada.",
    incluye: "Fresadora\nMueble\nAspiración BOFA DentalPRO\nJuego de fresas",
    destacado: true,
    dias: 1,
  },
  {
    slug: "amann-girrbach-mikro-5x",
    nombre: "Fresadora Amann Girrbach Ceramill Mikro 5X",
    marca: "Amann Girrbach",
    modelo: "Ceramill Mikro 5X",
    cat: 1,
    precio: 13995,
    horas: 5569,
    desc: "Fresadora de 5 ejes recién revisada, con spindle y motor cambiados. Lista para trabajar desde el primer día.",
    incluye: "Software CAM\nAspiración\nCompresor",
    destacado: true,
    dias: 3,
  },
  {
    slug: "zirkonzahn-zirkonofen-600-v4",
    nombre: "Horno de sinterizado Zirkonzahn Zirkonofen 600/V4",
    marca: "Zirkonzahn",
    modelo: "Zirkonofen 600/V4",
    cat: 3,
    precio: 8500,
    horas: 0,
    desc: "Horno de sinterizado de zirconio nuevo, sin uso.",
    destacado: true,
    dias: 4,
  },
  {
    slug: "zubler-horno-sinterizado",
    nombre: "Horno de sinterizado Zubler",
    marca: "Zubler",
    modelo: "Nova Lab",
    cat: 3,
    precio: 8995,
    horas: 0,
    desc: "Horno de sinterizado nuevo, sin estrenar.",
    dias: 6,
  },
  {
    slug: "mihm-vogt-tabeo-horno-metal",
    nombre: "Horno de metal Mihm-Vogt Tabeo-2/M/Metal-120",
    marca: "Mihm-Vogt",
    modelo: "Tabeo-2/M/Metal-120",
    cat: 3,
    precio: 3245,
    desc: "Horno de precalentamiento para metal en buen estado de uso.",
    dias: 8,
  },
  {
    slug: "asiga-max-uv-385",
    nombre: "Impresora 3D Asiga Max UV 385",
    marca: "Asiga",
    modelo: "Max UV 385",
    cat: 4,
    precio: 4600,
    desc: "Impresora 3D DLP de alta precisión con fuente de luz UV 385 nm, compatible con una amplia gama de resinas dentales. Revisada y testada.",
    destacado: true,
    dias: 5,
  },
  {
    slug: "labomed-microscopio",
    nombre: "Microscopio Labomed con cámara digital",
    marca: "Labomed",
    modelo: "Con cámara digital",
    cat: 6,
    precio: 1800,
    desc: "Microscopio profesional con cámara digital integrada e iluminación LED de alta potencia. Revisado y listo para trabajar.",
    dias: 7,
  },
  {
    slug: "cattani-caja-insonorizacion",
    nombre: "Caja de insonorización Cattani",
    marca: "Cattani",
    modelo: "Caja de insonorización",
    cat: 5,
    precio: 1400,
    desc: "Caja de insonorización para compresor o aspiración Cattani.",
    dias: 9,
  },
  {
    slug: "mestra-dosificadora",
    nombre: "Dosificadora Mestra",
    marca: "Mestra",
    modelo: "Dosificadora",
    cat: 7,
    precio: 999,
    horas: 0,
    desc: "Dosificadora de escayola Mestra nueva, sin estrenar.",
    dias: 10,
  },
  {
    slug: "zilfor-cabina-repasado",
    nombre: "Cabina de repasado y pulido Zilfor con micromotor",
    marca: "Zilfor",
    modelo: "Cabina de repasado",
    cat: 7,
    precio: 900,
    desc: "Cabina de repasado y pulido con aspiración, iluminación LED y micromotor de alta calidad. Equipo revisado.",
    dias: 11,
  },
  {
    slug: "artex-cn-articulador",
    nombre: "Articulador Artex CN",
    marca: "Amann Girrbach",
    modelo: "Artex CN",
    cat: 7,
    precio: 275,
    desc: "Articulador semiajustable Artex CN en muy buen estado.",
    dias: 12,
  },
  {
    slug: "mestra-caja-repaso",
    nombre: "Caja de repaso Mestra",
    marca: "Mestra",
    modelo: "Caja de repaso",
    cat: 7,
    precio: 200,
    desc: "Caja de repaso con iluminación integrada y aspiración. Equipo revisado.",
    dias: 13,
  },
  {
    slug: "oxtein-caja-cirugia",
    nombre: "Caja de cirugía Oxtein",
    marca: "Oxtein",
    modelo: "Caja de cirugía",
    cat: 7,
    precio: 175,
    desc: "Cajas de cirugía Oxtein. Precio por caja; disponibles tres unidades.",
    dias: 14,
  },
  {
    slug: "ivoclar-lumamat-100",
    nombre: "Ivoclar Vivadent Lumamat 100",
    marca: "Ivoclar Vivadent",
    modelo: "Lumamat 100",
    cat: 7,
    precio: null,
    desc: "Unidad de fotopolimerización Ivoclar Vivadent Lumamat 100. Consultar precio.",
    dias: 15,
  },
];

export const demoEquipos: Equipo[] = SEED.map((s, i) => ({
  id: `d${i + 1}`,
  referencia: `LVP-${String(i + 1).padStart(4, "0")}`,
  slug: s.slug,
  nombre: s.nombre,
  marca: s.marca,
  modelo: s.modelo,
  categoria_id: s.cat,
  precio: s.precio,
  estado: s.estado ?? "disponible",
  anio: s.anio ?? null,
  horas_uso: s.horas ?? null,
  descripcion: s.desc,
  incluye: s.incluye ?? null,
  video_url: null,
  fotos: [`/equipos/${s.slug}.webp`],
  destacado: s.destacado ?? false,
  visible: true,
  vendido_at: null,
  created_at: daysAgo(s.dias),
}));

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
