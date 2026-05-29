"use client";

import { motion } from "framer-motion";
import { TrendingUp, Globe, DollarSign, ArrowRight } from "lucide-react";
import { LineChart } from "./charts";

const roiData = [
  { label: "Ano 0", current: 15, projected: 15 },
  { label: "Ano 1", current: 22, projected: 45 },
  { label: "Ano 2", current: 28, projected: 75 },
  { label: "Ano 3", current: 35, projected: 120 },
];

const exportStats = [
  {
    icon: Globe,
    value: "$10.8B USD",
    label: "Exportaciones agro colombianas 2023",
    sublabel: "UPRA / DANE",
    color: "#6D9E13",
  },
  {
    icon: DollarSign,
    value: "3x",
    label: "Incremento en ROI con exportacion directa",
    sublabel: "Estimacion Nebbi",
    color: "#82640B",
  },
  {
    icon: TrendingUp,
    value: "0",
    label: "Intermediarios en la cadena con Nebbi",
    sublabel: "Valor directo al productor",
    color: "#1565C0",
  },
];

export function ImpactoSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-[#6D9E13] to-[#4A7010] text-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 rounded-full mb-4">
            <TrendingUp className="w-4 h-4 text-[#DEDB8D]" />
            <span className="text-sm font-semibold text-[#DEDB8D]">Impacto y ROI</span>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">
            El Futuro Exportador
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            El sector agropecuario colombiano alcanzado records historicos de exportacion. La clave para el pequeno productor del Magdalena no es el tamano de la finca, sino la trazabilidad.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-5 mb-14">
          {exportStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/10 backdrop-blur rounded-xl p-5 border border-white/10 text-center"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: `${stat.color}30` }}
              >
                <stat.icon className="w-6 h-6" style={{ color: stat.color === "#6D9E13" || stat.color === "#82640B" ? "#DEDB8D" : "#90CAF9" }} />
              </div>
              <p className="font-heading font-bold text-2xl text-[#DEDB8D]">{stat.value}</p>
              <p className="text-sm text-white/90 mt-1">{stat.label}</p>
              <p className="text-xs text-white/50 mt-0.5">{stat.sublabel}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur rounded-2xl p-6 md:p-8 border border-white/10"
        >
          <h3 className="font-heading font-bold text-lg text-white mb-2 text-center">
            Proyeccion de Retorno sobre la Inversion
          </h3>
          <p className="text-xs text-white/60 text-center mb-6">
            Comparacion entre venta local tradicional y exportacion directa via plataforma Nebbi
          </p>

          <LineChart data={roiData} height={260} />

          <div className="grid sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#DEDB8D] shrink-0" />
              <div>
                <p className="text-sm font-medium text-white">ROI Actual (Local)</p>
                <p className="text-xs text-white/60">Venta a traves de intermediarios</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, #DEDB8D 0, #DEDB8D 8px, transparent 8px, transparent 12px)",
                }}
              />
              <div>
                <p className="text-sm font-medium text-white">ROI Proyectado (Exportacion)</p>
                <p className="text-xs text-white/60">Venta directa via plataforma Nebbi</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl px-6 py-4 border border-white/10 max-w-2xl">
            <Globe className="w-5 h-5 text-[#DEDB8D] shrink-0" />
            <p className="text-sm text-white/80 text-center">
              La mayoria de los pequenos productores del Magdalena tienen productos de calidad exportable (banano, yuca, palma, cafe).
              Lo que necesitan es el <strong>certificado de origen y trazabilidad digital</strong> que exige un comprador internacional.
              Nebbi les da ese "pasaporte".
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
