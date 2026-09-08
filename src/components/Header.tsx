"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/equipos", label: "Equipos" },
  { href: "/vender-mi-equipo", label: "Vender tu equipo" },
  { href: "/busco-un-equipo", label: "Busco un equipo" },
  { href: "/blog", label: "Blog" },
  { href: "/quien-soy", label: "Quién soy" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/90 backdrop-blur">
      <div className="container-lv flex h-[72px] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/logo-icon.png" alt="" width={44} height={44} priority className="h-11 w-11" />
          <span className="leading-tight">
            <span className="block font-hand text-sm text-muted">Mario Zarzuela</span>
            <span className="block text-lg font-bold tracking-tight text-brand">Lo vendo por ti</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition hover:text-brand",
                  active ? "text-brand underline decoration-2 underline-offset-8" : "text-ink/80"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/equipos" aria-label="Buscar equipos" className="text-ink/70 hover:text-brand">
            <Search className="h-5 w-5" />
          </Link>
        </nav>

        <button
          className="lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-white lg:hidden">
          <div className="container-lv flex flex-col py-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-ink/90 hover:text-brand"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
