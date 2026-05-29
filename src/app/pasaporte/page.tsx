import Link from "next/link";
import { QrCode, ArrowRight } from "lucide-react";

export default function PasaportePage() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 py-20 text-center">
      <div className="max-w-lg mx-auto">
        <div className="w-20 h-20 rounded-2xl bg-[#DEDB8D] flex items-center justify-center mx-auto mb-6">
          <QrCode className="w-10 h-10 text-[#6D9E13]" />
        </div>
        <h1 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-4">Pasaporte Digital</h1>
        <p className="text-gray-600 mb-8">
          Escanea el codigo QR de cualquier producto para verificar su trazabilidad completa, certificaciones y origen.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#6D9E13] text-[#6D9E13] font-semibold rounded-lg hover:bg-[#DEDB8D] transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
          Volver al Inicio
        </Link>
        <p className="text-sm text-gray-400 mt-12">Seccion en desarrollo</p>
      </div>
    </div>
  );
}
