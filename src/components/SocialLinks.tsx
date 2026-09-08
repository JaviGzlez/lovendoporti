import { faInstagram, faFacebookF, faLinkedinIn, type IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { cn } from "@/lib/utils";

export const REDES = [
  { nombre: "Instagram", href: "https://www.instagram.com/lovendoportimariozarzuela/", icon: faInstagram },
  { nombre: "Facebook", href: "https://www.facebook.com/profile.php?id=61586318828466", icon: faFacebookF },
  { nombre: "LinkedIn", href: "https://www.linkedin.com/company/lo-vendo-por-ti/", icon: faLinkedinIn },
];

/** Icono de marca a partir de la definición de Font Awesome (free-brands). */
function BrandIcon({ icon, className }: { icon: IconDefinition; className?: string }) {
  const [w, h, , , d] = icon.icon;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} fill="currentColor" aria-hidden>
      <path d={Array.isArray(d) ? d.join(" ") : d} />
    </svg>
  );
}

export default function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {REDES.map((r) => (
        <a
          key={r.nombre}
          href={r.href}
          target="_blank"
          rel="noopener"
          aria-label={r.nombre}
          title={r.nombre}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink/70 transition hover:border-brand hover:bg-brand hover:text-white"
        >
          <BrandIcon icon={r.icon} className="h-[18px] w-[18px]" />
        </a>
      ))}
    </div>
  );
}
