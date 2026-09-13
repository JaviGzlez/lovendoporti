export type EstadoEquipo = "disponible" | "reservado" | "vendido";
export type TipoSolicitud = "comprar" | "vender" | "busco" | "lo_quiero" | "contacto";
export type EstadoSolicitud = "nuevo" | "contactado" | "negociacion" | "cerrado" | "descartado";

export interface Categoria {
  id: number;
  slug: string;
  nombre: string;
  icono: string | null;
  orden: number;
}

export interface Equipo {
  id: string;
  referencia: string;
  slug: string;
  nombre: string;
  marca: string | null;
  modelo: string | null;
  categoria_id: number | null;
  categoria?: Categoria | null;
  precio: number | null;
  precio_anterior: number | null;
  estado: EstadoEquipo;
  anio: number | null;
  horas_uso: number | null;
  descripcion: string | null;
  incluye: string | null;
  video_url: string | null;
  fotos: string[];
  destacado: boolean;
  nuevo: boolean;
  visible: boolean;
  vendido_at: string | null;
  created_at: string;
}

export interface Articulo {
  id: string;
  slug: string;
  titulo: string;
  extracto: string | null;
  contenido: string | null;
  portada: string | null;
  publicado: boolean;
  publicado_at: string | null;
}

export interface NuevaSolicitud {
  tipo: TipoSolicitud;
  nombre: string;
  telefono: string;
  email?: string | null;
  mensaje?: string | null;
  equipo_id?: string | null;
  tipo_equipo?: string | null;
  marca?: string | null;
  modelo?: string | null;
  anio?: number | null;
  precio_deseado?: number | null;
  presupuesto?: number | null;
  fotos?: string[];
  consentimiento: boolean;
  origen?: string | null;
}

export const ESTADO_LABEL: Record<EstadoEquipo, string> = {
  disponible: "Disponible",
  reservado: "Reservado",
  vendido: "Vendido",
};

export interface Solicitud {
  id: string;
  tipo: TipoSolicitud;
  estado: EstadoSolicitud;
  nombre: string;
  telefono: string;
  email: string | null;
  mensaje: string | null;
  equipo_id: string | null;
  equipo?: Pick<Equipo, "id" | "referencia" | "nombre" | "slug" | "precio"> | null;
  tipo_equipo: string | null;
  marca: string | null;
  modelo: string | null;
  anio: number | null;
  precio_deseado: number | null;
  presupuesto: number | null;
  fotos: string[];
  consentimiento: boolean;
  origen: string | null;
  created_at: string;
  updated_at: string;
}

export interface SolicitudNota {
  id: string;
  solicitud_id: string;
  nota: string;
  created_at: string;
}

export const TIPO_SOLICITUD_LABEL: Record<TipoSolicitud, string> = {
  comprar: "Consulta (comprar)",
  vender: "Vender mi equipo",
  busco: "Busco un equipo",
  lo_quiero: "Lo quiero (ficha)",
  contacto: "Contacto",
};

export const ESTADO_SOLICITUD_LABEL: Record<EstadoSolicitud, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  negociacion: "En negociación",
  cerrado: "Cerrado",
  descartado: "Descartado",
};
