import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ProductIcon, CertificationBadge } from "@/components/branding";
import {
  ContextoSection,
  ProblemaSection,
  SolucionSection,
  TecnicaSection,
  ImpactoSection,
} from "@/components/home";
import {
  MapPin,
  CheckCircle,
  QrCode,
  ShieldCheck,
  Leaf,
  Globe,
  ArrowRight,
  Package,
  Sprout,
} from "lucide-react";

const features = [
  {
    icon: <MapPin className="w-8 h-8" />,
    title: "Trazabilidad Total",
    description: "Registra fincas, lotes y estados de cultivo. Cada producto tiene un historial verificable.",
  },
  {
    icon: <QrCode className="w-8 h-8" />,
    title: "Pasaporte Digital",
    description: "Genera codigos QR unicos para cada lote. Compradores y turistas escanean y verifican origen.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Certificaciones",
    description: "Registra y verifica certificaciones Fairtrade y Rainforest Alliance en el pasaporte digital.",
  },
  {
    icon: <Leaf className="w-8 h-8" />,
    title: "Turismo Rural",
    description: "Publica experiencias turisticas asociadas a fincas. Conecta el campo con visitantes.",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Comercio Internacional",
    description: "Recibe solicitudes de compra de compradores internacionales interesados en tus productos.",
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: "Evidencias Visuales",
    description: "Adjunta fotografias y documentos a cada lote. Construye confianza con pruebas verificables.",
  },
];

const certifications = [
  { name: "Fairtrade", type: "fairtrade" as const, description: "Comercio justo y condiciones dignas" },
  { name: "Rainforest Alliance", type: "rainforest" as const, description: "Sostenibilidad y conservacion" },
];

const productIcons = [
  { name: "Guineo", icon: "guineo", color: "bg-[#6D9E13]" },
  { name: "Cafe", icon: "cafe", color: "bg-[#6F4E37]" },
  { name: "Cacao", icon: "cacao", color: "bg-[#4A2C2A]" },
  { name: "Naranja", icon: "naranja", color: "bg-[#FF8C00]" },
];

const stats = [
  { value: "15+", label: "Fincas Activas", icon: <Sprout className="w-5 h-5" /> },
  { value: "4", label: "Tipos de Producto", icon: <Package className="w-5 h-5" /> },
  { value: "2", label: "Certificaciones", icon: <ShieldCheck className="w-5 h-5" /> },
  { value: "100%", label: "Trazabilidad Digital", icon: <QrCode className="w-5 h-5" /> },
];

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#6D9E13] via-[#5C8A0E] to-[#4A7010] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-white" />
          <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-white" />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full bg-white" />
          <div className="absolute top-10 right-40 w-20 h-20 rounded-full bg-white" />
        </div>

        <div className="max-w-[1280px] mx-auto px-6 py-24 md:py-36 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <Badge variant="success" className="mb-6 text-sm px-4 py-1.5">
              Producto representativo: Guineo Verde del Magdalena
            </Badge>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 text-[#FFFAF3]">
              Trazabilidad Agricola desde el Origen
            </h1>
            <p className="text-xl text-[#DEDB8D] font-medium mb-4">
              SABOR CARIBE, FLOW DIGITAL
            </p>
            <p className="text-lg text-white/80 mb-8 max-w-lg leading-relaxed">
              Nebbi conecta productores con compradores internacionales mediante Pasaportes Digitales verificables por QR. Certificaciones Fairtrade y Rainforest Alliance garantizan calidad y origen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/tienda"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#FFFAF3] text-[#4A7010] font-heading font-bold text-lg rounded-xl hover:bg-[#DEDB8D] transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Comprar productos
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-[#FFFAF3]/10 rounded-full blur-3xl scale-150" />
              <Image
                src="/logo-nebbi.png"
                alt="Nebbi Mascot"
                width={300}
                height={270}
                className="drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#FFFAF3] to-transparent" />
      </section>

      {/* Stats Bar */}
      <section className="relative -mt-10 z-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 rounded-xl bg-[#DEDB8D] flex items-center justify-center mx-auto mb-3">
                  <span className="text-[#6D9E13]">{stat.icon}</span>
                </div>
                <p className="font-heading font-bold text-2xl md:text-3xl text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==== 5 NEW DATA-DRIVEN SECTIONS ==== */}
      <ContextoSection />
      <ProblemaSection />
      <SolucionSection />
      <TecnicaSection />
      <ImpactoSection />
      {/* ==================================== */}

      {/* Map Preview Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="success" className="mb-4">Mapa Interactivo</Badge>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-6">
                Explora Productos en el Mapa
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Visualiza productos agricolas de la costa colombiana en un mapa interactivo. Cada punto representa una finca con sus productos y certificaciones.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#DEDB8D] flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-[#6D9E13]" />
                  </div>
                  <span className="text-gray-700">Iconos distintivos por tipo de producto</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#DEDB8D] flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-[#6D9E13]" />
                  </div>
                  <span className="text-gray-700">Informacion de certificaciones al presionar</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#DEDB8D] flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-[#6D9E13]" />
                  </div>
                  <span className="text-gray-700">Solicita productos directamente desde el mapa</span>
                </li>
              </ul>
              <Link
                href="/tienda"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#6D9E13] text-white font-semibold rounded-lg hover:bg-[#4A7010] transition-all shadow-md hover:shadow-lg"
              >
                <MapPin className="w-5 h-5" />
                Ver Mapa de Productos
              </Link>
            </div>

            <div className="relative bg-gradient-to-br from-[#DEDB8D] to-[#E3F2FD] rounded-2xl p-10 aspect-[4/3] flex items-center justify-center overflow-hidden shadow-lg">
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-6 left-6 w-20 h-20 rounded-full bg-[#6D9E13]/20" />
                <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-[#1565C0]/20" />
                <div className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full bg-[#6D9E13]/10" />
              </div>
              <div className="relative text-center">
                <div className="flex justify-center gap-4 mb-8">
                  {productIcons.map((product, i) => (
                    <div
                      key={i}
                      className={`w-16 h-16 ${product.color} rounded-full flex items-center justify-center text-white shadow-lg transform transition-transform hover:scale-110`}
                    >
                      <ProductIcon product={product.icon} size={28} />
                    </div>
                  ))}
                </div>
                <p className="text-[#4A7010] font-heading font-bold text-xl">Magdalena, Colombia</p>
                <p className="text-[#6D9E13] text-sm mt-1">+15 fincas activas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="success" className="mb-4">Propuesta de Valor</Badge>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-4">
              Todo lo que necesitas en un solo lugar
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nebbi ofrece a cada actor del ecosistema agricola las herramientas para conectar, verificar y comercializar con transparencia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card p-8 hover:shadow-lg hover:border-[#6D9E13] hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 rounded-xl bg-[#DEDB8D] flex items-center justify-center text-[#6D9E13] mb-6">
                  {feature.icon}
                </div>
                <h3 className="font-heading font-bold text-xl text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 md:py-28 bg-[#4A7010] text-white">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <Badge variant="success" className="mb-4">Confianza Garantizada</Badge>
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
            Certificaciones que Generan Confianza
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-14 leading-relaxed">
            Registra y muestra las certificaciones Fairtrade y Rainforest Alliance en el pasaporte digital de cada producto. Compradores internacionales verifican origen y calidad.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {certifications.map((cert) => (
              <div key={cert.name} className="bg-white/10 backdrop-blur rounded-xl p-10 text-center border border-white/10 hover:bg-white/15 transition-colors">
                <CertificationBadge type={cert.type} />
                <h3 className="font-heading font-bold text-2xl mt-6 mb-3">{cert.name}</h3>
                <p className="text-white/70 leading-relaxed">{cert.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <Link
              href="/pasaporte"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFFAF3] text-[#4A7010] font-semibold rounded-lg hover:bg-[#DEDB8D] transition-all shadow-md hover:shadow-lg"
            >
              <ShieldCheck className="w-5 h-5" />
              Ver Ejemplo de Pasaporte
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="bg-gradient-to-br from-[#6D9E13] to-[#4A7010] rounded-2xl p-12 md:p-16 text-center text-white shadow-xl">
            <Badge variant="success" className="mb-4">Unete a Nebbi</Badge>
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6">
              Conecta con el Mundo
            </h2>
            <p className="text-xl text-[#DEDB8D] font-medium mb-2">
              SABOR CARIBE, FLOW DIGITAL
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              Buyers internacionales escanean el QR del producto, ven la trazabilidad completa, certificaciones y pueden enviarte una solicitud de compra directamente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pasaporte"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#FFFAF3] text-[#FFFAF3] font-semibold rounded-lg hover:bg-[#FFFAF3]/10 transition-all"
              >
                <QrCode className="w-5 h-5" />
                Ver Ejemplo de Pasaporte
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
