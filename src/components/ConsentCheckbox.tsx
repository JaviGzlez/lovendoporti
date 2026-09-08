import Link from "next/link";

export default function ConsentCheckbox() {
  return (
    <label className="flex items-start gap-3 text-xs text-muted">
      <input type="checkbox" name="consentimiento" required className="mt-0.5 h-4 w-4 rounded border-line accent-brand" />
      <span>
        He leído y acepto la{" "}
        <Link href="/privacidad" target="_blank" className="text-brand underline">
          política de privacidad
        </Link>{" "}
        y consiento que se traten mis datos para atender mi solicitud.
      </span>
    </label>
  );
}
