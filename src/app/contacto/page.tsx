import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import ContactoForm from "@/components/ContactoForm";
import { whatsappUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Habla directamente con Mario Zarzuela por WhatsApp o mediante el formulario de contacto.",
};

export default function ContactoPage() {
  return (
    <div className="container-lv py-10 lg:py-14">
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="eyebrow mb-2">Hablemos</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Contacto</h1>
          <p className="mt-3 text-muted">
            La forma más rápida es WhatsApp. Si lo prefieres, déjanos un mensaje y te respondemos lo antes posible.
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <WhatsAppIcon variant="green" className="h-5 w-5" />
              <a href={whatsappUrl("Hola Mario, quiero hacerte una consulta.")} target="_blank" rel="noopener" className="hover:text-brand">
                WhatsApp: 629 51 96 74
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-brand" />
              <a href="tel:+34629519674" className="hover:text-brand">629 51 96 74</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-brand" />
              <a href="mailto:hola@lovendoportidental.es" className="hover:text-brand">hola@lovendoportidental.es</a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-brand" />
              <span>Calle Porvera 7, 11401 Jerez de la Frontera (Cádiz)</span>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-3">
          <ContactoForm />
        </div>
      </div>
    </div>
  );
}
