import type { Metadata } from "next";
import { MessageCircle, Mail, MapPin } from "lucide-react";
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
              <MessageCircle className="h-5 w-5 text-brand" />
              <a href={whatsappUrl("Hola Mario, quiero hacerte una consulta.")} target="_blank" rel="noopener" className="hover:text-brand">
                WhatsApp directo
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-brand" />
              <a href="mailto:hola@lovendoporti.es" className="hover:text-brand">hola@lovendoporti.es</a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-brand" />
              <span>España · envíos a toda la península</span>
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
