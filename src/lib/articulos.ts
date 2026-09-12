/**
 * Artículos del blog (modo demo, sin Supabase).
 * Cuando exista el panel privado, estos textos se migran a la tabla `articulos`
 * (mismo formato: título, extracto, contenido en Markdown, portada).
 */
import type { Articulo } from "./types";

const daysAgo = (d: number) => new Date(Date.now() - d * 864e5).toISOString();

type Seed = Omit<Articulo, "id" | "publicado" | "publicado_at"> & { dias: number };

const SEED: Seed[] = [
  {
    slug: "comprar-fresadora-dental-segunda-mano-que-revisar",
    titulo: "Comprar una fresadora dental de segunda mano: qué revisar antes de decidirte",
    extracto:
      "Horas de husillo, ejes, calibración, software y accesorios: la lista que uso yo antes de recomendar una fresadora usada.",
    portada: "/equipos/roland-dwx-52dci.webp",
    dias: 1,
    contenido: `
Una fresadora es, casi siempre, la inversión más grande de un laboratorio dental. Y también es el equipo donde más se nota la diferencia entre comprar bien y comprar mal de segunda mano. Llevo años viendo máquinas entrar y salir de laboratorios, y te puedo decir que una fresadora usada bien elegida trabaja igual que una nueva durante muchos años. Una mal elegida, en cambio, se convierte en un pozo de averías.

Esta es la lista que reviso yo antes de recomendar cualquier fresadora que pasa por **Lo vendo por ti**.

## 1. Las horas del husillo, no las de la máquina

El dato más importante no es la edad de la fresadora ni el año de fabricación: son las **horas de trabajo del husillo** (spindle). Es la pieza que más sufre y la más cara de sustituir, y en la mayoría de modelos se puede consultar desde el propio software o el panel de la máquina.

Como referencia general, un husillo bien cuidado suele superar las 4.000 o 5.000 horas sin problemas, y los fabricantes marcan intervalos de revisión en torno a esas cifras. Pide siempre el dato exacto y, si el husillo se ha cambiado o revisado, la factura del servicio técnico. Una fresadora con muchas horas pero con husillo nuevo puede ser mejor compra que una con pocas horas y husillo original sin revisar.

## 2. Qué se ha fresado con ella

No es lo mismo una máquina que ha trabajado sobre todo zirconio y PMMA (en seco) que una que ha fresado metal o disilicato de litio (en húmedo). El fresado en húmedo y los materiales duros desgastan más husillo, portaherramientas y guías. Pregunta qué materiales ha trabajado y en qué proporción: te da una idea muy realista del desgaste real.

## 3. Estado de los ejes y precisión

Con la máquina en marcha, comprueba que los desplazamientos son suaves, sin ruidos ni vibraciones raras. Si puedes, pide que se frese una **pieza de prueba** (una corona o una estructura sencilla) y mide el ajuste. Una fresadora descalibrada se nota enseguida en los ajustes marginales. La calibración se puede hacer, pero conviene saber de antemano si hace falta y cuánto cuesta.

## 4. Cambiador de herramientas y accesorios

Revisa que el cambiador automático funciona con todas las posiciones y que se incluye un juego de fresas en buen estado. Comprueba también qué viene con la máquina: aspiración, compresor, portadiscos, adaptadores para bloques, refrigeración si es de húmedo. Estos accesorios suman fácilmente varios miles de euros si los tienes que comprar aparte, y muchas veces se olvidan al comparar precios.

## 5. Software y licencias

Este punto se pasa por alto a menudo. Una fresadora sin **licencia de CAM** activa puede ser un problema serio: algunos fabricantes vinculan la licencia al propietario original y cobran por transferirla, y otros directamente no la transfieren. Antes de cerrar la compra, confirma qué software incluye, en qué versión, si la licencia es transferible y si va a necesitar un ordenador nuevo.

## 6. Historial de mantenimiento

Un laboratorio que ha cuidado su máquina tiene facturas de revisiones, cambios de filtros, rodamientos o husillo. Pídelas. Si no hay nada, no significa que la máquina esté mal, pero sí que estás comprando a ciegas y el precio debería reflejarlo.

## 7. Transporte e instalación

Una fresadora de laboratorio pesa entre 100 y 300 kilos y no se puede mover de cualquier forma: los ejes deben ir bloqueados y la máquina bien embalada. Aclara quién se encarga del transporte, quién la instala y quién la calibra al llegar. En Lo vendo por ti ayudamos a coordinar todo esto porque es donde más disgustos se producen.

## ¿Y el precio?

Como orientación, una fresadora de segunda mano en buen estado suele situarse entre el 40 % y el 60 % de su precio nuevo, dependiendo de las horas, el husillo y lo que incluya. Si el precio está muy por debajo, pregunta por qué. Si está muy por encima, compáralo con el nuevo incluyendo formación, garantía e instalación.

## Preguntas que conviene hacer antes de decidirte

Antes de cerrar cualquier compra, yo siempre recomiendo hacer estas preguntas directamente al vendedor, por escrito si puede ser: ¿por qué se vende el equipo?, ¿cuántos propietarios ha tenido?, ¿se puede ver funcionando antes de pagar?, ¿qué garantía se ofrece tras la venta? Las respuestas dicen tanto como la propia máquina. Un vendedor que cambia de flujo de trabajo y te enseña la máquina trabajando sin problema no es lo mismo que uno que evita las preguntas concretas o solo quiere cerrar por mensaje sin más detalle.

## Errores habituales al comprar una fresadora usada

El error más frecuente es dejarse llevar solo por el precio y no pedir el dato de las horas del husillo. El segundo es no comprobar la licencia del software hasta después de pagar, cuando ya es tarde para negociar. Y el tercero, muy típico, es no contar el coste del transporte y la instalación al comparar ofertas: una fresadora "barata" que hay que traer desde otra provincia con una grúa y calibrar desde cero puede acabar costando lo mismo que una algo más cara pero cercana y ya revisada.

## Mi consejo

No compres una fresadora usada solo por el precio ni solo por la marca. Compra la que tenga el historial claro, el husillo revisado y el software en regla. Y si tienes dudas, escríbeme: puedo revisar contigo cualquier equipo antes de que te decidas, sea nuestro o no. Puedes ver las [fresadoras que tenemos disponibles ahora mismo](/equipos?categoria=fresadoras) o [contarme qué buscas](/busco-un-equipo) y te aviso cuando entre una que encaje.
`,
  },
  {
    slug: "horno-de-sinterizado-segunda-mano-que-comprobar",
    titulo: "Horno de sinterizado de segunda mano: qué comprobar para no llevarte sorpresas",
    extracto:
      "Resistencias, ciclos, termopar y cámara: los cuatro puntos que marcan si un horno de zirconio usado merece la pena.",
    portada: "/equipos/zirkonzahn-zirkonofen-600-v4.webp",
    dias: 6,
    contenido: `
El horno de sinterizado es uno de los equipos más agradecidos para comprar de segunda mano: tiene pocas piezas móviles, es robusto y, si está bien cuidado, dura muchísimos años. Pero precisamente por eso hay que saber mirar en el sitio correcto, porque lo que falla en un horno no se ve a simple vista.

## Las resistencias: el corazón del horno

Los hornos de zirconio trabajan a temperaturas de entre 1.450 y 1.600 °C, y lo que las alcanza son las **resistencias** (normalmente de disiliciuro de molibdeno, MoSi2). Tienen una vida útil limitada, se degradan con los ciclos y son el recambio más caro del horno: un juego puede costar entre varios cientos y más de mil euros según el modelo.

Lo que debes preguntar es cuántos ciclos llevan las resistencias actuales y cuándo se cambiaron por última vez. Casi todos los hornos modernos guardan un **contador de ciclos** en el menú. Si las resistencias tienen muchos ciclos, negocia el precio contando con el recambio.

## El termopar y la precisión de temperatura

El termopar es el sensor que mide la temperatura dentro de la cámara. Si está desgastado o descalibrado, el horno puede estar sinterizando a una temperatura distinta de la que marca, y eso se traduce en zirconio con mala translucidez, tonos que no coinciden o piezas frágiles. Pide que se haga un ciclo de prueba con un **anillo de control** o una pieza de zirconio y compara el resultado con lo esperado.

## La cámara y el aislamiento

Abre el horno y mira la cámara con luz. Grietas pequeñas en el aislamiento refractario son normales con el uso; grietas grandes, desprendimientos o zonas oscurecidas indican que el horno ha sufrido. Comprueba también que la puerta o el elevador cierran bien y que el sello no está deteriorado, porque una mala estanqueidad obliga a trabajar más a las resistencias.

## Ciclos y programas

Un horno de segunda mano debe permitir programar los ciclos que usas tú: rampas de subida, mantenimiento a temperatura máxima y enfriamiento controlado. Los ciclos rápidos (speed sintering) exigen más al horno, así que si el anterior propietario los usaba mucho, es un dato relevante. Comprueba que la electrónica responde bien, que la pantalla no tiene fallos y que los programas se guardan.

## Instalación eléctrica

Muchos hornos de sinterizado necesitan una toma **monofásica de alta potencia o trifásica**. Antes de comprar, confirma qué alimentación necesita y si tu laboratorio la tiene. Es un detalle tonto, pero he visto hornos parados semanas esperando a un electricista.

## Marcas y recambios

En el mercado español hay hornos de sinterizado de muchas marcas: Zirkonzahn, Ivoclar, Dekema, Mihm-Vogt, Zubler, VITA, Nabertherm o los fabricados en Asia con distribución local. Todos pueden ser buenas compras, pero pregunta siempre por la **disponibilidad de recambios y servicio técnico en España**. Unas resistencias que tardan dos meses en llegar son dos meses con el horno parado. Los modelos con distribuidor oficial y técnicos cerca se pagan un poco más de segunda mano, y con razón.

## Capacidad: no compres de más ni de menos

Los hornos se diferencian también por el tamaño de la cámara y el número de bandejas que admiten. Un horno pequeño de sobremesa es perfecto para un laboratorio que sinteriza unas pocas unidades al día; uno grande de varias bandejas permite hacer ciclos largos por la noche con toda la producción. Piensa en tu volumen real y en si tienes espacio y alimentación eléctrica para un horno grande antes de dejarte llevar por el precio.

## ¿Nuevo sin estrenar o usado?

En el mercado de segunda mano dental aparecen a veces hornos **nuevos sin uso**, procedentes de laboratorios que cerraron, cambiaron de flujo de trabajo o compraron equipos de más. Son una oportunidad excelente: precio de segunda mano con resistencias y cámara a estrenar. En Lo vendo por ti solemos tener alguno; puedes ver los [hornos disponibles ahora](/equipos?categoria=hornos).

## Preguntas para hacerle al vendedor

Antes de decidirte, pide siempre estos cuatro datos por escrito: número de ciclos actuales, fecha del último cambio de resistencias, si el termopar se ha calibrado alguna vez y qué temperatura máxima alcanza en el ciclo estándar que usa. Un vendedor que responde con esos datos concretos, en lugar de un genérico "funciona perfectamente", suele ser alguien que conoce bien su equipo y no tiene nada que ocultar.

## Errores que veo repetirse

El error más común es fijarse solo en el precio y olvidar el coste de un juego de resistencias nuevo, que hay que sumar mentalmente si están muy gastadas. El segundo es no probar un ciclo real antes de comprar, confiando en que "un horno siempre funciona igual". Y el tercero es no preguntar por la alimentación eléctrica hasta después de comprarlo, cuando ya has pagado el transporte y descubres que tu cuadro eléctrico no da la potencia necesaria.

## Resumen rápido

Pregunta por los ciclos de las resistencias, pide una prueba de sinterizado, revisa la cámara con luz y confirma la alimentación eléctrica. Con esos cuatro puntos claros, un horno usado es una de las compras más seguras que puedes hacer para tu laboratorio. Y si quieres que lo revisemos juntos antes de decidir, [escríbeme por WhatsApp](/contacto).
`,
  },
  {
    slug: "impresora-3d-dental-segunda-mano-guia",
    titulo: "Impresoras 3D dentales de segunda mano: guía para elegir bien",
    extracto:
      "Tecnología DLP o LCD, longitud de onda, horas de la fuente de luz y compatibilidad de resinas. Lo que importa de verdad.",
    portada: "/equipos/asiga-max-uv-385.webp",
    dias: 12,
    contenido: `
La impresión 3D se ha convertido en el flujo de trabajo estándar para modelos, férulas, guías quirúrgicas y provisionales. Y como la tecnología evoluciona rápido, muchos laboratorios y clínicas renuevan equipos que están en perfecto estado. Eso hace que el mercado de segunda mano sea especialmente interesante: puedes conseguir una impresora profesional por una fracción de su precio.

Pero no todas las impresoras son iguales, y hay detalles que marcan la diferencia.

## DLP, LCD o SLA: qué te conviene

Las tres tecnologías curan resina con luz, pero de forma distinta. Las **DLP** proyectan cada capa completa con un proyector y son las más precisas y consistentes; son las que suelen usar los fabricantes dentales de gama alta. Las **LCD** (MSLA) usan una pantalla como máscara: son más baratas, pero la pantalla se degrada y hay que cambiarla cada cierto tiempo. Las **SLA** de láser son muy precisas, pero más lentas.

Para uso dental profesional, una DLP de segunda mano suele ser mejor compra que una LCD nueva de gama baja.

## La longitud de onda: 385 o 405 nm

Este dato condiciona qué resinas puedes usar. Las impresoras de **405 nm** son las más habituales y tienen la gama de resinas más amplia. Las de **385 nm** curan con más precisión y permiten resinas transparentes y biocompatibles de mejor resultado, pero no todas las resinas están validadas para esa longitud de onda. Antes de comprar, comprueba que las resinas que usas (o quieres usar) están validadas para la impresora.

## Horas de la fuente de luz

Igual que el husillo en una fresadora, aquí lo que se desgasta es el **proyector o LED**. Las impresoras profesionales llevan un contador de horas. Un LED de calidad supera fácilmente las 10.000 horas, pero pide el dato y pregunta si se ha cambiado.

## Estado de la cubeta y la plataforma

La cubeta (vat) tiene una película o cristal por donde pasa la luz, que se desgasta y se sustituye periódicamente. Es un consumible, pero conviene saber en qué estado está y cuánto cuesta el recambio en ese modelo. La plataforma de impresión debe estar plana y sin marcas profundas.

## Software y actualizaciones

Comprueba que el fabricante sigue dando soporte al modelo, que el software es gratuito o la licencia es transferible, y que la impresora acepta actualizaciones. Una impresora sin soporte puede funcionar años, pero te quedas sin nuevas resinas validadas.

## Tamaño de la plataforma y resolución

La plataforma de impresión determina cuántos modelos puedes imprimir a la vez, y la resolución (tamaño de píxel en DLP, normalmente entre 50 y 65 micras en equipos dentales) determina el detalle. Para modelos y férulas, cualquier impresora dental profesional sobra; para prótesis definitivas o piezas con mucho detalle, la resolución importa más. Pregúntate qué vas a imprimir de verdad y no pagues por precisión que no necesitas.

## ¿Merece la pena una impresora de gama alta de segunda mano frente a una nueva de gama baja?

Es una pregunta habitual, y en la mayoría de casos la respuesta es sí. Una impresora profesional DLP usada, con su fuente de luz revisada, suele ofrecer mejor precisión, mejor repetibilidad y más resinas validadas que una impresora nueva de entrada de gama pensada para uso genérico. La diferencia se nota sobre todo en piezas que requieren ajuste fino, como guías quirúrgicas o modelos para ortodoncia.

## Haz una impresión de prueba

Si puedes ver la impresora en marcha, pide que se imprima un modelo pequeño. Fíjate en que las capas son uniformes, en que no hay zonas sin curar y en que la pieza se despega bien de la plataforma. Un fallo en la impresión de prueba no siempre es de la máquina (puede ser la resina o los parámetros), pero es una señal para preguntar más.

## Lo que necesitarás además

No te olvides del resto del flujo: **lavadora** de alcohol isopropílico y **unidad de postcurado**. Muchas veces se venden juntas con la impresora, y merece la pena preguntar.

## Mantenimiento habitual

Una impresora dental bien cuidada necesita poco mantenimiento, pero el que necesita es importante: limpiar la cubeta y la plataforma después de cada uso, filtrar la resina sobrante antes de reutilizarla y revisar de vez en cuando que el eje Z se mueve sin holguras. Pregunta al vendedor si ha seguido esta rutina; una impresora con la cubeta rayada o con restos de resina curada en el interior suele indicar un mantenimiento descuidado, aunque por fuera parezca en buen estado.

## Errores frecuentes al comprar de segunda mano

El error más habitual es no comprobar la longitud de onda antes de comprar y luego descubrir que tus resinas habituales no están validadas para esa impresora. El segundo es no preguntar por las horas de la fuente de luz, dando por hecho que "una impresora no se desgasta". Y el tercero es olvidar que necesitarás lavadora y postcurado si no vienen incluidos, lo que puede añadir varios cientos de euros al presupuesto real.

## Nuestra recomendación

Para un laboratorio que empieza en digital, una impresora DLP profesional de segunda mano con su lavado y postcurado es la forma más rentable de dar el salto. Puedes ver las [impresoras 3D que tenemos disponibles](/equipos?categoria=impresion-3d), y si tienes dudas sobre resinas o compatibilidades, [pregúntame sin compromiso](/contacto).
`,
  },
  {
    slug: "cuando-vender-maquinaria-dental",
    titulo: "¿Cuándo es el mejor momento para vender tu maquinaria dental?",
    extracto:
      "Un equipo parado pierde valor cada mes. Te cuento cuándo conviene venderlo, cómo prepararlo y qué documentación tener a mano.",
    portada: "/hero-v2.webp",
    dias: 18,
    contenido: `
En casi todos los laboratorios y clínicas hay un equipo que ya no se usa: la fresadora que se sustituyó por otra más grande, el escáner de la generación anterior, el horno que se quedó pequeño. Y en la mayoría de los casos ese equipo sigue ahí, ocupando sitio, porque venderlo da pereza o porque "ya lo haré".

La realidad es que un equipo parado **pierde valor cada mes que pasa**, y no solo por la antigüedad: los modelos se renuevan, las licencias caducan y las piezas se deterioran sin uso. Te cuento cuándo conviene mover ficha y cómo hacerlo bien.

## Señales de que es el momento

**Has cambiado de flujo de trabajo.** Si has pasado de metal-cerámica a zirconio monolítico, o has incorporado impresión 3D, hay equipos que ya no volverás a usar. Cuanto antes salgan, más valor conservan.

**El equipo tiene menos de 8 o 10 años.** Es la franja donde la demanda de segunda mano es alta y los precios se mantienen. A partir de ahí, la venta sigue siendo posible pero el precio cae más deprisa.

**Sale un modelo nuevo del fabricante.** Parece contradictorio, pero justo después de un lanzamiento hay muchos compradores buscando la generación anterior a buen precio.

**El mantenimiento anual se acerca.** Si la revisión del husillo, las resistencias o el proyector están al caer, valora vender antes de asumir ese gasto, o hacer la revisión y venderlo como "recién revisado", que se paga mejor.

## Cómo preparar el equipo para venderlo

Un equipo limpio, con sus accesorios y su documentación se vende antes y por más dinero. Concretamente:

- **Límpialo a fondo**, por dentro y por fuera. Restos de polvo de zirconio o resina dan muy mala impresión.
- **Reúne todo lo que venía con él**: fresas, cubetas, plataformas, cables, discos de software, manuales.
- **Localiza las facturas** de compra y de mantenimiento. Son la mejor prueba de que el equipo ha estado bien cuidado.
- **Anota las horas de uso** (husillo, ciclos, fuente de luz) y los materiales con los que ha trabajado.
- **Haz fotos con buena luz** desde varios ángulos, incluyendo el interior y la pantalla encendida.

## No solo importa cuándo, también importa dónde lo anuncias

Vender un equipo dental no es como vender un mueble: el comprador es un perfil muy concreto (otro laboratorio, otra clínica) y suele estar en canales específicos del sector, no en un portal genérico de segunda mano. Anunciar bien, en el sitio correcto y con el lenguaje técnico adecuado, marca casi tanto como el propio precio a la hora de encontrar comprador rápido.

## Vender por tu cuenta o con ayuda

Puedes publicar tu equipo en portales generalistas o en grupos de redes sociales. Funciona, pero tiene un coste oculto: atender a decenas de mensajes de curiosos, gente que regatea sin intención de comprar, preguntas técnicas a las que a lo mejor no sabes responder y, al final, organizar un transporte de una máquina de 200 kilos con un desconocido. Muchos propietarios acaban dejando el equipo sin vender por puro agotamiento.

La alternativa es delegar en alguien del sector que sepa qué preguntar, qué responder y a quién ofrecérselo. Es lo que hacemos en Lo vendo por ti: el equipo se publica con una ficha profesional y se mueve entre laboratorios y clínicas que buscan exactamente eso.

## Sobre el precio

Fijar el precio es la parte más delicada. Muchos propietarios lo ponen demasiado alto (por lo que costó) y el equipo se queda meses sin venderse; otros lo malvenden por quitárselo de encima. Lo razonable es mirar a cuánto se venden equipos similares, descontar las revisiones pendientes y dejar un pequeño margen para negociar.

En Lo vendo por ti te ayudamos a fijar ese precio con datos reales de lo que se está vendiendo, y sin compromiso.

## Errores que reducen el precio final

Hay decisiones que cuestan dinero a la hora de vender. Esperar demasiado tiempo con el equipo parado es el más frecuente: cada mes que pasa sin ponerlo a la venta es un mes más de depreciación y, a veces, de deterioro por falta de uso. Otro error habitual es poner un precio de salida muy alto "para negociar", porque en la práctica espanta a los compradores serios antes de que lleguen a preguntar. Y el tercero es vender sin limpiar ni documentar el equipo, lo que obliga a bajar el precio simplemente porque no transmite confianza en las fotos.

## Qué hacemos nosotros por ti

Nuestro trabajo es exactamente el que da pereza: revisar la información, preparar la ficha con fotos y datos, publicarla en la web y en redes, atender a los interesados, filtrar a los curiosos y acompañarte hasta que se cierra la venta, incluido el transporte. Tú solo tienes que [contarnos qué equipo tienes](/vender-mi-equipo) y nosotros nos encargamos del resto.

## En resumen

Si tienes un equipo que no usas, no esperes a que "salga la ocasión". Prepáralo, documéntalo y ponlo en el mercado cuanto antes. Y si prefieres que lo hagamos por ti, ya sabes dónde estamos.
`,
  },
  {
    slug: "ventajas-maquinaria-dental-segunda-mano",
    titulo: "7 ventajas de comprar maquinaria dental de segunda mano (y 2 riesgos que debes conocer)",
    extracto:
      "Ahorro, disponibilidad inmediata, tecnología probada, acceso a gamas altas... y también lo que puede salir mal si compras sin garantías.",
    portada: "/equipos/amann-girrbach-mikro-5x.webp",
    dias: 25,
    contenido: `
Cada vez más laboratorios y clínicas montan o amplían su equipamiento con maquinaria de segunda mano. No es una moda: es una decisión económica sensata en un sector donde la tecnología es cara y se renueva rápido. Pero como en cualquier compra de ocasión, hay que saber lo que se hace. Estas son las ventajas reales, y también los riesgos.

## Ventaja 1: el ahorro es enorme

Es la razón evidente. Una fresadora, un horno o un escáner de segunda mano en buen estado suele costar **entre un 40 % y un 60 % menos** que nuevo. En equipos de 20.000 o 30.000 euros, eso son años de amortización que te ahorras, o la posibilidad de comprar dos equipos por el precio de uno.

## Ventaja 2: disponibilidad inmediata

Un equipo nuevo puede tardar semanas o meses en llegar, sobre todo en modelos de gama alta o con configuraciones especiales. Un equipo de segunda mano está aquí ya, listo para trasladarse e instalarse. Para un laboratorio que necesita capacidad ahora, esto puede ser decisivo.

## Ventaja 3: tecnología probada

Cuando compras un modelo que lleva dos o tres años en el mercado, compras algo que ya ha sido probado por cientos de laboratorios. Se conocen sus puntos fuertes, sus fallos habituales y sus recambios. No eres el que descubre los problemas de la primera versión.

## Ventaja 4: menor depreciación

Un equipo nuevo pierde una parte importante de su valor en el momento de la instalación. Uno de segunda mano ya ha pasado esa caída: si dentro de unos años quieres cambiarlo, recuperarás una proporción mucho mayor de lo que pagaste.

## Ventaja 5: es la opción más sostenible

Cada equipo que se reutiliza es uno que no acaba en un almacén o en un contenedor. En un sector con tanta tecnología, dar una segunda vida a la maquinaria tiene todo el sentido. No por casualidad nuestro lema es "Tu material dental merece una segunda oportunidad".

## Ventaja 6: puedes probar antes de invertir a lo grande

Para un laboratorio que quiere entrar en digital, la segunda mano permite probar un flujo de trabajo (fresado, impresión 3D, escaneado) con una inversión contenida. Si funciona, amplías; si no encaja con tu forma de trabajar, has arriesgado mucho menos. Es la forma más prudente de crecer.

## Ventaja 7: acceso a marcas y gamas altas

Comprar nuevo obliga muchas veces a ajustar el presupuesto a una gama concreta. De segunda mano, ese mismo presupuesto puede darte acceso a una marca de gama alta que de otra forma quedaría fuera de alcance: una fresadora de 5 ejes de primer nivel, un escáner intraoral premium o un horno con más capacidad de la que comprarías nuevo. Para muchos laboratorios, es la única vía realista de trabajar con la mejor tecnología disponible.

## Riesgo 1: comprar a ciegas

El mayor riesgo de la segunda mano es no saber lo que compras: horas reales, averías previas, licencias que no se transfieren, accesorios que faltan. Comprar por un anuncio con dos fotos y sin poder preguntar es jugársela. Por eso en Lo vendo por ti cada equipo se revisa y se publica con la información real, y siempre puedes hablar directamente conmigo antes de decidir.

## Riesgo 2: el transporte y la instalación

Muchos equipos dentales son delicados y pesados. Un transporte mal hecho puede desajustar una fresadora o romper la cámara de un horno, y sin una instalación y calibración correctas el equipo no rinde. Es un coste que hay que prever y un trabajo que conviene dejar en manos de quien sabe.

## Cómo minimizar estos riesgos

Los dos riesgos anteriores tienen algo en común: se reducen casi por completo cuando compras con información real y con alguien detrás que responde. Pide siempre el histórico de horas y mantenimiento, exige ver el equipo en marcha o al menos un vídeo reciente, y pregunta explícitamente quién se encargará del transporte y la instalación antes de cerrar el precio. Si el vendedor no puede (o no quiere) darte esos datos, es una señal a tener en cuenta, no necesariamente un motivo para descartar la compra, pero sí para negociar el precio a la baja o pedir garantías adicionales.

## ¿Y si me sale mal el equipo?

Es la pregunta que más miedo da, y es razonable. Por eso en Lo vendo por ti cada equipo se revisa antes de publicarse, se describe con datos reales (no solo "en buen estado") y puedes preguntarme directamente cualquier duda técnica antes de decidirte. No eliminamos el riesgo del todo, porque es maquinaria usada, pero sí lo reducimos a lo razonable: el mismo riesgo que asumirías comprando un coche de segunda mano con historial claro frente a uno sin papeles.

## Entonces, ¿segunda mano sí o no?

Sí, siempre que compres con información, con la posibilidad de preguntar y con alguien que responda al otro lado. Con eso, la segunda mano no es "la opción barata": es la opción inteligente. Echa un vistazo a [los equipos que tenemos disponibles](/equipos) o [cuéntame qué necesitas](/busco-un-equipo).
`,
  },
  {
    slug: "como-se-valora-un-equipo-dental-usado",
    titulo: "Cómo se valora un equipo dental usado: los factores que marcan el precio",
    extracto:
      "Antigüedad, horas, mantenimiento, accesorios, software y demanda. Así calculamos el precio justo de cada equipo.",
    portada: "/equipos/labomed-microscopio.webp",
    dias: 32,
    contenido: `
"¿Cuánto vale mi equipo?" es la pregunta que más me hacen. Y la respuesta honesta es: depende. Pero no depende de cualquier cosa; depende de unos pocos factores concretos que se pueden analizar. Te explico cómo lo hacemos en Lo vendo por ti para llegar a un precio que sea justo para quien vende y atractivo para quien compra.

## 1. El precio de referencia: cuánto cuesta nuevo hoy

El punto de partida no es lo que pagaste, sino **lo que cuesta ahora el mismo modelo o su sustituto**. Si el fabricante ha bajado el precio o ha sacado una versión nueva, el valor de tu equipo se ajusta a esa referencia. Es el primer baño de realidad, y el más importante.

## 2. Antigüedad y generación

No es lo mismo un equipo de hace 3 años que de hace 9, aunque ambos funcionen bien. Con la edad aumenta la probabilidad de averías, se acerca el fin del soporte del fabricante y aparecen modelos más capaces. Como regla aproximada, un equipo bien cuidado pierde entre un 10 % y un 15 % de valor al año los primeros años, y luego la caída se suaviza.

## 3. Horas de uso y desgaste real

Aquí es donde dos equipos del mismo año pueden valer cosas muy distintas. Las **horas de husillo** en una fresadora, los **ciclos** en un horno o las **horas de fuente de luz** en una impresora son el dato objetivo de desgaste. Un equipo con pocas horas o con las piezas de desgaste recién cambiadas vale claramente más.

## 4. Historial de mantenimiento

Las facturas de revisiones y recambios son dinero. Un equipo con mantenimiento documentado se vende más caro y más rápido que uno "que funciona bien pero no tengo papeles". Si vas a vender, reúne todo lo que tengas.

## 5. Qué incluye

Accesorios, consumibles, herramientas, licencias de software, formación, garantía restante. Cada cosa que se incluye suma valor real y evita que el comprador tenga que gastar aparte. Una fresadora con aspiración, compresor y juego de fresas no es la misma oferta que la fresadora sola.

## 6. Demanda del modelo

Hay modelos que todo el mundo busca y otros que nadie quiere aunque sean buenos. Los equipos de marcas con buen soporte en España, con recambios fáciles y con una comunidad de usuarios amplia se venden a mejor precio. Nosotros lo sabemos porque vemos qué preguntan los compradores cada semana.

## 7. Estado estético y de presentación

Parece superficial, pero no lo es: un equipo limpio, con buenas fotos y bien presentado se percibe como bien cuidado, y el comprador está dispuesto a pagar más. Por eso preparamos cada ficha con fotos reales y datos completos.

## Lo que no cuenta (aunque parezca que sí)

Hay cosas que los propietarios creen que suman valor y en realidad no lo hacen. Lo que costó el equipo en su día no cuenta: el mercado mira el precio actual. Las mejoras que le hiciste a medida (un mueble, una instalación especial) rara vez se pagan. Y el cariño, por desgracia, tampoco. Entender esto desde el principio evita frustraciones y equipos que se quedan meses sin vender.

## Cómo hacemos la valoración en Lo vendo por ti

Cuando nos mandas un equipo, lo primero que hacemos es identificar el modelo exacto y su precio de referencia actual. Después miramos las horas, el historial y lo que incluye, y lo comparamos con lo que se ha vendido recientemente en el mercado español y con la demanda que vemos cada semana entre los compradores que nos escriben. Con eso te proponemos un precio de publicación y un margen razonable de negociación. Tú decides.

## Un ejemplo orientativo

Una fresadora que costó 30.000 euros hace 4 años, con el husillo revisado, mantenimiento documentado y con aspiración y compresor incluidos, puede situarse entre 12.000 y 16.000 euros. La misma fresadora sin historial, con husillo original de muchas horas y sin accesorios, probablemente no pase de 8.000 o 9.000. Las cifras son orientativas, pero la diferencia da una idea de lo que pesa cada factor.

## Preguntas frecuentes sobre la valoración

**¿La valoración tiene algún coste?** No, es gratuita y sin compromiso; solo necesito los datos del equipo para darte una cifra orientativa.

**¿Puedo vender aunque no tenga las facturas?** Sí, se puede vender igualmente, aunque el precio será algo más conservador al no poder documentar el mantenimiento.

**¿El precio que me dais es fijo?** Es un precio de publicación pensado para vender en un plazo razonable, con margen para negociar; si tras un tiempo no hay interés, lo revisamos juntos.

## ¿Quieres saber cuánto vale el tuyo?

Cuéntame qué equipo es, de qué año, cuántas horas tiene y qué incluye, y te doy una valoración orientativa sin compromiso. Puedes hacerlo desde [Vender mi equipo](/vender-mi-equipo) o directamente [por WhatsApp](/contacto).
`,
  },
];

export const articulosDemo: Articulo[] = SEED.map((s, i) => ({
  id: `a${i + 1}`,
  slug: s.slug,
  titulo: s.titulo,
  extracto: s.extracto,
  contenido: (s.contenido ?? "").trim(),
  portada: s.portada,
  publicado: true,
  publicado_at: daysAgo(s.dias),
}));
