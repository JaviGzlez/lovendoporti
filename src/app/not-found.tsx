import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-lv flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-3 text-3xl font-bold">Esta página no existe</h1>
      <p className="mt-2 max-w-md text-muted">Puede que el equipo ya no esté publicado o que el enlace sea incorrecto.</p>
      <Link href="/equipos" className="btn-primary mt-6">Ver equipos</Link>
    </div>
  );
}
