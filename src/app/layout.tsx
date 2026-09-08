import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CookieBanner from "@/components/CookieBanner";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/utils";

// Fuentes autoalojadas (sin depender de Google Fonts en tiempo de build)
const inter = localFont({
  variable: "--font-inter",
  src: [
    { path: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2", style: "normal" },
    { path: "../../node_modules/@fontsource-variable/inter/files/inter-latin-ext-wght-normal.woff2", style: "normal" },
  ],
  display: "swap",
});
const caveat = localFont({
  variable: "--font-caveat",
  src: [
    { path: "../../node_modules/@fontsource-variable/caveat/files/caveat-latin-wght-normal.woff2", style: "normal" },
    { path: "../../node_modules/@fontsource-variable/caveat/files/caveat-latin-ext-wght-normal.woff2", style: "normal" },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} · Maquinaria dental de segunda mano`,
    template: `%s · ${SITE_NAME}`,
  },
  description: `${SITE_TAGLINE}. Compra y vende fresadoras, escáneres, hornos e impresoras 3D dentales de segunda mano con el acompañamiento de un profesional.`,
  openGraph: {
    siteName: SITE_NAME,
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${inter.variable} ${caveat.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <CookieBanner />
      </body>
    </html>
  );
}
