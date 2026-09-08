import Image from "next/image";

/** Glifo oficial de WhatsApp (Brand Resource Center de Meta). */
export default function WhatsAppIcon({
  variant = "white",
  className = "h-5 w-5",
}: {
  variant?: "white" | "green";
  className?: string;
}) {
  return (
    <Image
      src={variant === "green" ? "/whatsapp-green.svg" : "/whatsapp-white.svg"}
      alt=""
      width={24}
      height={24}
      className={className}
      aria-hidden
    />
  );
}
