import type { Metadata } from "next";

export const metadata: Metadata = { title: "Política de privacidad" };

// TODO: revisar con el asesor legal antes de publicar.
export default function PrivacidadPage() {
  return (
    <div className="container-lv max-w-3xl py-10 lg:py-14">
      <h1 className="text-3xl font-bold tracking-tight">Política de privacidad</h1>
      <div className="prose-lv mt-6">
        <h2>Responsable del tratamiento</h2>
        <p>Mario Zarzuela (NIF: [pendiente]) · hola@lovendoporti.es</p>
        <h2>Datos que tratamos</h2>
        <p>
          A través de los formularios de la web (contacto por WhatsApp, «Lo quiero», «Vender mi equipo» y
          «Busco un equipo») recogemos nombre, teléfono, email, el mensaje y, en su caso, los datos y fotografías
          del equipo que deseas vender.
        </p>
        <h2>Finalidad y legitimación</h2>
        <p>
          Atender tu solicitud, ponernos en contacto contigo y gestionar la compraventa del equipo. La base legal es
          tu consentimiento, que prestas al marcar la casilla del formulario, y la ejecución de las medidas
          precontractuales solicitadas.
        </p>
        <h2>Conservación</h2>
        <p>
          Conservamos tus datos mientras dure la relación comercial y, después, durante los plazos legalmente
          exigidos.
        </p>
        <h2>Destinatarios</h2>
        <p>
          Los datos se almacenan en Supabase (infraestructura en la Unión Europea) y las conversaciones se
          mantienen a través de WhatsApp. No se ceden a terceros salvo obligación legal.
        </p>
        <h2>Derechos</h2>
        <p>
          Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad
          escribiendo a hola@lovendoporti.es. También puedes reclamar ante la Agencia Española de Protección de
          Datos (www.aepd.es).
        </p>
      </div>
    </div>
  );
}
