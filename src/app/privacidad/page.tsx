import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { TITULAR as T } from "@/lib/legal";

export const metadata: Metadata = { title: "Política de privacidad", robots: { index: false } };

export default function PrivacidadPage() {
  return (
    <LegalLayout title="Política de privacidad" updated="8 de septiembre de 2026">
      <p>
        Esta Política de Privacidad describe cómo {T.nombre} («el Responsable») trata los datos personales de
        las personas que utilizan el sitio web {T.web} y sus formularios, conforme al Reglamento (UE)
        2016/679 (RGPD) y a la Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los
        derechos digitales (LOPDGDD).
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <ul>
        <li><strong>Identidad:</strong> {T.nombre} · NIF {T.nif}</li>
        <li><strong>Domicilio:</strong> {T.domicilio}</li>
        <li><strong>Correo electrónico:</strong> <a href={`mailto:${T.email}`}>{T.email}</a></li>
        <li><strong>Teléfono:</strong> {T.telefono}</li>
      </ul>

      <h2>2. Qué datos tratamos y de dónde proceden</h2>
      <p>Los datos que tratamos son los que tú mismo nos facilitas a través de:</p>
      <ul>
        <li>
          <strong>Formulario de contacto y botón de WhatsApp:</strong> nombre, teléfono, correo electrónico
          (opcional), si quieres comprar o vender, y el mensaje que escribas.
        </li>
        <li>
          <strong>«Lo quiero» en la ficha de un equipo:</strong> nombre, teléfono, correo electrónico
          (opcional), mensaje y la referencia del equipo que te interesa.
        </li>
        <li>
          <strong>«Vender mi equipo»:</strong> nombre, teléfono, correo electrónico, datos del equipo (tipo,
          marca, modelo, año, precio deseado, descripción) y las fotografías que adjuntes.
        </li>
        <li>
          <strong>«Busco un equipo»:</strong> nombre, teléfono, correo electrónico y la descripción de lo que
          buscas (tipo, marca, modelo, presupuesto).
        </li>
        <li>
          <strong>Datos de navegación:</strong> de forma automática, datos técnicos como la dirección IP o el
          tipo de navegador, necesarios para prestar el servicio (ver Política de Cookies).
        </li>
      </ul>
      <p>
        Cuando continúas la conversación por WhatsApp, el tratamiento que realiza esa aplicación se rige por
        la política de privacidad de WhatsApp LLC (Meta).
      </p>

      <h2>3. Para qué usamos tus datos y con qué base legal</h2>
      <ul>
        <li>
          <strong>Atender tus solicitudes</strong> de información, compra o venta y ponernos en contacto
          contigo por teléfono, WhatsApp o correo electrónico. Base legal: tu consentimiento (casilla del
          formulario) y la aplicación de medidas precontractuales a petición tuya (art. 6.1.a y 6.1.b RGPD).
        </li>
        <li>
          <strong>Gestionar la compraventa</strong> del equipo, incluida la comunicación entre comprador y
          vendedor cuando sea necesario. Base legal: ejecución del contrato o medidas precontractuales
          (art. 6.1.b RGPD).
        </li>
        <li>
          <strong>Avisarte cuando dispongamos de un equipo</strong> que encaje con lo que nos has dicho que
          buscas. Base legal: tu consentimiento (art. 6.1.a RGPD).
        </li>
        <li>
          <strong>Cumplir obligaciones legales</strong>, en particular fiscales y contables cuando se formaliza
          una operación. Base legal: obligación legal (art. 6.1.c RGPD).
        </li>
        <li>
          <strong>Estadísticas internas anónimas</strong> sobre el interés que despierta cada equipo (visitas y
          clics), sin identificar a las personas. Base legal: interés legítimo (art. 6.1.f RGPD).
        </li>
      </ul>
      <p>No tomamos decisiones automatizadas ni elaboramos perfiles con tus datos.</p>

      <h2>4. Cuánto tiempo conservamos los datos</h2>
      <p>
        Conservamos tus datos mientras gestionamos tu solicitud y mientras dure la relación comercial. Si no
        se llega a formalizar ninguna operación, los eliminamos en un plazo máximo de 2 años desde el último
        contacto, salvo que nos pidas antes que los borremos. Los datos vinculados a operaciones cerradas se
        conservan bloqueados durante los plazos exigidos por la normativa fiscal y mercantil.
      </p>

      <h2>5. A quién comunicamos tus datos</h2>
      <p>No vendemos ni cedemos tus datos a terceros. Únicamente pueden acceder a ellos:</p>
      <ul>
        <li>
          <strong>Proveedores tecnológicos</strong> que nos prestan servicios como encargados del tratamiento
          y con las garantías del art. 28 RGPD: <strong>Supabase</strong> (base de datos y almacenamiento de
          archivos, con servidores en la Unión Europea) y <strong>Vercel</strong> (alojamiento de la web).
        </li>
        <li>
          <strong>WhatsApp LLC / Meta</strong>, cuando eliges continuar la conversación por WhatsApp. Meta
          está adherida al Marco de Privacidad de Datos UE-EE. UU.
        </li>
        <li>
          <strong>La otra parte de la operación</strong> (comprador o vendedor), únicamente los datos
          imprescindibles y cuando sea necesario para cerrar la compraventa.
        </li>
        <li>Administraciones públicas y autoridades, cuando exista obligación legal.</li>
      </ul>

      <h2>6. Tus derechos</h2>
      <p>
        Puedes ejercer en cualquier momento tus derechos de <strong>acceso, rectificación, supresión,
        oposición, limitación del tratamiento y portabilidad</strong>, así como retirar el consentimiento
        prestado, escribiendo a <a href={`mailto:${T.email}`}>{T.email}</a> e indicando el derecho que
        deseas ejercer. Podremos pedirte que acredites tu identidad.
      </p>
      <p>
        Si consideras que no hemos atendido correctamente tus derechos, puedes presentar una reclamación ante
        la Agencia Española de Protección de Datos (
        <a href="https://www.aepd.es" target="_blank" rel="noopener">www.aepd.es</a>).
      </p>

      <h2>7. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos: comunicaciones cifradas
        (HTTPS), acceso restringido a la información y almacenamiento en proveedores con certificaciones de
        seguridad reconocidas. Las fotografías que envías para vender un equipo se guardan en un espacio
        privado al que solo accede el Responsable.
      </p>

      <h2>8. Menores de edad</h2>
      <p>
        El Sitio Web está dirigido a profesionales y a personas mayores de edad. No recabamos de forma
        consciente datos de menores de 14 años.
      </p>

      <h2>9. Cambios en esta política</h2>
      <p>
        Podemos actualizar esta Política de Privacidad para adaptarla a cambios normativos o del servicio. La
        versión vigente será siempre la publicada en esta página, con su fecha de actualización.
      </p>
    </LegalLayout>
  );
}
