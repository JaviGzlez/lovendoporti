import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Settings2, HeartHandshake, Search, Tag } from "lucide-react";
import {
  getArticulos,
  getCategorias,
  getEquiposDestacados,
  getEquiposVendidos,
  getUltimosEquipos,
} from "@/lib/data";
import EquipoCard from "@/components/EquipoCard";
import ArticuloCard from "@/components/ArticuloCard";
import CategoryIcon from "@/components/CategoryIcon";
import SectionHeading from "@/components/SectionHeading";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [categorias, destacados, ultimos, vendidos, articulos] = await Promise.all([
    getCategorias(),
    getEquiposDestacados(4),
    getUltimosEquipos(4),
    getEquiposVendidos(4),
    getArticulos(3),
  ]);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Fondo a sangre: fresadora + clínica difuminada */}
        <Image
          src="/hero-bg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center] lg:object-[right_45%]"
        />
        {/* Velo blanco degradado para que el texto se lea */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 via-50% to-white/10 lg:bg-gradient-to-r lg:from-white/75 lg:via-white/70 lg:via-40% lg:to-white/0 lg:to-65%" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />

        <div className="container-lv relative grid min-h-[640px] items-start py-12 sm:min-h-[600px] lg:h-[38vw] lg:max-h-[680px] lg:min-h-[540px] lg:grid-cols-2 lg:items-center lg:py-0">
          <div>
            <p className="eyebrow mb-4">Maquinaria dental de segunda mano</p>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Equipos que siguen creando <span className="text-brand">sonrisas</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-ink/75">
              Compra y vende maquinaria dental de forma segura, con el acompañamiento de un profesional.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/equipos" className="btn-primary !px-7 !py-3.5 shadow-lg shadow-brand/20">
                <Search className="h-4 w-4" /> Ver equipos <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/vender-mi-equipo" className="btn !px-7 !py-3.5 border-2 border-brand bg-white/80 text-brand backdrop-blur hover:bg-brand hover:text-white">
                <Tag className="h-4 w-4" /> Vender mi equipo
              </Link>
            </div>
          </div>
          {/* Alt accesible del hero */}
          <span className="sr-only">Fresadora dental Roland DWX-52D de segunda mano</span>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="border-y border-line bg-white">
        <div className="container-lv flex gap-2 overflow-x-auto py-6 [scrollbar-width:none]">
          {categorias.map((c) => (
            <Link
              key={c.id}
              href={`/equipos?categoria=${c.slug}`}
              className="flex min-w-[110px] flex-1 flex-col items-center gap-2 rounded-xl px-3 py-3 text-center text-sm text-ink/80 transition hover:bg-surface hover:text-brand"
            >
              <CategoryIcon name={c.icono} className="h-7 w-7" />
              {c.nombre}
            </Link>
          ))}
        </div>
      </section>

      {/* DESTACADOS */}
      {destacados.length > 0 && (
        <section className="container-lv py-16">
          <SectionHeading
            title="Equipos destacados"
            subtitle="Maquinaria dental de segunda mano en excelente estado."
            href="/equipos"
            linkLabel="Ver todos los equipos"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {destacados.map((e) => (
              <EquipoCard key={e.id} equipo={e} />
            ))}
          </div>
        </section>
      )}

      {/* CONFIANZA */}
      <section className="bg-brand-light/60">
        <div className="container-lv grid gap-8 py-10 sm:grid-cols-3 lg:grid-cols-4 lg:items-center">
          <Feature icon={ShieldCheck} title="Trato directo" text="y profesional" />
          <Feature icon={Settings2} title="Equipos revisados" text="y con información real" />
          <Feature icon={HeartHandshake} title="Te acompañamos" text="en todo el proceso" />
          <p className="hidden rotate-[-4deg] font-hand text-3xl text-ink/80 lg:block lg:text-right">
            Más que maquinaria,
            <br />
            personas
          </p>
        </div>
      </section>

      {/* ÚLTIMAS INCORPORACIONES */}
      {ultimos.length > 0 && (
        <section className="container-lv py-16">
          <SectionHeading title="Últimas incorporaciones" href="/equipos" linkLabel="Ver catálogo" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ultimos.map((e) => (
              <EquipoCard key={e.id} equipo={e} />
            ))}
          </div>
        </section>
      )}

      {/* VENDER / BUSCO */}
      <section className="container-lv grid gap-6 pb-16 lg:grid-cols-2">
        <div className="card flex flex-col justify-between gap-6 bg-ink p-8 text-white sm:p-10">
          <div>
            <p className="eyebrow text-white/60">¿Tienes un equipo que ya no utilizas?</p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Nosotros lo ponemos delante de profesionales interesados.
            </h2>
          </div>
          <Link href="/vender-mi-equipo" className="btn bg-white text-ink hover:bg-brand hover:text-white self-start">
            Vender mi equipo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="card flex flex-col justify-between gap-6 p-8 sm:p-10">
          <div>
            <p className="eyebrow">¿Buscas un equipo concreto?</p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Cuéntanos qué necesitas y te avisamos cuando lo tengamos.
            </h2>
          </div>
          <Link href="/busco-un-equipo" className="btn-primary self-start">
            Busco un equipo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* BLOG + QUIÉN SOY */}
      <section className="bg-surface">
        <div className="container-lv py-16">
          <SectionHeading
            title="Últimos artículos del blog"
            subtitle="Consejos, novedades y todo lo que necesitas saber sobre maquinaria dental."
            href="/blog"
            linkLabel="Ver todos los artículos"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articulos.map((a) => (
              <ArticuloCard key={a.id} articulo={a} />
            ))}
          </div>
        </div>
      </section>

      {/* QUIÉN SOY */}
      <section className="container-lv py-16">
        <div className="card relative overflow-hidden bg-gradient-to-br from-white via-white to-brand-light">
          <div className="grid items-end gap-8 lg:grid-cols-3">
            <div className="p-8 sm:p-10 lg:col-span-2 lg:py-12">
              <p className="eyebrow mb-3">Quién soy</p>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Hola, soy Mario Zarzuela</h2>
              <p className="mt-4 max-w-xl text-muted">
                Llevo años en el sector dental y creé Lo vendo por ti para ayudar a profesionales como tú a comprar y
                vender equipos de forma sencilla, segura y cercana. Cada equipo lo reviso yo y te acompaño en todo el
                proceso.
              </p>
              <p className="mt-4 font-hand text-2xl text-brand">Más que maquinaria, personas</p>
              <Link href="/quien-soy" className="btn-outline mt-6 bg-white">
                Conóceme <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative mx-auto -mb-1 w-56 sm:w-64 lg:col-span-1 lg:mr-10 lg:w-72">
              <Image
                src="/mario.webp"
                alt="Mario Zarzuela"
                width={1199}
                height={1312}
                sizes="288px"
                className="h-auto w-full object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      </section>

      {/* VENDIDOS */}
      {vendidos.length > 0 && (
        <section className="container-lv py-16">
          <SectionHeading
            title="Vendidos recientemente"
            subtitle="¿Buscas uno similar? Entra en la ficha y cuéntanoslo."
            href="/equipos?estado=vendido"
            linkLabel="Ver vendidos"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {vendidos.map((e) => (
              <EquipoCard key={e.id} equipo={e} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function Feature({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <Icon className="h-10 w-10 text-brand" strokeWidth={1.5} />
      <p className="text-sm leading-snug">
        <span className="block font-semibold">{title}</span>
        <span className="text-muted">{text}</span>
      </p>
    </div>
  );
}
