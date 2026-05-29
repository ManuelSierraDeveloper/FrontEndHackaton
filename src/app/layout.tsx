import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ChatbotWidget } from "@/components/chatbot";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "Nebbi | Trazabilidad Agricola del Magdalena",
  description:
    "Plataforma digital de trazabilidad agricola, turismo rural y comercializacion internacional para productores del departamento del Magdalena, Colombia. Sabor Caribe, Flow Digital.",
  keywords: [
    "trazabilidad agricola",
    "productos agricolas",
    "Magdalena",
    "Colombia",
    "banano",
    "guineo",
    "exportacion",
    "turismo rural",
  ],
  authors: [{ name: "Equipo Nebbi" }],
  icons: {
    icon: "/logo-nebbi.png",
    apple: "/logo-nebbi.png",
  },
  openGraph: {
    title: "Nebbi | Trazabilidad Agricola del Magdalena",
    description:
      "Plataforma digital de trazabilidad agricola para productores del Magdalena. Sabor Caribe, Flow Digital.",
    locale: "es_CO",
    type: "website",
    images: ["/logo-nebbi.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FFFAF3]">
        <Providers>
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
          <ChatbotWidget
            title="AgroTrace Assistant 🤖"
            placeholder="¿Preguntas sobre productos, fincas o certificaciones?"
            isOpen={true}
          />
        </Providers>
      </body>
    </html>
  );
}
