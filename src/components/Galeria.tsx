"use client";

import { useState } from "react";
import Image from "next/image";
import { Package } from "lucide-react";
import { cn } from "@/lib/utils";

/** Galería de fotos de la ficha (URLs ya resueltas). */
export default function Galeria({ fotos, alt }: { fotos: string[]; alt: string }) {
  const [idx, setIdx] = useState(0);

  if (!fotos.length) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-3xl bg-surface text-line">
        <Package className="h-20 w-20" strokeWidth={1} />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-surface">
        <Image
          src={fotos[idx]}
          alt={`${alt} - foto ${idx + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
        />
      </div>
      {fotos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {fotos.map((f, i) => (
            <button
              key={f}
              onClick={() => setIdx(i)}
              className={cn(
                "relative h-20 w-24 shrink-0 overflow-hidden rounded-xl border-2 bg-surface",
                i === idx ? "border-brand" : "border-transparent"
              )}
              aria-label={`Ver foto ${i + 1}`}
            >
              <Image src={f} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
