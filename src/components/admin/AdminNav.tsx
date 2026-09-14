"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Inbox, Newspaper, TrendingUp, ShieldCheck, LogOut, ExternalLink } from "lucide-react";
import { adminLogout } from "@/lib/admin/actions";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Resumen", icon: LayoutDashboard },
  { href: "/admin/equipos", label: "Equipos", icon: Package },
  { href: "/admin/solicitudes", label: "Solicitudes", icon: Inbox },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/ventas", label: "Ventas", icon: TrendingUp },
];

export default function AdminNav({ email, isAdminPrincipal }: { email: string; isAdminPrincipal: boolean }) {
  const pathname = usePathname();
  const links = isAdminPrincipal
    ? [...LINKS, { href: "/admin/actividad", label: "Actividad", icon: ShieldCheck }]
    : LINKS;

  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="text-lg font-bold tracking-tight text-brand">
            Lo vendo por ti
          </Link>
          <nav className="flex flex-wrap items-center gap-1">
            {links.map((l) => {
              const active = l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition",
                    active ? "bg-brand-light text-brand" : "text-ink/70 hover:bg-surface"
                  )}
                >
                  <l.icon className="h-4 w-4" /> {l.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted">
          <Link href="/" target="_blank" className="hidden items-center gap-1 hover:text-brand sm:flex">
            Ver web <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          <span className="hidden sm:inline">{email}</span>
          <form action={adminLogout}>
            <button type="submit" className="flex items-center gap-1.5 rounded-full px-3 py-1.5 hover:bg-surface hover:text-ink">
              <LogOut className="h-4 w-4" /> Salir
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
