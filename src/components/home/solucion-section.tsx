"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, Link2, ArrowRight } from "lucide-react";
import { RoleComparison } from "./charts";

const diferenciadores = [
  {
    icon: Zap,
    title: "Precio directo",
    desc: "Sin intermediarios. Tu negociacion es directa con el comprador final.",
    highlight: true,
  },
  {
    icon: Sparkles,
    title: "Pasaporte Digital",
    desc: "Genera un codigo QR unico que cualquier comprador puede escanear para ver trazabilidad completa.",
    highlight: true,
  },
  {
    icon: Link2,
    title: "Acceso global",
    desc: "Conectate con compradores internacionales que exigen trazabilidad verificable.",
    highlight: false,
  },
];

export function SolucionSection() {
  return (
    <section className="py-20 md:py-28 bg-[#FFFAF3]">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#6D9E13]/10 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-[#6D9E13]" />
            <span className="text-sm font-semibold text-[#6D9E13]">La Solucion</span>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            Valor Directo, Sin Intermediarios
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Nebbi conecta directamente al productor con el comprador final. Dos roles, una misma plataforma, cero intermediacion.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {diferenciadores.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-xl border text-center ${
                item.highlight
                  ? "bg-white border-[#6D9E13]/20 shadow-md"
                  : "bg-white border-gray-100"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                  item.highlight ? "bg-[#6D9E13]" : "bg-gray-200"
                }`}
              >
                <item.icon
                  className={`w-6 h-6 ${item.highlight ? "text-white" : "text-gray-500"}`}
                />
              </div>
              <h4 className="font-heading font-bold text-lg text-gray-900 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h3 className="font-heading font-bold text-xl text-gray-900 mb-2">
            Dos Panels, Una Mision
          </h3>
          <p className="text-sm text-gray-500">Cada rol tiene herramientas diseñadas para su necesidad especifica</p>
        </motion.div>

        <RoleComparison />
      </div>
    </section>
  );
}
