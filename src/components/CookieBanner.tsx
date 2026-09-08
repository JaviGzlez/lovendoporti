"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const KEY = "lvpt-cookies";

// Pequeño "store" sobre localStorage para saber si ya se ha respondido al aviso.
const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
const getSnapshot = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return "no-disponible";
  }
};
const getServerSnapshot = () => "pendiente"; // en SSR no se muestra (evita parpadeo/hidratación)

/**
 * Aviso de cookies. La web solo usa cookies técnicas (sesión del panel privado),
 * que no requieren consentimiento, pero se informa igualmente y se deja preparada
 * la aceptación para cuando se añadan cookies analíticas.
 */
export default function CookieBanner() {
  const pathname = usePathname();
  const respuesta = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (respuesta !== null || pathname.startsWith("/admin")) return null;

  const cerrar = (valor: "aceptadas" | "rechazadas") => {
    try {
      localStorage.setItem(KEY, valor);
    } catch {
      /* ignorar */
    }
    listeners.forEach((cb) => cb());
  };

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-2xl rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-black/10 sm:inset-x-6"
    >
      <p className="text-sm text-ink/85">
        Esta web utiliza únicamente cookies técnicas necesarias para su funcionamiento. No usamos cookies
        publicitarias ni de seguimiento. Más información en nuestra{" "}
        <Link href="/cookies" className="text-brand underline">
          política de cookies
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <button onClick={() => cerrar("rechazadas")} className="btn-outline !py-2 text-xs">
          Solo necesarias
        </button>
        <button onClick={() => cerrar("aceptadas")} className="btn-primary !py-2 text-xs">
          Aceptar
        </button>
      </div>
    </div>
  );
}
