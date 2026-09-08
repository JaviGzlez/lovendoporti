import type { Metadata } from "next";

export const metadata: Metadata = { title: "Aviso legal" };

// TODO: completar con los datos fiscales reales del titular antes de publicar.
export default function AvisoLegalPage() {
  return (
    <div className="container-lv max-w-3xl py-10 lg:py-14">
      <h1 className="text-3xl font-bold tracking-tight">Aviso legal</h1>
      <div className="prose-lv mt-6">
        <h2>Titular del sitio web</h2>
        <p>
          En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico
          (LSSI-CE), se informa de que el titular de este sitio web es <strong>Mario Zarzuela</strong>
          {" "}(NIF: [pendiente]), con domicilio en [pendiente] y correo electrónico de contacto hola@lovendoporti.es.
        </p>
        <h2>Objeto</h2>
        <p>
          Lo vendo por ti es un portal de intermediación en la compraventa de maquinaria y equipamiento dental de
          segunda mano. La información publicada sobre cada equipo se elabora a partir de los datos facilitados por
          su propietario y de la revisión realizada por el titular.
        </p>
        <h2>Propiedad intelectual</h2>
        <p>
          Los contenidos, marca y logotipo de Lo vendo por ti son propiedad de su titular. Queda prohibida su
          reproducción sin autorización expresa.
        </p>
        <h2>Responsabilidad</h2>
        <p>
          El titular no se hace responsable de los daños derivados del uso de la información del sitio. Las
          condiciones de cada operación se acuerdan directamente entre las partes.
        </p>
      </div>
    </div>
  );
}
