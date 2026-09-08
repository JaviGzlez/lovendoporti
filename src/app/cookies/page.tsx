import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { TITULAR as T } from "@/lib/legal";

export const metadata: Metadata = { title: "Política de cookies", robots: { index: false } };

export default function CookiesPage() {
  return (
    <LegalLayout title="Política de cookies" updated="8 de septiembre de 2026">
      <h2>1. ¿Qué son las cookies?</h2>
      <p>
        Las cookies son pequeños archivos de texto que los sitios web guardan en tu navegador para recordar
        información sobre tu visita. Existen también tecnologías similares, como el almacenamiento local del
        navegador (<em>localStorage</em>), que cumplen funciones parecidas y a las que se aplica esta política.
      </p>

      <h2>2. ¿Qué cookies utiliza este sitio web?</h2>
      <p>
        {T.web} utiliza <strong>únicamente cookies y almacenamiento técnicos</strong>, imprescindibles para
        que la web funcione. No utilizamos cookies publicitarias, de seguimiento ni de redes sociales, y no
        compartimos datos de navegación con terceros con fines comerciales.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left">
              <th className="py-2 pr-4">Nombre</th>
              <th className="py-2 pr-4">Tipo</th>
              <th className="py-2 pr-4">Finalidad</th>
              <th className="py-2">Duración</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-line align-top">
              <td className="py-2 pr-4 font-mono text-xs">lvpt-cookies</td>
              <td className="py-2 pr-4">Técnica (localStorage, propia)</td>
              <td className="py-2 pr-4">Recordar que ya has visto el aviso de cookies para no mostrarlo de nuevo.</td>
              <td className="py-2">Hasta que borres los datos del navegador</td>
            </tr>
            <tr className="border-b border-line align-top">
              <td className="py-2 pr-4 font-mono text-xs">sb-*-auth-token</td>
              <td className="py-2 pr-4">Técnica (cookie, Supabase)</td>
              <td className="py-2 pr-4">Mantener la sesión iniciada en el área privada de administración. Solo se crea si inicias sesión.</td>
              <td className="py-2">Sesión / hasta cerrar sesión</td>
            </tr>
            <tr className="align-top">
              <td className="py-2 pr-4 font-mono text-xs">__vercel_*</td>
              <td className="py-2 pr-4">Técnica (cookie, Vercel)</td>
              <td className="py-2 pr-4">Seguridad y funcionamiento de la infraestructura de alojamiento (protección frente a abusos).</td>
              <td className="py-2">Sesión</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        De acuerdo con el artículo 22.2 de la LSSI-CE y las directrices de la Agencia Española de Protección
        de Datos, las cookies técnicas están exentas de consentimiento. El aviso que se muestra al entrar
        tiene carácter informativo.
      </p>

      <h2>3. Enlaces a terceros</h2>
      <p>
        Al pulsar los botones de WhatsApp se abre la aplicación o web de WhatsApp, que puede instalar sus
        propias cookies conforme a la{" "}
        <a href="https://www.whatsapp.com/legal/cookies" target="_blank" rel="noopener">
          política de cookies de WhatsApp
        </a>
        . Lo mismo ocurre con los vídeos o enlaces externos que puedan aparecer en las fichas o el blog.
      </p>

      <h2>4. ¿Cómo desactivar o eliminar las cookies?</h2>
      <p>
        Puedes configurar tu navegador para bloquear o eliminar las cookies y el almacenamiento local en
        cualquier momento. Ten en cuenta que, al ser técnicas, bloquearlas puede impedir el acceso al área
        privada. Instrucciones de los principales navegadores:
      </p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">Google Chrome</a></li>
        <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener">Mozilla Firefox</a></li>
        <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener">Safari</a></li>
        <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-6915-a6e9-c7e5-b5e5bc9d2d5b" target="_blank" rel="noopener">Microsoft Edge</a></li>
      </ul>

      <h2>5. Cambios</h2>
      <p>
        Si en el futuro incorporamos herramientas de analítica u otras cookies no técnicas, actualizaremos
        esta política y solicitaremos tu consentimiento previo a través del aviso de cookies.
      </p>
      <p>
        Responsable: {T.nombre} · <a href={`mailto:${T.email}`}>{T.email}</a>
      </p>
    </LegalLayout>
  );
}
