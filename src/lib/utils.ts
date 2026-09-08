export function formatPrecio(precio: number | null | undefined) {
  if (precio == null) return "Consultar";
  // Formato español con separador de miles siempre (4.995 €)
  const entero = Math.round(precio).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${entero} €`;
}

export function formatFecha(iso: string | null | undefined) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short", year: "numeric" }).format(
    new Date(iso)
  );
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "34629519674";

export function whatsappUrl(mensaje: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}

/**
 * URL pública del sitio. Orden: NEXT_PUBLIC_SITE_URL -> URL del despliegue en Vercel -> localhost.
 * Tolera la variable vacía o sin protocolo.
 */
function resolveSiteUrl() {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || "").trim();
  if (!raw) return "http://localhost:3000";
  const withProto = /^https?:\/\//.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(withProto).origin;
  } catch {
    return "http://localhost:3000";
  }
}
export const SITE_URL = resolveSiteUrl();
export const SITE_NAME = "Lo vendo por ti";
export const SITE_TAGLINE = "Tu material dental merece una segunda oportunidad";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
