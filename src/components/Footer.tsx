import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { SITE_TAGLINE, whatsappUrl } from "@/lib/utils";
import { TITULAR as T } from "@/lib/legal";
import SocialLinks from "./SocialLinks";
import WhatsAppIcon from "./WhatsAppIcon";

const NAV = [
  { href: "/equipos", label: "Equipos" },
  { href: "/vender-mi-equipo", label: "Vender mi equipo" },
  { href: "/busco-un-equipo", label: "Busco un equipo" },
  { href: "/blog", label: "Blog" },
  { href: "/quien-soy", label: "Quién soy" },
  { href: "/contacto", label: "Contacto" },
];

const CATEGORIAS = [
  { href: "/equipos?categoria=fresadoras", label: "Fresadoras" },
  { href: "/equipos?categoria=escaneres", label: "Escáneres" },
  { href: "/equipos?categoria=hornos", label: "Hornos" },
  { href: "/equipos?categoria=impresion-3d", label: "Impresión 3D" },
  { href: "/equipos?categoria=microscopios", label: "Microscopios" },
  { href: "/equipos?estado=vendido", label: "Vendidos" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-lv grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12">
        {/* Marca */}
        <div className="lg:col-span-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo-icon.png" alt="" width={48} height={48} className="h-12 w-12" />
            <span className="leading-tight">
              <span className="block font-hand text-sm text-muted">Mario Zarzuela</span>
              <span className="block text-xl font-bold tracking-tight text-brand">Lo vendo por ti</span>
            </span>
          </Link>
          <p className="mt-5 max-w-xs font-hand text-2xl leading-snug text-ink/80">{SITE_TAGLINE}</p>
          <SocialLinks className="mt-6" />
        </div>

        {/* Navegación */}
        <div className="lg:col-span-2">
          <h3 className="eyebrow mb-4">Navegación</h3>
          <ul className="space-y-2.5 text-sm">
            {NAV.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-ink/80 hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categorías */}
        <div className="lg:col-span-2">
          <h3 className="eyebrow mb-4">Equipos</h3>
          <ul className="space-y-2.5 text-sm">
            {CATEGORIAS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-ink/80 hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div className="lg:col-span-4">
          <h3 className="eyebrow mb-4">Contacto</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`tel:${T.telefonoIntl}`} className="flex items-center gap-3 text-ink/80 hover:text-brand">
                <Phone className="h-4 w-4 text-brand" /> {T.telefono}
              </a>
            </li>
            <li>
              <a href={`mailto:${T.email}`} className="flex items-center gap-3 text-ink/80 hover:text-brand">
                <Mail className="h-4 w-4 text-brand" /> {T.email}
              </a>
            </li>
          </ul>
          <a
            href={whatsappUrl("Hola Mario, quiero hacerte una consulta.")}
            target="_blank"
            rel="noopener"
            className="btn mt-5 bg-[#25D366] text-white hover:bg-[#1eb85a]"
          >
            <WhatsAppIcon className="h-5 w-5" /> Escríbenos por WhatsApp
          </a>
          <p className="mt-5 text-sm text-muted">
            ¿Tienes un equipo parado?{" "}
            <Link href="/vender-mi-equipo" className="inline-flex items-center gap-1 font-medium text-brand hover:underline">
              Lo vendemos por ti <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </p>
        </div>
      </div>

      {/* Barra legal */}
      <div className="border-t border-line bg-white">
        <div className="container-lv flex flex-col items-center justify-between gap-3 pt-5 pb-24 text-xs text-muted md:flex-row md:pb-5 md:pr-56">
          <p>© {new Date().getFullYear()} Lo vendo por ti · {T.nombre}. Todos los derechos reservados.</p>
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            <Link href="/aviso-legal" className="hover:text-brand">Aviso legal</Link>
            <Link href="/privacidad" className="hover:text-brand">Privacidad</Link>
            <Link href="/cookies" className="hover:text-brand">Cookies</Link>
            <Link href="/admin" className="hover:text-brand">Acceso privado</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
