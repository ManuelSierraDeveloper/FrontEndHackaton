"use client";

import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, ArrowRight, Scale } from "lucide-react";
import { BarChart } from "./charts";

const chainData = [
  { label: "Precio final al consumidor", value: 100, color: "#F44336" },
  { label: "Margen del intermediario", value: 50, color: "#FF9800" },
  { label: "Logistica y distribucion", value: 20, color: "#1565C0" },
  { label: "Lo que recibe el productor", value: 25, color: "#6D9E13" },
];

export function ProblemaSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 rounded-full mb-4">
            <AlertTriangle className="w-4 h-4 text-[#F44336]" />
            <span className="text-sm font-semibold text-[#C62828]">El Problema</span>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            El Estrangulamiento del Productor
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            El modelo de intermediacion actual-castiga al pequeno productor. Recibe apenas una fraccion del valor que el consumidor final paga.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="bg-red-50 rounded-xl p-5 border border-red-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-[#C62828]" />
                </div>
                <h4 className="font-heading font-bold text-lg text-[#C62828]">
                  Solo el 25%
                </h4>
              </div>
              <p className="text-sm text-gray-700">
                Es lo que llega al bolsillo del productor. El 75% restante se pierde en intermediarios, logistica y márgenes comerciales.
              </p>
            </div>

            <div className="bg-orange-50 rounded-xl p-5 border border-orange-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Scale className="w-5 h-5 text-[#E65100]" />
                </div>
                <h4 className="font-heading font-bold text-lg text-[#E65100]">
                  Brecha de comercializacion
                </h4>
              </div>
              <p className="text-sm text-gray-700">
                Sin acceso a mercados directos, el productor no puede negociar precios justos ni construir trazabilidad verifiable para compradores internacionales.
              </p>
            </div>

            <div className="flex items-center gap-2 p-4 bg-[#6D9E13]/5 rounded-lg border border-[#6D9E13]/15">
              <ArrowRight className="w-4 h-4 text-[#6D9E13]" />
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-[#6D9E13]">Resultado:</span> Perdida sistematica de rentabilidad y exclusion de mercados de exportacion.
              </p>
            </div>
          </motion.div>

          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100"
            >
              <h3 className="font-heading font-bold text-lg text-gray-900 mb-2 text-center">
                Desglose del Precio Final de un Producto Agricola
              </h3>
              <p className="text-xs text-gray-500 text-center mb-6">
                Por cada $100.000 COP que paga el consumidor, solo $25.000 llegan al productor
              </p>
              <BarChart data={chainData} showValues={true} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
