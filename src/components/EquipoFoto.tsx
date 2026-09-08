import Image from "next/image";
import { Package } from "lucide-react";
import { fotoUrl } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Foto principal de un equipo con placeholder elegante cuando no hay imagen. */
export default function EquipoFoto({
  path,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority,
}: {
  path?: string | null;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const url = fotoUrl(path);
  return (
    <div className={cn("relative overflow-hidden bg-surface", className)}>
      {url ? (
        <Image src={url} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-line">
          <Package className="h-14 w-14" strokeWidth={1} />
        </div>
      )}
    </div>
  );
}
