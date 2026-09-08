import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { TITULAR as T } from "@/lib/legal";

export const metadata: Metadata = { title: "Aviso legal", robots: { index: false } };

export default function AvisoLegalPage() {
  return (
    <LegalLayout title="Aviso legal" updated="8 de septiembre de 2026">
      <h2>1. Identificación del titular</h2>
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la
        Información y de Comercio Electrónico (LSSI-CE), se informa de que el titular del sitio web{" "}
        <strong>{T.web}</strong> (en adelante, «el Sitio Web») es:
      </p>
      <ul>
        <li><strong>Titular:</strong> {T.nombre}</li>
        <li><strong>NIF:</strong> {T.nif}</li>
        <li><strong>Nombre comercial:</strong> {T.nombreComercial}</li>
        <li><strong>Domicilio:</strong> {T.domicilio}</li>
        <li><strong>Correo electrónico:</strong> <a href={`mailto:${T.email}`}>{T.email}</a></li>
        <li><strong>Teléfono:</strong> <a href={`tel:${T.telefonoIntl}`}>{T.telefono}</a></li>
      </ul>

      <h2>2. Objeto y actividad</h2>
      <p>
        {T.nombreComercial} es un servicio de intermediación en la compraventa de maquinaria y equipamiento
        dental de segunda mano. A través del Sitio Web se publica un catálogo de equipos, se facilita el
        contacto entre el titular y los usuarios interesados en comprar o vender, y se ofrece información
        relacionada con el sector.
      </p>
      <p>
        La publicación de un equipo en el catálogo no constituye una oferta vinculante. Las condiciones de cada
        operación (precio final, forma de pago, entrega, garantía y demás términos) se acuerdan de forma
        individual entre las partes fuera del Sitio Web. El Sitio Web no realiza pagos en línea ni gestiona
        transacciones económicas.
      </p>

      <h2>3. Condiciones de uso</h2>
      <p>
        El acceso y la navegación por el Sitio Web atribuyen la condición de usuario e implican la aceptación
        de este Aviso Legal. El usuario se compromete a hacer un uso adecuado de los contenidos y servicios, a
        no emplearlos para actividades ilícitas o contrarias a la buena fe, y a facilitar información veraz en
        los formularios de contacto.
      </p>
      <p>
        Los usuarios que envíen información sobre equipos para su venta garantizan ser sus legítimos
        propietarios o estar autorizados para su venta, y que la información y fotografías aportadas son
        veraces y no vulneran derechos de terceros.
      </p>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>
        Los textos, diseño, logotipo, marca «{T.nombreComercial}», estructura y código del Sitio Web son
        titularidad de {T.nombre} o de terceros que han autorizado su uso, y están protegidos por la
        legislación de propiedad intelectual e industrial. Queda prohibida su reproducción, distribución,
        comunicación pública o transformación sin autorización expresa.
      </p>
      <p>
        Las marcas, nombres comerciales y logotipos de fabricantes de equipos que aparecen en el catálogo
        (por ejemplo, para identificar el modelo de una máquina) pertenecen a sus respectivos titulares y se
        utilizan únicamente con fines descriptivos. El logotipo de WhatsApp es propiedad de WhatsApp LLC /
        Meta Platforms, Inc.
      </p>

      <h2>5. Exclusión de responsabilidad</h2>
      <p>
        La información publicada sobre cada equipo se elabora a partir de los datos facilitados por su
        propietario y de la revisión realizada por el titular. Pese a la diligencia empleada, el titular no
        garantiza la ausencia de errores u omisiones y recomienda al comprador comprobar el estado del equipo
        antes de cerrar la operación.
      </p>
      <p>
        El titular no se hace responsable de los daños o perjuicios derivados del uso de la información del
        Sitio Web, de interrupciones o fallos técnicos, ni de los contenidos de sitios de terceros a los que
        se enlace (incluido WhatsApp, cuyo uso se rige por sus propias condiciones).
      </p>

      <h2>6. Protección de datos y cookies</h2>
      <p>
        El tratamiento de los datos personales facilitados a través del Sitio Web se rige por la{" "}
        <a href="/privacidad">Política de Privacidad</a>. El uso de cookies se describe en la{" "}
        <a href="/cookies">Política de Cookies</a>.
      </p>

      <h2>7. Legislación aplicable y jurisdicción</h2>
      <p>
        Este Aviso Legal se rige por la legislación española. Para cualquier controversia derivada del acceso
        o uso del Sitio Web, las partes se someten a los Juzgados y Tribunales que correspondan conforme a la
        normativa aplicable en materia de consumidores y usuarios.
      </p>
      <p>
        Asimismo, se informa de la existencia de la plataforma europea de resolución de litigios en línea:{" "}
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">
          https://ec.europa.eu/consumers/odr
        </a>
        .
      </p>
    </LegalLayout>
  );
}
