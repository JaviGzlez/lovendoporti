import Link from "next/link";
import Image from "next/image";
import { SITE_TAGLINE } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/equipos", label: "Equipos" },
  { href: "/vender-mi-equipo", label: "Vender tu equipo" },
  { href: "/busco-un-equipo", label: "Busco un equipo" },
  { href: "/blog", label: "Blog" },
  { href: "/quien-soy", label: "Quién soy" },
  { href: "/contacto", label: "Contacto" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-lv flex flex-col gap-8 py-10 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo-icon.png" alt="" width={40} height={40} className="h-10 w-10" />
          <span className="leading-tight">
            <span className="block font-hand text-xs text-muted">Mario Zarzuela</span>
            <span className="block font-bold text-brand">Lo vendo por ti</span>
          </span>
        </Link>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/80">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-brand">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-sm text-ink/70">
          {/* TODO: poner las URLs reales de las redes de Mario */}
          <a href="#" className="hover:text-brand">Instagram</a>
          <a href="#" className="hover:text-brand">LinkedIn</a>
          <a href="#" className="hover:text-brand">YouTube</a>
        </div>

        <p className="font-hand text-lg text-ink/80 lg:text-right">{SITE_TAGLINE}</p>
      </div>
      <div className="border-t border-line">
        <div className="container-lv flex flex-col items-center justify-between gap-2 py-4 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Lo vendo por ti. Todos los derechos reservados.</p>
          <p className="flex gap-4">
            <Link href="/aviso-legal" className="hover:text-brand">Aviso legal</Link>
            <Link href="/privacidad" className="hover:text-brand">Política de privacidad</Link>
            <Link href="/cookies" className="hover:text-brand">Cookies</Link>
            <Link href="/admin" className="hover:text-brand">Acceso privado</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
